"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, Package } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Cart } from "@/entities/user/model/types";
import { Product } from "@/entities/product/model/types";
import { useCart } from "@/shared/lib/contexts/CartContext";

interface CartItemWithProduct extends Cart {
  product: Product | null;
}

export default function CartPage() {
  // TODO: 실제 사용자 ID는 인증 시스템에서 가져와야 함
  const userId = 1;
  const router = useRouter();
  const { refreshCartCount } = useCart();

  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  async function fetchCartItems() {
    setLoading(true);
    try {
      const response = await fetch(`/api/carts?userId=${userId}`);
      const data = await response.json();
      const carts: Cart[] = data.carts || [];

      // Fetch product details for each cart item
      const itemsWithProducts = await Promise.all(
        carts.map(async (cart) => {
          try {
            const productRes = await fetch(`/api/products/${cart.productId}`);
            const productData = await productRes.json();
            return {
              ...cart,
              product: productData.product || null,
            };
          } catch (error) {
            console.error(`Failed to fetch product ${cart.productId}:`, error);
            return {
              ...cart,
              product: null,
            };
          }
        })
      );

      setCartItems(itemsWithProducts);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateQuantity(productId: string, newQuantity: number) {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/carts/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, quantity: newQuantity }),
      });

      if (!response.ok) throw new Error("Failed to update quantity");

      // Update local state
      setCartItems((items) =>
        items.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Refresh cart count in header
      await refreshCartCount();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("수량 변경에 실패했습니다.");
    }
  }

  async function handleRemoveItem(productId: string) {
    if (!confirm("장바구니에서 삭제하시겠습니까?")) return;

    try {
      const response = await fetch("/api/carts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setCartItems((items) => items.filter((item) => item.productId !== productId));

      // Refresh cart count in header
      await refreshCartCount();
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("상품 삭제에 실패했습니다.");
    }
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    // For now, redirect to checkout with first item
    // TODO: Support multiple items checkout
    const firstItem = cartItems[0];
    if (firstItem.product) {
      router.push(
        `/checkout?productId=${firstItem.productId}&quantity=${firstItem.quantity}`
      );
    }
  }

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">장바구니를 불러오는 중...</p>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const shippingFee = totalAmount >= 30000 ? 0 : 3000;
  const finalAmount = totalAmount + shippingFee;

  return (
    <div className="container py-8 max-w-6xl px-4">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">장바구니</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          총 {cartItems.length}개의 상품이 담겨있습니다
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            장바구니가 비어있습니다
          </p>
          <Link href="/products">
            <Button>
              <Package className="h-4 w-4 mr-2" />
              쇼핑 계속하기
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = item.product;
              if (!product) {
                return (
                  <div
                    key={item.id}
                    className="p-6 border border-border rounded-lg bg-card"
                  >
                    <p className="text-muted-foreground">
                      상품 정보를 불러올 수 없습니다
                    </p>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 border border-border rounded-lg bg-card hover:border-primary transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                      <span className="text-3xl sm:text-4xl">📦</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Link href={`/products/${product.id}`} className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        {/* Remove Button (Mobile - Top Right) */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="flex-shrink-0 h-8 w-8 sm:hidden"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        {product.categoryId}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-10 sm:w-12 text-center text-sm sm:text-base text-foreground font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-left sm:text-right">
                          <p className="text-base sm:text-lg font-bold text-foreground">
                            {(product.price * item.quantity).toLocaleString()}원
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            개당 {product.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button (Desktop - Right Side) */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.productId)}
                      className="hidden sm:flex flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="p-4 sm:p-6 border border-border rounded-lg bg-card lg:sticky lg:top-4">
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                주문 요약
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">상품 금액</span>
                  <span className="text-foreground">
                    {totalAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">배송비</span>
                  <span className="text-foreground">
                    {shippingFee === 0
                      ? "무료"
                      : `${shippingFee.toLocaleString()}원`}
                  </span>
                </div>
                {totalAmount < 30000 && (
                  <p className="text-xs text-muted-foreground">
                    30,000원 이상 구매 시 무료배송
                  </p>
                )}
              </div>

              <div className="h-px bg-border my-4" />

              <div className="flex justify-between mb-6">
                <span className="text-sm sm:text-lg font-semibold text-foreground">
                  총 결제 금액
                </span>
                <span className="text-base sm:text-lg font-bold text-primary">
                  {finalAmount.toLocaleString()}원
                </span>
              </div>

              <Button
                size="lg"
                className="w-full mb-3"
                onClick={handleCheckout}
              >
                구매하기
              </Button>

              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full">
                  쇼핑 계속하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

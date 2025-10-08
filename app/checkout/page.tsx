"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Product } from "@/entities/product/model/types";
import { DeliveryAddress } from "@/entities/user";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("productId");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  // TODO: 실제 사용자 ID는 인증 시스템에서 가져와야 함
  const userId = "demo-user-id";

  const [product, setProduct] = useState<Product | null>(null);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!productId) {
        router.push("/products");
        return;
      }

      setLoading(true);
      try {
        // Fetch product
        const productRes = await fetch(`/api/products/${productId}`);
        const productData = await productRes.json();
        setProduct(productData.product);

        // Fetch addresses
        const addressRes = await fetch(`/api/delivery-addresses?userId=${userId}`);
        const addressData = await addressRes.json();
        setAddresses(addressData.addresses || []);

        // Select default address
        const defaultAddress = addressData.addresses?.find((a: DeliveryAddress) => a.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (addressData.addresses?.length > 0) {
          setSelectedAddressId(addressData.addresses[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId, router]);

  const handlePurchase = async () => {
    if (!selectedAddressId) {
      alert("배송지를 선택해주세요.");
      return;
    }

    if (!product) return;

    try {
      // TODO: 실제 주문 API 호출
      console.log("Purchase:", {
        userId,
        productId: product.id,
        quantity,
        addressId: selectedAddressId,
        totalAmount: product.price * quantity,
      });

      alert("주문이 완료되었습니다!");
      router.push("/");
    } catch (error) {
      console.error("Failed to purchase:", error);
      alert("주문에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          상품을 찾을 수 없습니다
        </h1>
        <Link href="/products">
          <Button>전체 상품 보기</Button>
        </Link>
      </div>
    );
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
  const totalAmount = product.price * quantity;
  const shippingFee = totalAmount >= 30000 ? 0 : 3000;
  const finalAmount = totalAmount + shippingFee;

  return (
    <div className="container py-8 max-w-4xl">
      {/* Back Button */}
      <Link
        href={`/products/${productId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        상품으로 돌아가기
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-8">주문하기</h1>

      <div className="space-y-6">
        {/* Product Info */}
        <div className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">주문 상품</h2>
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                수량: {quantity}개
              </p>
              <p className="text-lg font-bold text-foreground">
                {product.price.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">배송지</h2>
            <Link href="/my/addresses">
              <Button variant="outline" size="sm">
                배송지 관리
              </Button>
            </Link>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                등록된 배송지가 없습니다
              </p>
              <Link href="/my/addresses">
                <Button>배송지 추가하기</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAddressId === address.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">
                        {address.recipientName}
                      </span>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                          기본
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {address.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ({address.postalCode}) {address.address}
                    </p>
                    {address.addressDetail && (
                      <p className="text-sm text-muted-foreground">
                        {address.addressDetail}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            결제 금액
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">상품 금액</span>
              <span className="text-foreground">
                {totalAmount.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">배송비</span>
              <span className="text-foreground">
                {shippingFee === 0
                  ? "무료"
                  : `${shippingFee.toLocaleString()}원`}
              </span>
            </div>
            <div className="h-px bg-border my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">총 결제 금액</span>
              <span className="text-primary">{finalAmount.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <Button
          size="lg"
          className="w-full"
          onClick={handlePurchase}
          disabled={!selectedAddressId}
        >
          {finalAmount.toLocaleString()}원 결제하기
        </Button>
      </div>
    </div>
  );
}

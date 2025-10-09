"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, ChevronLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Product } from "@/entities/product/model/types";
import { CATEGORIES } from "@/shared/config/categories";
import { ProductDetailSkeleton } from "../ProductDetailSkeleton";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    // TODO: Get actual userId from authentication
    // For now using a demo userId
    setUserId(1);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (data.product) {
          setProduct(data.product);

          // Fetch related products
          const relatedResponse = await fetch(`/api/products?category=${data.product.categoryId}`);
          const relatedData = await relatedResponse.json();
          setRelatedProducts(
            (relatedData.products || [])
              .filter((p: Product) => p.id !== productId)
              .slice(0, 4)
          );
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">상품을 찾을 수 없습니다</h1>
        <Link href="/products">
          <Button>전체 상품 보기</Button>
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.categoryId);
  const totalPrice = product.price * quantity;

  // Mock data for detail page
  const productDescription = product.description || `${product.name}는 최고의 품질과 성능을 자랑하는 제품입니다. 트렌디한 디자인과 실용성을 모두 갖춘 이 제품으로 일상의 변화를 경험해보세요.`;

  const productFeatures = product.features || [
    "프리미엄 소재 사용",
    "간편한 사용법",
    "우수한 내구성",
    "세련된 디자인",
  ];

  const productSpecs = product.specifications || {
    "브랜드": "띵차 셀렉션",
    "원산지": "한국",
    "보증기간": "1년",
  };

  const shippingInfo = product.shippingInfo || {
    freeShipping: product.price >= 30000,
    estimatedDays: "1-2일",
  };

  return (
    <div className="container py-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        상품 목록으로
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
              {product.badge}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          <div className="mb-2">
            <Link
              href={`/products?category=${product.categoryId}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {category?.icon} {category?.name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.toLocaleString()}개 리뷰)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-border">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-foreground">
                {product.price.toLocaleString()}원
              </span>
              <span className="text-lg text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
            </div>
            <div className="inline-block px-2 py-1 bg-red-500 text-background text-sm font-semibold rounded">
              {product.discount}% 할인
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">상품 설명</h2>
            <p className="text-muted-foreground leading-relaxed">
              {productDescription}
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">주요 특징</h2>
            <ul className="space-y-2">
              {productFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="mb-6 pb-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground mb-3">상품 정보</h2>
            <dl className="space-y-2">
              {Object.entries(productSpecs).map(([key, value]) => (
                <div key={key} className="flex items-center gap-4">
                  <dt className="text-sm text-muted-foreground min-w-[80px]">{key}</dt>
                  <dd className="text-sm text-foreground font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Shipping & Benefits */}
          <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xs font-medium text-foreground">
                  {shippingInfo.freeShipping ? "무료배송" : "배송비 별도"}
                </p>
                <p className="text-xs text-muted-foreground">{shippingInfo.estimatedDays}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xs font-medium text-foreground">안전거래</p>
                <p className="text-xs text-muted-foreground">구매자 보호</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RotateCcw className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xs font-medium text-foreground">교환/반품</p>
                <p className="text-xs text-muted-foreground">7일 이내</p>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">수량</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-6 py-2 border-x border-border text-foreground font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <div className="flex-1 text-right">
                <span className="text-sm text-muted-foreground">합계: </span>
                <span className="text-xl font-bold text-foreground">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={async () => {
                if (!userId) return;
                try {
                  if (isWishlisted) {
                    await fetch('/api/wishlists', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId, productId: product.id })
                    });
                    setIsWishlisted(false);
                  } else {
                    await fetch('/api/wishlists', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ userId, productId: product.id })
                    });
                    setIsWishlisted(true);
                  }
                } catch (error) {
                  console.error('Failed to toggle wishlist:', error);
                }
              }}
              className="px-4"
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={async () => {
                if (!userId) return;
                try {
                  await fetch('/api/carts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, productId: product.id, quantity })
                  });
                  alert('장바구니에 담았습니다!');
                } catch (error) {
                  console.error('Failed to add to cart:', error);
                  alert('장바구니 담기에 실패했습니다.');
                }
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              장바구니 담기
            </Button>
            <Link href={`/checkout?productId=${product.id}&quantity=${quantity}`} className="flex-1">
              <Button size="lg" className="w-full" variant="default">
                바로 구매
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">추천 상품</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">
                      {relatedProduct.price.toLocaleString()}원
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {relatedProduct.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

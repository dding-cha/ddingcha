"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/entities/product/model/types"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState<"description" | "reviews" | "shipping">("description")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const totalPrice = product.price * quantity

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">홈</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/#products" className="hover:text-foreground">상품</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="text-8xl">📦</div>
            </div>
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                {product.badge}
              </div>
            )}
            {product.trending && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-full">
                트렌딩
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <button
                key={i}
                className="aspect-square bg-muted rounded-lg hover:ring-2 ring-primary transition-all"
              >
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  📦
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">띵차 트렌딩</p>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()}개 리뷰)</span>
            </div>

            {/* Price */}
            <div className="space-y-2 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
                <span className="text-2xl font-bold text-primary">
                  {product.discount}% 할인
                </span>
              </div>
              <div className="text-4xl font-bold text-foreground">
                {product.price.toLocaleString()}원
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center space-y-1">
              <Truck className="h-5 w-5 mx-auto text-primary" />
              <p className="text-xs font-medium">무료 배송</p>
              <p className="text-xs text-muted-foreground">5만원 이상</p>
            </div>
            <div className="text-center space-y-1">
              <Shield className="h-5 w-5 mx-auto text-primary" />
              <p className="text-xs font-medium">정품 보장</p>
              <p className="text-xs text-muted-foreground">100% 정품</p>
            </div>
            <div className="text-center space-y-1">
              <RotateCcw className="h-5 w-5 mx-auto text-primary" />
              <p className="text-xs font-medium">무료 반품</p>
              <p className="text-xs text-muted-foreground">7일 이내</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">수량</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <span className="font-medium">총 상품 금액</span>
              <span className="text-2xl font-bold text-primary">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Share2 className="h-5 w-5" />
            </Button>
            <Link href={`/checkout?productId=${product.id}&quantity=${quantity}`} className="flex-1">
              <Button size="lg" className="w-full gap-2">
                <ShoppingCart className="h-5 w-5" />
                구매하기
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-border pt-4 space-y-2 text-sm text-muted-foreground">
            <p>✓ 50,000명 이상의 고객이 만족한 상품</p>
            <p>✓ 틱톡 트렌딩 1위 상품</p>
            <p>✓ 첫 주문 시 20% 추가 할인</p>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-border">
          <div className="flex gap-8">
            <button
              onClick={() => setSelectedTab("description")}
              className={`pb-4 text-sm font-medium transition-colors ${
                selectedTab === "description"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              상품 설명
            </button>
            <button
              onClick={() => setSelectedTab("reviews")}
              className={`pb-4 text-sm font-medium transition-colors ${
                selectedTab === "reviews"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              리뷰 ({product.reviews.toLocaleString()})
            </button>
            <button
              onClick={() => setSelectedTab("shipping")}
              className={`pb-4 text-sm font-medium transition-colors ${
                selectedTab === "shipping"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              배송 정보
            </button>
          </div>
        </div>

        <div className="py-8">
          {selectedTab === "description" && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-4">상품 상세 정보</h3>
              <p className="text-muted-foreground mb-4">
                {product.name}은(는) 틱톡에서 화제가 된 트렌딩 상품입니다.
                높은 품질과 합리적인 가격으로 많은 고객들의 사랑을 받고 있습니다.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 고품질 소재 사용</li>
                <li>• 세련된 디자인</li>
                <li>• 다양한 활용도</li>
                <li>• 내구성 우수</li>
                <li>• 사용자 친화적</li>
              </ul>
            </div>
          )}

          {selectedTab === "reviews" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">고객 리뷰</h3>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      U{i}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">2024.10.{10 - i}</span>
                      </div>
                      <p className="text-sm text-foreground mb-2">
                        정말 좋은 상품이에요! 틱톡에서 보고 구매했는데 기대 이상입니다.
                        배송도 빠르고 품질도 훌륭해요. 강력 추천합니다!
                      </p>
                      <p className="text-xs text-muted-foreground">도움됨 {Math.floor(Math.random() * 50) + 10}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === "shipping" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">배송 및 반품 안내</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">배송 정보</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 배송비: 무료 (5만원 이상 구매 시)</li>
                    <li>• 배송 기간: 1-3일 (영업일 기준)</li>
                    <li>• 배송 지역: 전국 (제주/도서산간 지역 추가 비용)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">반품/교환 안내</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 반품 기한: 수령 후 7일 이내</li>
                    <li>• 반품 비용: 무료 (단순 변심 시 고객 부담)</li>
                    <li>• 교환 가능 여부: 상품 불량 시 무료 교환</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">이런 상품은 어때요?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                <Card className="group hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center text-4xl">
                    📦
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        {relatedProduct.price.toLocaleString()}원
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {relatedProduct.originalPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { MOCK_PRODUCTS } from "@/entities/product/model/mock-products"
import { CreditCard, Smartphone, Building, Package, MapPin, User, Mail, Phone, ChevronRight } from "lucide-react"

type PaymentMethod = "card" | "phone" | "bank"

export function CheckoutForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get("productId")
  const quantity = parseInt(searchParams.get("quantity") || "1")

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const product = MOCK_PRODUCTS.find((p) => p.id === productId)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    addressDetail: "",
    zipCode: "",
    memo: "",
  })

  useEffect(() => {
    if (!product) {
      router.push("/")
    }
  }, [product, router])

  if (!product) {
    return null
  }

  const subtotal = product.price * quantity
  const shipping = subtotal >= 50000 ? 0 : 3000
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("결제가 완료되었습니다! 주문해주셔서 감사합니다.")
    setIsProcessing(false)
    router.push("/")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => router.push("/")} className="hover:text-foreground">
          홈
        </button>
        <ChevronRight className="h-4 w-4" />
        <button onClick={() => router.push(`/products/${product.id}`)} className="hover:text-foreground">
          상품
        </button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">결제하기</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">주문/결제</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Buyer Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">주문자 정보</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="홍길동"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">전화번호 *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Delivery Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">배송지 정보</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="zipCode">우편번호 *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      placeholder="12345"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline">
                      주소 검색
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">주소 *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="서울시 강남구 테헤란로 123"
                  />
                </div>
                <div>
                  <Label htmlFor="addressDetail">상세 주소</Label>
                  <Input
                    id="addressDetail"
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={handleInputChange}
                    placeholder="아파트 동/호수, 건물명 등"
                  />
                </div>
                <div>
                  <Label htmlFor="memo">배송 메모</Label>
                  <Input
                    id="memo"
                    name="memo"
                    value={formData.memo}
                    onChange={handleInputChange}
                    placeholder="문 앞에 놓아주세요"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">결제 수단</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">신용/체크카드</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("phone")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "phone"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Smartphone className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">휴대폰 결제</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentMethod === "bank"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Building className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">무통장 입금</p>
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">주문 상품</h2>
              </div>

              {/* Product Info */}
              <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-2xl shrink-0">
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium mb-1 line-clamp-2">{product.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">수량: {quantity}개</p>
                  <p className="font-bold text-primary">{product.price.toLocaleString()}원</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">상품 금액</span>
                  <span className="font-medium">{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">배송비</span>
                  <span className="font-medium">
                    {shipping === 0 ? "무료" : `${shipping.toLocaleString()}원`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-primary">✓ 5만원 이상 구매로 무료 배송</p>
                )}
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium">총 결제 금액</span>
                    <span className="text-2xl font-bold text-primary">{total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                <p className="font-semibold mb-2">혜택 안내</p>
                <p className="text-muted-foreground">✓ 첫 주문 시 20% 추가 할인</p>
                <p className="text-muted-foreground">✓ 적립금 {Math.floor(total * 0.01).toLocaleString()}원 적립</p>
                <p className="text-muted-foreground">✓ 무료 반품 서비스 제공</p>
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? "결제 처리 중..." : `${total.toLocaleString()}원 결제하기`}
              </Button>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs text-muted-foreground text-center">
                <p>🔒 SSL 보안 결제</p>
                <p>💳 PG사 안전거래 보장</p>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

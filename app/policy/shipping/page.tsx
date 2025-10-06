import { Metadata } from 'next'
import { Truck, Plane, MapPin, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: '배송 정책 | 띵차',
  description: '띵차 배송 정책 - 해외 직구 배송 안내',
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Truck className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            배송 정책
          </h1>
          <p className="text-lg text-muted-foreground">
            띵차는 해외 우수 제품을 고객님께 직배송하는 해외 직구 서비스입니다.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              1. 배송 기간
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* 일반 배송 */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-card-foreground">일반 배송</h3>
                </div>
                <p className="text-2xl font-bold text-primary">15-25일 소요</p>
                <ul className="space-y-2">
                  {[
                    '현지 출고: 3-5일',
                    '국제 배송: 7-15일',
                    '통관 및 국내 배송: 3-5일',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 특급 배송 */}
              <div className="bg-card border border-primary/20 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Plane className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-card-foreground">특급 배송</h3>
                </div>
                <p className="text-2xl font-bold text-primary">7-12일 소요</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">빠른 항공 배송으로 진행</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">추가 비용 발생</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              2. 배송 추적
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '해외 발송 시 트래킹 번호 제공',
                  '마이페이지에서 실시간 배송 조회 가능',
                  '통관 진행 상황 SMS/이메일 알림',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              3. 배송비
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="font-semibold text-card-foreground">일반 배송</p>
                  <p className="text-2xl font-bold text-primary">5,000원</p>
                  <p className="text-sm text-muted-foreground">
                    50,000원 이상 구매 시 무료
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-card-foreground">특급 배송</p>
                  <p className="text-2xl font-bold text-primary">15,000원</p>
                  <p className="text-sm text-muted-foreground">무료 배송 적용 불가</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  * 대형/중량 상품은 추가 배송비가 발생할 수 있습니다
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              4. 관세 및 통관
            </h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 sm:p-8 space-y-4">
              <ul className="space-y-3">
                {[
                  '150달러 이하: 관세 면제 (단, 일부 품목 제외)',
                  '150달러 초과: 관세 + 부가세 발생 (고객 부담)',
                  '통관 시 개인통관고유부호 필요 (주문 시 입력)',
                  '관세 예상 금액은 상품 상세페이지에서 확인 가능',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              5. 배송 지연 안내
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground">다음의 경우 배송이 지연될 수 있습니다:</p>
              <ul className="space-y-3">
                {[
                  '현지 재고 부족',
                  '통관 검사 지연',
                  '천재지변, 코로나19 등 불가항력적 상황',
                  '명절 연휴 기간',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              6. 배송 불가 지역
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-card-foreground font-semibold">제주/도서산간</p>
                    <p className="text-sm text-muted-foreground">추가 배송비 3,000원</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-card-foreground font-semibold">
                      일부 해외 직구 제한 지역
                    </p>
                    <p className="text-sm text-muted-foreground">
                      해당 지역은 주문 시 안내됩니다
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-muted/30 rounded-xl p-6 sm:p-8 text-center space-y-4">
            <p className="text-foreground font-semibold">배송 관련 문의</p>
            <p className="text-muted-foreground">
              배송과 관련하여 궁금하신 사항이 있으시면
              <br />
              고객센터로 문의해주시기 바랍니다.
            </p>
            <a
              href="mailto:shipping@ddingcha.com"
              className="inline-block text-primary hover:underline font-medium"
            >
              shipping@ddingcha.com
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

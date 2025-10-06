import { Metadata } from 'next'
import { RotateCcw } from 'lucide-react'

export const metadata: Metadata = {
  title: '환불 정책 | 띵차',
  description: '띵차 환불 정책 - 고객님의 권리를 보호합니다.',
}

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            환불 정책
          </h1>
          <p className="text-lg text-muted-foreground">
            고객님의 권리를 보호하고 합리적인 환불 정책을 제공합니다.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              1. 환불 가능 기간
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <ul className="space-y-3">
                {[
                  '상품 수령 후 7일 이내 (단, 해외 배송 특성상 왕복 배송 기간 고려 필요)',
                  '단순 변심의 경우: 상품 미개봉, 미사용 상태만 가능',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              2. 환불 불가 사유
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '고객님의 책임 있는 사유로 상품이 훼손된 경우',
                  '포장 개봉으로 상품 가치가 현저히 감소한 경우',
                  '시간 경과로 재판매가 곤란한 경우',
                  '주문 제작 상품',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              3. 해외 직구 상품 환불 안내
            </h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-foreground font-semibold">
                해외에서 직접 구매하는 상품 특성상:
              </p>
              <ul className="space-y-3">
                {[
                  '왕복 국제배송비는 고객 부담입니다',
                  '환불 처리 기간이 2-4주 소요될 수 있습니다',
                  '관세 환급은 별도로 진행하셔야 합니다',
                  '제품 하자의 경우 국제배송비는 띵차가 부담합니다',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              4. 환불 절차
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: 'STEP 1', title: '환불 신청', desc: '고객센터 환불 신청' },
                { step: 'STEP 2', title: '주소 안내', desc: '반품 주소 안내 받기' },
                { step: 'STEP 3', title: '상품 반송', desc: '상품 반송' },
                { step: 'STEP 4', title: '환불 처리', desc: '상품 확인 후 환불\n(영업일 기준 3-5일)' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 space-y-3 text-center"
                >
                  <div className="text-xs font-bold text-primary">{item.step}</div>
                  <div className="text-lg font-bold text-card-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-muted/30 rounded-xl p-6 sm:p-8 text-center space-y-4">
            <p className="text-foreground font-semibold">환불 관련 문의</p>
            <p className="text-muted-foreground">
              환불 절차나 정책에 대해 궁금하신 사항이 있으시면
              <br />
              고객센터로 문의해주시기 바랍니다.
            </p>
            <a
              href="mailto:refund@ddingcha.com"
              className="inline-block text-primary hover:underline font-medium"
            >
              refund@ddingcha.com
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

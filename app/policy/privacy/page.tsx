import { Metadata } from 'next'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: '개인정보처리방침 | 띵차',
  description: '띵차 개인정보처리방침 - 고객님의 개인정보를 안전하게 보호합니다.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            개인정보처리방침
          </h1>
          <p className="text-lg text-muted-foreground">
            띵차는 고객님의 개인정보를 소중히 다루며, 안전하게 보호합니다.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              1. 수집하는 개인정보 항목
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground leading-relaxed">
                띵차는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-card-foreground mb-2">필수항목</p>
                  <p className="text-muted-foreground">
                    이름, 이메일, 휴대폰번호, 배송지 주소, 결제정보
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-card-foreground mb-2">선택항목</p>
                  <p className="text-muted-foreground">생년월일, 성별</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              2. 개인정보의 수집 및 이용목적
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '회원 가입 및 관리',
                  '상품 주문, 결제, 배송',
                  '고객 문의 응대 및 A/S 처리',
                  '마케팅 및 광고 활용 (선택 동의 시)',
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
              3. 개인정보의 보유 및 이용기간
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground leading-relaxed">
                회원 탈퇴 시까지 (단, 관계 법령에 따라 일정 기간 보관)
              </p>
              <ul className="space-y-3">
                {[
                  '전자상거래법에 따라 계약/청약철회 기록: 5년 보관',
                  '대금결제 및 재화 공급 기록: 5년 보관',
                  '소비자 불만 및 분쟁처리 기록: 3년 보관',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              4. 개인정보 제3자 제공
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground leading-relaxed">
                해외 배송 특성상 다음 업체에 개인정보를 제공합니다:
              </p>
              <ul className="space-y-3">
                {[
                  '해외 셀러 및 물류업체 (상품 발송 및 배송을 위해)',
                  'PG사 (결제 처리를 위해)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground font-medium">
                  고객님의 동의 없이 다른 목적으로 정보를 제공하지 않습니다
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-muted/30 rounded-xl p-6 sm:p-8 text-center space-y-4">
            <p className="text-foreground font-semibold">개인정보 관련 문의</p>
            <p className="text-muted-foreground">
              개인정보 처리와 관련하여 궁금하신 사항이 있으시면
              <br />
              고객센터로 문의해주시기 바랍니다.
            </p>
            <a
              href="mailto:privacy@ddingcha.com"
              className="inline-block text-primary hover:underline font-medium"
            >
              privacy@ddingcha.com
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

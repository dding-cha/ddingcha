import { Metadata } from 'next'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: '이용약관 | 띵차',
  description: '띵차 서비스 이용약관',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            이용약관
          </h1>
          <p className="text-lg text-muted-foreground">
            띵차 서비스 이용에 관한 약관입니다.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Article 1 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제1조 (목적)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <p className="text-card-foreground leading-relaxed">
                본 약관은 띵차(이하 &ldquo;회사&rdquo;)가 제공하는 해외 직구 쇼핑몰 서비스(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>
          </section>

          {/* Article 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제2조 (정의)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <ul className="space-y-3">
                {[
                  '"회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 말합니다.',
                  '"해외 직구"란 해외 판매자로부터 상품을 직접 구매하여 국내로 배송하는 서비스를 말합니다.',
                  '"상품"이란 회사가 제공하는 모든 유형의 재화를 말합니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Article 3 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제3조 (약관의 효력 및 변경)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.',
                  '회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.',
                  '변경된 약관은 시행일 7일 전부터 공지하며, 회원에게 불리한 변경의 경우 30일 전에 공지합니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Article 4 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제4조 (회원가입)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground">
                회원가입은 이용자가 약관에 동의하고 회사가 정한 가입 양식에 따라 정보를 기입한 후, 회사가 이를 승낙함으로써 체결됩니다.
              </p>
              <div className="pt-4 space-y-3">
                <p className="text-card-foreground font-semibold">
                  회사는 다음 각호에 해당하는 경우 회원가입을 거부할 수 있습니다:
                </p>
                <ul className="space-y-2">
                  {[
                    '타인의 명의를 도용한 경우',
                    '허위 정보를 기재한 경우',
                    '만 14세 미만인 경우',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Article 5 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제5조 (주문 및 결제)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground">
                회원은 회사가 제공하는 절차에 따라 상품을 주문합니다.
              </p>
              <div className="pt-4 space-y-3">
                <p className="text-card-foreground font-semibold">
                  회사는 회원의 구매신청이 다음 각호에 해당하는 경우 승낙하지 않을 수 있습니다:
                </p>
                <ul className="space-y-2">
                  {[
                    '신청 내용에 허위, 기재누락, 오기가 있는 경우',
                    '미성년자가 법정대리인의 동의 없이 구매하는 경우',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Article 6 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제6조 (해외 직구 서비스 특성)
            </h2>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '본 서비스는 해외 판매자로부터 상품을 직접 구매하는 방식입니다.',
                  '배송 지연, 상품 하자 등의 경우 해외 판매자 및 물류 사정에 따라 처리가 지연될 수 있습니다.',
                  '관세 및 통관 관련 사항은 회원이 직접 확인하고 부담해야 합니다.',
                  '해외 상품의 특성상 한국 인증(KC, KS 등)이 없을 수 있으며, 이는 교환/환불 사유가 되지 않습니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Article 7 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제7조 (회사의 의무)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '회사는 관련 법령과 본 약관이 금지하는 행위를 하지 않으며, 지속적이고 안정적인 서비스 제공을 위해 최선을 다합니다.',
                  '회사는 회원의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 준수합니다.',
                  '회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 인정될 경우 신속히 처리합니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Article 8 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제8조 (회원의 의무)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
              <p className="text-card-foreground font-semibold">
                회원은 다음 행위를 해서는 안 됩니다:
              </p>
              <ul className="space-y-3">
                {[
                  '신청 또는 변경 시 허위내용 등록',
                  '타인의 정보 도용',
                  '회사의 정보 변경',
                  '회사가 정한 정보 이외의 정보 송신 또는 게시',
                  '불법 복제, 배포',
                  '외설, 폭력적인 내용의 정보 유포',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-card-foreground pt-4">
                회원은 관계 법령, 본 약관, 이용안내 및 서비스상 공지한 주의사항을 준수해야 합니다.
              </p>
            </div>
          </section>

          {/* Article 9 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제9조 (서비스의 제한 및 중지)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '회사는 전시, 사변, 천재지변, 국가비상사태, 해결이 곤란한 기술적 결함 등 부득이한 경우 서비스를 제한하거나 중지할 수 있습니다.',
                  '서비스 중단으로 인한 손해에 대해서는 회사에 고의 또는 중과실이 없는 한 책임을 지지 않습니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Article 10 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제10조 (면책조항)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '회사는 천재지변, 전쟁, 해외 정세 변화 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.',
                  '회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.',
                  '회사는 해외 판매자 및 배송업체의 귀책사유로 발생한 손해에 대해 직접적인 책임을 지지 않으나, 중재 및 지원을 제공합니다.',
                  '회사는 관세 및 통관 관련 문제에 대해 책임을 지지 않습니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Article 11 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              제11조 (분쟁해결)
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <ul className="space-y-3">
                {[
                  '회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위해 노력합니다.',
                  '회사와 이용자 간 분쟁이 발생한 경우, 회사 본사 소재지 법원을 관할법원으로 합니다.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-muted/30 rounded-xl p-6 sm:p-8 text-center space-y-4">
            <p className="text-foreground font-semibold">약관 관련 문의</p>
            <p className="text-muted-foreground">
              이용약관과 관련하여 궁금하신 사항이 있으시면
              <br />
              고객센터로 문의해주시기 바랍니다.
            </p>
            <a
              href="mailto:legal@ddingcha.com"
              className="inline-block text-primary hover:underline font-medium"
            >
              legal@ddingcha.com
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}

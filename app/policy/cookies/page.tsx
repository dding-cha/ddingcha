import { Metadata } from 'next'
import { Cookie } from 'lucide-react'

export const metadata: Metadata = {
  title: '쿠키 정책 | 띵차',
  description: '띵차 쿠키 정책 - 쿠키 사용 및 관리 안내',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            쿠키 정책
          </h1>
          <p className="text-lg text-muted-foreground">
            띵차의 쿠키 사용 및 관리 방법을 안내합니다.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              1. 쿠키란?
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <p className="text-card-foreground leading-relaxed">
                쿠키(Cookie)는 웹사이트를 방문할 때 귀하의 브라우저에 저장되는 작은 텍스트 파일입니다. 쿠키를 통해 웹사이트는 귀하의 방문 기록과 활동을 기억할 수 있습니다.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              2. 띵차의 쿠키 사용 목적
            </h2>
            <div className="space-y-6">
              {/* 필수 쿠키 */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                    필수
                  </div>
                  <h3 className="text-xl font-bold text-foreground">필수 쿠키 (거부 불가)</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    '로그인 상태 유지',
                    '장바구니 기능',
                    '보안 및 사이트 안정성 유지',
                    '결제 프로세스 처리',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 기능 쿠키 */}
              <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold">
                    선택
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground">기능 쿠키 (선택 가능)</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    '언어 및 지역 설정 저장',
                    '사용자 맞춤 설정 기억',
                    '최근 본 상품 표시',
                    '검색 기록 저장',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              3. 쿠키 관리 방법
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
              <p className="text-card-foreground leading-relaxed">
                대부분의 웹 브라우저는 쿠키를 자동으로 허용하도록 설정되어 있지만, 브라우저 설정을 통해 쿠키를 거부하거나 삭제할 수 있습니다.
              </p>

              <div className="space-y-4">
                <h4 className="font-semibold text-card-foreground">브라우저별 쿠키 설정</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { browser: 'Chrome', path: '설정 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터' },
                    { browser: 'Safari', path: '환경설정 > 개인정보 > 쿠키 및 웹사이트 데이터' },
                    { browser: 'Firefox', path: '설정 > 개인정보 및 보안 > 쿠키 및 사이트 데이터' },
                    { browser: 'Edge', path: '설정 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터' },
                  ].map((item, index) => (
                    <div key={index} className="bg-muted/30 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-foreground">{item.browser}</p>
                      <p className="text-sm text-muted-foreground">{item.path}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground">
                  ⚠️ 쿠키를 거부하면 일부 서비스 이용에 제한이 있을 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
              4. 정책 변경
            </h2>
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
              <p className="text-card-foreground leading-relaxed">
                본 쿠키 정책은 관련 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.
              </p>
            </div>
          </section>

          {/* Contact Info */}
          <section className="bg-muted/30 rounded-xl p-6 sm:p-8 text-center space-y-4">
            <p className="text-foreground font-semibold">쿠키 정책 관련 문의</p>
            <p className="text-muted-foreground">
              쿠키 정책과 관련하여 궁금하신 사항이 있으시면
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

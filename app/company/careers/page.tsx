import { Metadata } from 'next'
import { Briefcase, Heart, Rocket, Target, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: '채용 | 띵차',
  description: '띵차와 함께 성장할 동료를 찾습니다. 글로벌 커머스의 새로운 기준을 만들어갈 열정적인 인재를 모집합니다.',
}

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
              채용
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-semibold">
              띵차와 함께 성장할 동료를 찾습니다
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              글로벌 커머스의 새로운 기준을 만들어갈 열정적인 인재를 찾고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
              띵차의 문화
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">도전</h3>
                <p className="text-muted-foreground leading-relaxed">
                  새로운 시장과 기회를 적극적으로 탐색합니다
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">성장</h3>
                <p className="text-muted-foreground leading-relaxed">
                  개인과 회사가 함께 성장하는 환경을 만듭니다
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">협업</h3>
                <p className="text-muted-foreground leading-relaxed">
                  서로 존중하고 신뢰하는 수평적 문화를 지향합니다
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">고객 중심</h3>
                <p className="text-muted-foreground leading-relaxed">
                  고객 만족을 최우선으로 생각합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
              복리후생
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                '경쟁력 있는 연봉 및 인센티브',
                '자율 출퇴근제 / 원격근무 가능',
                '해외 출장 및 바잉 기회',
                '교육/도서 지원',
                '명절 선물 / 경조사 지원',
                '최신 업무 장비 제공',
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-card border border-border rounded-lg p-6"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-card-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
              채용 중인 포지션
            </h2>

            <div className="bg-card border border-border rounded-xl p-12 sm:p-16 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xl font-semibold text-card-foreground">
                  현재 채용 중인 포지션이 없습니다
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  새로운 기회가 생기면 이곳에서 가장 먼저 공지해드리겠습니다.
                  <br />
                  띵차의 성장을 함께 지켜봐 주세요!
                </p>
              </div>
            </div>

            <div className="mt-12 text-center space-y-4">
              <p className="text-muted-foreground">
                채용 관련 문의는 아래 이메일로 연락주세요
              </p>
              <a
                href="mailto:careers@ddingcha.com"
                className="inline-block text-lg font-semibold text-primary hover:underline"
              >
                careers@ddingcha.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

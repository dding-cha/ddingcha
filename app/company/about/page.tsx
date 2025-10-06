import { Metadata } from 'next'
import { Globe, Package, Plane, Search, Shield, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: '회사 소개 | 띵차',
  description: '띵차 - 세계의 띵작들을 당신에게. 글로벌 셀렉트샵 띵차를 소개합니다.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
              띵차
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-semibold">
              세계의 띵작들을 당신에게
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              띵차는 전 세계에서 발굴한 독특하고 특별한 제품들을 한국에 직접 들여와 판매하는 글로벌 셀렉트샵입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                &ldquo;이거 정말 띵작이다!&rdquo;
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                해외여행 중 우연히 발견한 제품, SNS에서 보고 너무나 갖고 싶었던 아이템, 국내에서는 구할 수 없는 특별한 브랜드...
                <br />
                띵차는 이런 제품들을 전 세계에서 직접 찾아 한국으로 가져옵니다.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 sm:p-12 space-y-6">
              <h3 className="text-2xl font-bold text-card-foreground">우리의 이야기</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  좋은 제품을 발견해도 구매할 방법이 없었던 경험, 다들 있으시죠? 해외 사이트는 복잡하고, 배송은 불안하고, 관세는 얼마가 나올지 모르고...
                </p>
                <p className="font-semibold text-foreground">
                  띵차는 다릅니다. 우리가 직접 가서 물건을 떼옵니다.
                </p>
                <p>
                  미국, 유럽, 일본을 직접 발로 뛰며 좋은 제품을 소싱하고, 정식으로 수입해서 판매합니다. 복잡한 해외 직구 과정 없이, 국내 쇼핑하듯 편하게 주문하시면 됩니다. 정품에 합리적인 가격까지 보장하니까요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
              우리의 미션
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">글로벌 소싱</h3>
                <p className="text-muted-foreground leading-relaxed">
                  바이어들이 세계 각지를 직접 돌아다니며 특별한 제품을 발굴합니다. 현지 전시회, 숨은 매장, 신진 브랜드까지 샅샅이 훑습니다.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">직접 수입</h3>
                <p className="text-muted-foreground leading-relaxed">
                  좋은 제품을 찾으면 우리가 직접 수입합니다. 중간 유통 단계를 없애 가격은 낮추고, 품질 관리는 철저하게 합니다.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">해외 직배송</h3>
                <p className="text-muted-foreground leading-relaxed">
                  해외에서 직접 가져오는 만큼 배송 시간이 소요됩니다. 하지만 그만큼 가격 경쟁력이 있고, 정품을 보장합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
              우리가 제공하는 가치
            </h2>

            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">큐레이션 - 진짜 좋은 것만 가져옵니다</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    바이어들이 직접 발품 팔아 찾은 제품들입니다. 디자인, 품질, 실용성까지 꼼꼼하게 체크하고, &ldquo;이건 한국 사람들이 좋아하겠다&rdquo; 싶은 것만 수입합니다. 유행 따라가기보다는, 오래 써도 질리지 않을 제대로 된 물건을 선별합니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">가격 - 중간 마진 없이 합리적으로</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    우리가 직접 소싱하고 직접 판매하니까 중간 마진이 없습니다. 백화점이나 편집샵에서 비싸게 팔 필요 없이, 원가에 우리 마진만 붙여서 판매합니다. 같은 제품을 더 싸게 살 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plane className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">배송 - 해외에서 직접 보내드립니다</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    해외에서 직접 배송되는 제품이 많아 2-3주 정도 소요될 수 있습니다. 조금 기다리셔야 하지만, 그만큼 가격 경쟁력이 있고 다양한 제품을 만나보실 수 있습니다. 배송 추적으로 실시간 확인도 가능합니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">정품 - 우리가 직접 가져온 겁니다</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    정품 여부를 걱정할 필요 없습니다. 우리가 직접 해외 브랜드, 매장, 유통사에서 정식으로 구매해온 제품입니다. 수입 서류도 다 있고, 문제 생기면 우리가 책임집니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
              띵차가 하는 일
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Plane, text: '세계 곳곳을 돌며 좋은 제품 발굴' },
                { icon: Globe, text: '현지 브랜드, 유통사와 직접 거래' },
                { icon: Package, text: '직접 수입으로 가격 경쟁력 확보' },
                { icon: Search, text: '입고 시 품질 검수 진행' },
                { icon: Shield, text: '해외에서 고객에게 직접 배송' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-card border border-border rounded-lg p-6">
                  <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                  <p className="text-card-foreground font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
              주요 취급 카테고리
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { emoji: '🎨', title: '패션 & 뷰티', desc: '해외 신진 디자이너 브랜드부터 인디 뷰티 브랜드까지' },
                { emoji: '🏠', title: '리빙 & 홈데코', desc: '감각적인 인테리어 소품과 실용적인 생활용품' },
                { emoji: '💻', title: '디지털 & 가전', desc: '국내 미출시 최신 가젯과 독특한 테크 제품' },
                { emoji: '⚽', title: '스포츠 & 아웃도어', desc: '전문가용 장비와 세련된 운동 용품' },
                { emoji: '🧸', title: '키즈 & 토이', desc: '안전하고 교육적인 해외 유아동 제품' },
              ].map((category, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6 space-y-3 hover:shadow-lg transition-shadow">
                  <div className="text-4xl">{category.emoji}</div>
                  <h3 className="text-xl font-bold text-card-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              띵차에서 쇼핑하면
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              더 이상 복잡한 해외 사이트 들어가지 않아도, 영어로 씨름하지 않아도 됩니다.
              <br />
              띵차가 직접 가져온 정품을 합리적인 가격에 만나보세요.
            </p>
            <p className="text-2xl font-bold text-primary">
              세계의 띵작들, 이제 쉽고 편하게 만나보세요. 🌟
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

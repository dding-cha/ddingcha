"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { HERO_BANNERS } from "@/entities/product/model/mock-products";

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative flex w-full bg-gradient-to-b from-background to-muted/20">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {HERO_BANNERS.map((banner, index) => (
            <div key={banner.id} className="flex-[0_0_100%] min-w-0">
              <div className="container py-12 md:py-20">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                  {/* Content */}
                  <div className="text-center lg:text-left space-y-6">
                    {banner.badge && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {banner.badge}
                      </div>
                    )}

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                      {index === 0 && (
                        <>
                          최신 트렌드
                          <span className="block text-primary mt-2">
                            지금 바로 만나보세요
                          </span>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          스마트한 선택
                          <span className="block text-primary mt-2">
                            특별한 가격
                          </span>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          여름 시즌
                          <span className="block text-primary mt-2">
                            최대 50% 할인
                          </span>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          첫 주문 20% 할인
                          <span className="block text-primary mt-2">
                            신규회원 혜택
                          </span>
                        </>
                      )}
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                      {index === 0 &&
                        "틱톡에서 화제인 인기 상품을 특별한 가격에 만나보세요"}
                      {index === 1 &&
                        "최신 기술이 담긴 스마트 워치를 지금 바로 경험하세요"}
                      {index === 2 && "여름을 시원하게 보낼 필수 아이템 대특가"}
                      {index === 3 &&
                        "50,000명 이상의 만족한 고객들과 함께 트렌드 쇼핑을 시작하세요. 5만원 이상 무료 배송!"}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      <Button size="lg" className="gap-2">
                        지금 쇼핑하기
                      </Button>
                      <Button size="lg" variant="outline">
                        자세히 보기
                      </Button>
                    </div>

                    {banner.price > 0 && (
                      <div className="flex items-baseline gap-3 justify-center lg:justify-start">
                        <span className="text-3xl font-bold text-primary">
                          {banner.price.toLocaleString()}원
                        </span>
                        <span className="text-xl text-muted-foreground line-through">
                          {banner.originalPrice.toLocaleString()}원
                        </span>
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                          {banner.discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl">
                      {index === 0
                        ? "📱"
                        : index === 1
                        ? "⌚"
                        : index === 2
                        ? "🌞"
                        : "🎁"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10 hidden md:inline-flex"
        onClick={scrollPrev}
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10 hidden md:inline-flex"
        onClick={scrollNext}
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}

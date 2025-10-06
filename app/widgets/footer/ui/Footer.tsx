"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  product: [
    { label: "상품", href: "/#products" },
    { label: "트렌딩", href: "/#trending" },
    { label: "자주 묻는 질문", href: "/faq" },
  ],
  company: [
    { label: "회사 소개", href: "/company/about" },
    { label: "블로그", href: "/company/blog" },
    { label: "채용", href: "/company/careers" },
  ],
  legal: [
    { label: "개인정보처리방침", href: "/policy/privacy" },
    { label: "환불 정책", href: "/policy/refund" },
    { label: "배송 정책", href: "/policy/shipping" },
    { label: "이용약관", href: "/policy/terms" },
    { label: "쿠키 정책", href: "/policy/cookies" },
  ],
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className={`border-t border-border bg-background transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="띵차 로고"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-xl font-bold text-foreground">띵차</span>
            </div>
            <p className="text-sm text-muted-foreground">
              틱톡 트렌드 상품을 빠르고 간편하게 집 앞까지
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">서비스</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">회사</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">법적 고지</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} 띵차. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

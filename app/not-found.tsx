import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-8 px-4 max-w-2xl mx-auto">
        {/* 404 Number with Animation */}
        <div className="relative">
          <h1 className="text-[150px] sm:text-[200px] font-black text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-24 h-24 sm:w-32 sm:h-32 text-primary animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            주소를 다시 확인해주세요.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Button asChild size="lg" className="gap-2 text-lg px-8 py-6">
            <Link href="/">
              <Home className="w-5 h-5" />
              홈으로 돌아가기
            </Link>
          </Button>
        </div>

        {/* Helper Links */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            메인 페이지
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="/#categories" className="hover:text-primary transition-colors">
            카테고리
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="/#products" className="hover:text-primary transition-colors">
            상품 보기
          </Link>
        </div>
      </div>
    </div>
  )
}

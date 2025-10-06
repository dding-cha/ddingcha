import { Metadata } from 'next'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: '블로그 | 띵차',
  description: '띵차 블로그 - 곧 찾아뵙겠습니다.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            블로그
          </h1>
          <p className="text-xl text-muted-foreground">
            띵차의 이야기를 준비 중입니다
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 sm:p-12 space-y-4">
          <p className="text-lg text-card-foreground font-semibold">
            준비 중입니다
          </p>
          <p className="text-muted-foreground leading-relaxed">
            띵차의 글로벌 소싱 이야기, 제품 큐레이션 비하인드, 그리고 다양한 쇼핑 팁을 곧 공유해드릴 예정입니다.
            <br />
            조금만 기다려주세요!
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          문의사항이 있으시면{' '}
          <a href="/#contact" className="text-primary hover:underline">
            고객센터
          </a>
          로 연락주세요.
        </p>
      </div>
    </div>
  )
}

import { Faq } from "@/widgets/faq"

export const metadata = {
  title: "자주 묻는 질문 | 띵차",
  description: "띵차 쇼핑몰에 대해 자주 묻는 질문과 답변을 확인하세요.",
}

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="container py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            자주 묻는 질문
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            띵차에 대해 궁금한 점을 확인해보세요
          </p>
        </div>
        <Faq />
      </div>
    </div>
  )
}

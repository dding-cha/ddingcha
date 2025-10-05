"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion"

const faqs = [
  {
    question: "배송은 얼마나 걸리나요?",
    answer: "대부분의 주문은 2-4일 이내에 도착합니다. 일부 상품의 경우 영업일 기준 5-7일이 소요될 수 있습니다.",
  },
  {
    question: "어떤 결제 방법을 지원하나요?",
    answer: "모든 주요 신용카드, 체크카드, 네이버페이, 카카오페이, 토스페이 등 다양한 결제 수단을 지원합니다.",
  },
  {
    question: "주문을 추적할 수 있나요?",
    answer: "네! 주문이 발송되면 이메일로 송장번호를 받으실 수 있으며, 실시간으로 배송 상태를 확인하실 수 있습니다.",
  },
  {
    question: "반품 정책은 어떻게 되나요?",
    answer: "대부분의 상품은 30일 반품 보장이 제공됩니다. 만족하지 않으시면 고객 지원팀에 연락하여 반품을 요청하세요.",
  },
  {
    question: "해외 배송도 가능한가요?",
    answer: "현재는 국내 배송만 지원하고 있습니다. 해외 배송 옵션은 곧 추가될 예정입니다.",
  },
  {
    question: "고객 지원팀에 어떻게 연락하나요?",
    answer: "support@ddingcha.com으로 언제든지 이메일을 보내주세요. 카카오톡 채널을 통한 실시간 상담도 가능합니다.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="container py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          자주 묻는 질문
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          띵차에 대해 궁금한 모든 것
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

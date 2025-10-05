"use client"

import { motion } from "framer-motion"
import { ShoppingBag, PackageCheck, Home } from "lucide-react"

const steps = [
  {
    icon: ShoppingBag,
    title: "둘러보고 주문하기",
    description: "틱톡에서 엄선한 트렌드 상품을 찾아보고 주문하세요.",
  },
  {
    icon: PackageCheck,
    title: "빠른 처리",
    description: "저희 팀이 주문을 처리하고 빠른 배송을 준비합니다.",
  },
  {
    icon: Home,
    title: "빠른 배송",
    description: "주문하신 상품을 추적 가능한 배송으로 집 앞까지 받아보세요.",
  },
]

export function Steps() {
  return (
    <section id="how-it-works" className="bg-muted py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            이용 방법
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            세 가지 간단한 단계로 원하는 상품을 받아보세요.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-6">
                <step.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

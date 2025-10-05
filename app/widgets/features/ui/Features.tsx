"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Truck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"

const features = [
  {
    icon: Zap,
    title: "초고속 배송",
    description: "트렌드 상품을 몇 주가 아닌 며칠 안에 받아보세요.",
  },
  {
    icon: Shield,
    title: "믿을 수 있는 품질",
    description: "모든 상품은 배송 전 검수를 거쳐 주문하신 그대로 배송됩니다.",
  },
  {
    icon: Truck,
    title: "직접 배송",
    description: "주문부터 배송까지 모든 과정을 추적 가능하게 관리합니다.",
  },
]

export function Features() {
  return (
    <section id="features" className="container py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          띵차를 선택해야 하는 이유
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          온라인 쇼핑을 간편하고, 빠르고, 신뢰할 수 있게 만듭니다.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-4 text-primary" aria-hidden="true" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

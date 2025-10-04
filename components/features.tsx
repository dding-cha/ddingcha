"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Truck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your trending products delivered in days, not weeks.",
  },
  {
    icon: Shield,
    title: "Reliable Quality",
    description: "Every item is checked before shipping to ensure you get exactly what you ordered.",
  },
  {
    icon: Truck,
    title: "Direct Shipping",
    description: "We handle everything from order to delivery with full tracking support.",
  },
]

export function Features() {
  return (
    <section id="features" className="container py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Choose DdingCha
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We make online shopping simple, fast, and trustworthy.
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

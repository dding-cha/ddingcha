"use client"

import { motion } from "framer-motion"
import { ShoppingBag, PackageCheck, Home } from "lucide-react"

const steps = [
  {
    icon: ShoppingBag,
    title: "Browse & Order",
    description: "Find trending products from our TikTok-curated collection and place your order.",
  },
  {
    icon: PackageCheck,
    title: "We Handle It",
    description: "Our team processes and prepares your order for fast shipping.",
  },
  {
    icon: Home,
    title: "Delivered Fast",
    description: "Receive your items at your doorstep with full tracking.",
  },
]

export function Steps() {
  return (
    <section id="how-it-works" className="bg-muted py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to get what you want.
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

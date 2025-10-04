"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Basic",
    price: "$0",
    description: "Perfect for trying out our service",
    features: [
      "Access to all products",
      "Standard shipping",
      "Email support",
      "Order tracking",
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for regular shoppers",
    features: [
      "Everything in Basic",
      "Priority shipping",
      "24/7 chat support",
      "Early access to new items",
      "Exclusive discounts",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For bulk orders and businesses",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom pricing",
      "Volume discounts",
      "API access",
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="container py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that works for you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full flex flex-col ${tier.featured ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.featured ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

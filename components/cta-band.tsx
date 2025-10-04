"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaBand() {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start Shopping?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join thousands of satisfied customers who trust DdingCha for fast, reliable delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              Sign Up Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

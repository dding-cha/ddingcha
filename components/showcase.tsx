"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Showcase() {
  return (
    <section className="container py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          See DdingCha in Action
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Watch how we bring TikTok trends to your door.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-muted flex items-center justify-center group cursor-pointer">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full w-20 h-20 p-0 group-hover:scale-110 transition-transform"
              aria-label="Play video"
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}

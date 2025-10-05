"use client"

import { motion } from 'framer-motion'
import { CATEGORIES } from '@/shared/config/categories'
import { Card } from '@/shared/ui/card'

export function CategorySection() {
  return (
    <section className="container py-16 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          카테고리
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          원하는 카테고리를 선택하고 트렌드 상품을 만나보세요
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {category.name}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

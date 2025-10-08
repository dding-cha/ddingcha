import { HeroCarousel } from "@/widgets/hero-carousel"
import { ProductGrid } from "@/widgets/product-grid"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <ProductGrid />
    </div>
  )
}

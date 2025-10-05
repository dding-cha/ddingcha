import { HeroCarousel } from "@/widgets/hero-carousel"
import { ProductGrid } from "@/widgets/product-grid"
import { Steps } from "@/widgets/steps"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <ProductGrid />
      <Steps />
    </div>
  )
}

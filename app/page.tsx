import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Steps } from "@/components/steps"
import { Showcase } from "@/components/showcase"
import { Pricing } from "@/components/pricing"
import { CtaBand } from "@/components/cta-band"
import { Faq } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Steps />
      <Showcase />
      <Pricing />
      <CtaBand />
      <Faq />
      <Footer />
    </main>
  )
}

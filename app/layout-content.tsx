'use client'

import { usePathname } from 'next/navigation'
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"
import { CartProvider } from "@/shared/lib/contexts/CartContext"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isManagerPage = pathname?.startsWith('/manager')

  return (
    <CartProvider>
      {!isManagerPage && <Header />}
      <main className={isManagerPage ? '' : 'flex-1 w-full'}>
        {children}
      </main>
      {!isManagerPage && <Footer />}
    </CartProvider>
  )
}

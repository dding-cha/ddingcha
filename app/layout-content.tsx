'use client'

import { usePathname } from 'next/navigation'
import { Header } from "@/widgets/header"
import { Footer } from "@/widgets/footer"

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isManagerPage = pathname?.startsWith('/manager')

  return (
    <>
      {!isManagerPage && <Header />}
      <main className={isManagerPage ? '' : 'flex flex-1'}>
        {children}
      </main>
      {!isManagerPage && <Footer />}
    </>
  )
}

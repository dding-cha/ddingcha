"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/features/product-card'
import { ProductCardSkeleton } from '@/features/product-card/ui/ProductCardSkeleton'
import { Product } from '@/entities/product/model/types'
import { Loader2 } from 'lucide-react'

const ITEMS_PER_PAGE = 10

export function ProductGrid() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)
  const loadedPages = useRef<Set<number>>(new Set())

  const loadProducts = async (pageNum: number) => {
    // Prevent duplicate loads
    if (loading || loadedPages.current.has(pageNum)) return

    setLoading(true)
    loadedPages.current.add(pageNum)

    try {
      const response = await fetch(`/api/products?trending=true&page=${pageNum}&limit=${ITEMS_PER_PAGE}`)

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()

      // Check if data is valid
      if (!data || !data.products || !Array.isArray(data.products)) {
        console.error('Invalid response format:', data)
        setDisplayedProducts([])
        setHasMore(false)
        setInitialLoading(false)
        return
      }

      if (pageNum === 1) {
        setDisplayedProducts(data.products)
        setInitialLoading(false)
      } else {
        // Prevent duplicates by checking existing IDs
        setDisplayedProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id))
          const newProducts = data.products.filter((p: Product) => !existingIds.has(p.id))
          return [...prev, ...newProducts]
        })
      }

      setPage(pageNum)
      setHasMore(data.pagination?.hasMore || false)
    } catch (error) {
      console.error('Failed to load products:', error)
      // Don't clear existing products on error, just stop loading
      setHasMore(false)
      if (pageNum === 1) {
        setDisplayedProducts([])
      }
      setInitialLoading(false)
      // Remove from loaded pages on error so it can be retried
      loadedPages.current.delete(pageNum)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    loadProducts(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (initialLoading || !hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && !loading && hasMore) {
          const nextPage = page + 1
          if (!loadedPages.current.has(nextPage)) {
            loadProducts(nextPage)
          }
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = observerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, page, hasMore, initialLoading])

  if (initialLoading) {
    return (
      <section id="products" className="container py-20 md:py-28 bg-muted/30">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            트렌딩 상품
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            틱톡에서 화제인 상품을 만나보세요. 한정 수량!
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="container py-20 md:py-28 bg-muted/30">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          트렌딩 상품
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          틱톡에서 화제인 상품을 만나보세요. 한정 수량!
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {displayedProducts && displayedProducts.length > 0 ? (
          displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % ITEMS_PER_PAGE) * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground">상품을 불러올 수 없습니다.</p>
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Intersection observer target */}
      {hasMore && (
        <div ref={observerRef} className="h-20" />
      )}
    </section>
  )
}

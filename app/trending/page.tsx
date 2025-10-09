"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/features/product-card";
import { ProductCardSkeleton } from "@/features/product-card/ui/ProductCardSkeleton";
import { Product } from "@/entities/product/model/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";

const ITEMS_PER_PAGE = 12;

type SortOption = "popular" | "latest" | "discount";

export default function TrendingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const observerRef = useRef<HTMLDivElement>(null);
  const loadedPages = useRef<Set<number>>(new Set());

  const loadProducts = async (pageNum: number, sort: SortOption) => {
    if (loading || loadedPages.current.has(pageNum)) return;

    setLoading(true);
    loadedPages.current.add(pageNum);

    try {
      const response = await fetch(
        `/api/products?trending=true&page=${pageNum}&limit=${ITEMS_PER_PAGE}&sort=${sort}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (!data || !data.products || !Array.isArray(data.products)) {
        console.error("Invalid response format:", data);
        setProducts([]);
        setHasMore(false);
        setInitialLoading(false);
        return;
      }

      if (pageNum === 1) {
        setProducts(data.products);
        setInitialLoading(false);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = data.products.filter((p: Product) => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      }

      setPage(pageNum);
      setHasMore(data.pagination?.hasMore || false);
    } catch (error) {
      console.error("Failed to load products:", error);
      setHasMore(false);
      if (pageNum === 1) {
        setProducts([]);
      }
      setInitialLoading(false);
      loadedPages.current.delete(pageNum);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadedPages.current.clear();
    setPage(1);
    setProducts([]);
    setInitialLoading(true);
    loadProducts(1, sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  // Infinite scroll observer
  useEffect(() => {
    if (initialLoading || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading && hasMore) {
          const nextPage = page + 1;
          if (!loadedPages.current.has(nextPage)) {
            loadProducts(nextPage, sortBy);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, page, hasMore, initialLoading]);

  if (initialLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🔥 트렌딩</h1>
          <p className="text-muted-foreground">지금 가장 인기있는 상품을 만나보세요</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🔥 트렌딩</h1>
        <p className="text-muted-foreground">지금 가장 인기있는 상품을 만나보세요</p>
      </div>

      {/* Sort Options */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm text-muted-foreground">정렬:</span>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("popular")}
          >
            인기순
          </Button>
          <Button
            variant={sortBy === "latest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("latest")}
          >
            최신순
          </Button>
          <Button
            variant={sortBy === "discount" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("discount")}
          >
            할인율순
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products && products.length > 0 ? (
          products.map((product, index) => (
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
            <p className="text-muted-foreground">트렌딩 상품이 없습니다.</p>
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
      {hasMore && <div ref={observerRef} className="h-20" />}

      {/* End message */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">모든 트렌딩 상품을 확인했습니다</p>
        </div>
      )}
    </div>
  );
}

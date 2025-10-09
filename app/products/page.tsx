"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/features/product-card";
import { Product } from "@/entities/product/model/types";
import { CATEGORIES } from "@/shared/config/categories";
import { Button } from "@/shared/ui/button";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (searchParam) {
          params.set('search', searchParam);
        } else if (selectedCategory) {
          params.set('category', selectedCategory);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, searchParam]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">상품을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {searchParam ? `"${searchParam}" 검색 결과` : "전체 상품"}
        </h1>
        <p className="text-muted-foreground">
          총 {products.length}개의 상품
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 pb-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">카테고리</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            전체
          </Button>
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-4">
            검색 결과가 없습니다
          </p>
          <Button onClick={() => { setSelectedCategory(null); window.history.pushState({}, '', '/products'); }}>
            전체 상품 보기
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">상품을 불러오는 중...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Product } from '@/entities/product/model/types';
import { useCart } from '@/shared/lib/contexts/CartContext';

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { incrementCartCount } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)
    try {
      const userId = 1 // TODO: Get from auth
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: product.id,
          quantity: 1,
        }),
      })

      if (response.ok) {
        incrementCartCount()
        // Show success feedback or redirect to cart
        router.push('/my/cart')
      } else {
        console.error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToWishlist(true)
    try {
      const userId = 1 // TODO: Get from auth
      const response = await fetch('/api/wishlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          productId: product.id,
        }),
      })

      if (!response.ok) {
        console.error('Failed to add to wishlist')
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full flex flex-col group hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl">{getEmojiForCategory(product.categoryId)}</span>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-2 py-1 rounded-lg">
            {product.discount}%
          </div>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-12 right-3 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="위시리스트에 추가"
          onClick={handleAddToWishlist}
          disabled={isAddingToWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            className="w-full gap-2"
            onClick={handleQuickAdd}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {isAddingToCart ? '추가 중...' : '빠른 구매'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              {product.price.toLocaleString()}원
            </span>
          </div>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          상세 보기
        </Button>
      </CardFooter>
    </Card>
    </Link>
  )
}

function getEmojiForCategory(categoryId: string): string {
  const emojiMap: Record<string, string> = {
    electronics: '📱',
    fashion: '👕',
    beauty: '💄',
    home: '🏠',
    sports: '⚽',
    food: '🍜',
    kids: '🧸',
    pet: '🐾',
  }
  return emojiMap[categoryId] || '📦'
}

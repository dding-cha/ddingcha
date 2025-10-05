import { query } from '@/shared/lib/db/connection'
import { Product } from '@/entities/product/model/types'
import { CategoryId } from '@/shared/config/categories'

interface DBProduct {
  id: string
  name: string
  price: number
  original_price: number
  discount: number
  rating: number
  reviews: number
  image: string
  category_id: string
  trending: number
  badge: string | null
}

function transformProduct(p: DBProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price,
    discount: p.discount,
    rating: p.rating,
    reviews: p.reviews,
    image: p.image,
    categoryId: p.category_id as CategoryId,
    trending: Boolean(p.trending),
    badge: p.badge || undefined,
  }
}

export async function getProducts(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit

  // Get total count
  const countResult = await query<{ count: number }>(
    'SELECT COUNT(*) as count FROM products'
  )
  const total = countResult[0]?.count || 0

  // Get products
  const dbProducts = await query<DBProduct>(
    'SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset]
  )

  const products = dbProducts.map(transformProduct)
  const hasMore = (page * limit) < total

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      hasMore,
    },
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const dbProducts = await query<DBProduct>(
    'SELECT * FROM products WHERE id = ?',
    [id]
  )

  if (dbProducts.length === 0) {
    return null
  }

  return transformProduct(dbProducts[0])
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit: number = 4
): Promise<Product[]> {
  const dbProducts = await query<DBProduct>(
    'SELECT * FROM products WHERE category_id = ? AND id != ? ORDER BY RAND() LIMIT ?',
    [categoryId, excludeId, limit]
  )

  return dbProducts.map(transformProduct)
}

export async function getProductsByCategory(
  categoryId: string,
  page: number = 1,
  limit: number = 10
) {
  const offset = (page - 1) * limit

  // Get total count for category
  const countResult = await query<{ count: number }>(
    'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
    [categoryId]
  )
  const total = countResult[0]?.count || 0

  // Get products
  const dbProducts = await query<DBProduct>(
    'SELECT * FROM products WHERE category_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [categoryId, limit, offset]
  )

  const products = dbProducts.map(transformProduct)
  const hasMore = (page * limit) < total

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      hasMore,
    },
  }
}

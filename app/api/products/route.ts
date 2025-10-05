import { NextResponse } from 'next/server'
import { query } from '@/shared/lib/db/connection'

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
  created_at: string
  description?: string
  features?: string
  specifications?: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all')

    // 매니저 페이지에서는 모든 상품 조회
    if (all === 'true') {
      const dbProducts = await query<DBProduct>(
        'SELECT * FROM products ORDER BY created_at DESC'
      )

      return NextResponse.json({
        products: dbProducts.map(p => ({
          ...p,
          trending: Boolean(p.trending)
        }))
      }, { status: 200 })
    }

    // 일반 페이지에서는 페이지네이션
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
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

    const hasMore = (page * limit) < total

    return NextResponse.json({
      products: dbProducts.map(p => ({
        ...p,
        trending: Boolean(p.trending)
      })),
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    }, { status: 200 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

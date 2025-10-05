import { NextResponse } from 'next/server'
import { query } from '@/app/shared/lib/db/connection'
import { nanoid } from 'nanoid'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      price,
      original_price,
      discount,
      rating = 0,
      reviews = 0,
      image,
      category_id,
      trending = false,
      badge = null,
      description = null,
      features = null,
      specifications = null,
    } = body

    // 필수 필드 검증
    if (!name || !price || !original_price || !discount || !image || !category_id) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // 상품 ID 생성
    const productId = nanoid(10)

    // products 테이블에 삽입
    await query(
      `INSERT INTO products (id, name, price, original_price, discount, rating, reviews, image, category_id, trending, badge)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [productId, name, price, original_price, discount, rating, reviews, image, category_id, trending ? 1 : 0, badge]
    )

    // product_details 테이블에 삽입 (상세 정보가 있는 경우)
    if (description || features || specifications) {
      await query(
        `INSERT INTO product_details (product_id, description, features, specifications)
         VALUES (?, ?, ?, ?)`,
        [productId, description, features, specifications]
      )
    }

    return NextResponse.json({
      success: true,
      productId,
      message: '상품이 등록되었습니다.',
    })
  } catch (error) {
    console.error('상품 등록 실패:', error)
    return NextResponse.json(
      { error: '상품 등록에 실패했습니다.' },
      { status: 500 }
    )
  }
}

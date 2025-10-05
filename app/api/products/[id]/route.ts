import { NextResponse } from 'next/server'
import { query } from '@/app/shared/lib/db/connection'

// 상품 상세 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const products = await query(
      `SELECT p.*, pd.description, pd.features, pd.specifications
       FROM products p
       LEFT JOIN product_details pd ON p.id = pd.product_id
       WHERE p.id = ?`,
      [id]
    )

    if (products.length === 0) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product: products[0] })
  } catch (error) {
    console.error('상품 조회 실패:', error)
    return NextResponse.json(
      { error: '상품 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 상품 수정
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const {
      name,
      price,
      original_price,
      discount,
      rating,
      reviews,
      image,
      category_id,
      trending,
      badge,
      description,
      features,
      specifications,
    } = body

    // products 테이블 업데이트
    await query(
      `UPDATE products
       SET name = ?, price = ?, original_price = ?, discount = ?,
           rating = ?, reviews = ?, image = ?, category_id = ?,
           trending = ?, badge = ?
       WHERE id = ?`,
      [name, price, original_price, discount, rating, reviews, image, category_id, trending ? 1 : 0, badge, id]
    )

    // product_details 업데이트 또는 삽입
    const existing = await query(
      'SELECT id FROM product_details WHERE product_id = ?',
      [id]
    )

    if (existing.length > 0) {
      await query(
        `UPDATE product_details
         SET description = ?, features = ?, specifications = ?
         WHERE product_id = ?`,
        [description, features, specifications, id]
      )
    } else if (description || features || specifications) {
      await query(
        `INSERT INTO product_details (product_id, description, features, specifications)
         VALUES (?, ?, ?, ?)`,
        [id, description, features, specifications]
      )
    }

    return NextResponse.json({
      success: true,
      message: '상품이 수정되었습니다.',
    })
  } catch (error) {
    console.error('상품 수정 실패:', error)
    return NextResponse.json(
      { error: '상품 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 상품 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // product_details 먼저 삭제 (외래키 제약)
    await query('DELETE FROM product_details WHERE product_id = ?', [id])

    // products 삭제
    await query('DELETE FROM products WHERE id = ?', [id])

    return NextResponse.json({
      success: true,
      message: '상품이 삭제되었습니다.',
    })
  } catch (error) {
    console.error('상품 삭제 실패:', error)
    return NextResponse.json(
      { error: '상품 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}

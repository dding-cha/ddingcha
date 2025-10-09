import { NextResponse } from 'next/server';
import { productRepository } from '@/entities/product/model/repository';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 필수 필드 검증
    if (!body.name || !body.price || !body.originalPrice || !body.image || !body.categoryId) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const productId = await productRepository.create({
      name: body.name,
      price: body.price,
      originalPrice: body.originalPrice,
      discount: body.discount || 0,
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      image: body.image,
      categoryId: body.categoryId,
      trending: body.trending || false,
      badge: body.badge,
      description: body.description,
      features: body.features,
      specifications: body.specifications,
      stock: body.stock || 0,
      shippingInfo: body.shippingInfo,
    });

    return NextResponse.json({
      success: true,
      productId,
      message: '상품이 등록되었습니다.',
    });
  } catch (error) {
    console.error('상품 등록 실패:', error);
    return NextResponse.json(
      { error: '상품 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { productRepository } from '@/entities/product/model/repository';

// 상품 상세 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productRepository.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('상품 조회 실패:', error);
    return NextResponse.json(
      { error: '상품 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 상품 수정
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await productRepository.update(id, body);

    return NextResponse.json({
      success: true,
      message: '상품이 수정되었습니다.',
    });
  } catch (error) {
    console.error('상품 수정 실패:', error);
    return NextResponse.json(
      { error: '상품 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 상품 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await productRepository.delete(id);

    return NextResponse.json({
      success: true,
      message: '상품이 삭제되었습니다.',
    });
  } catch (error) {
    console.error('상품 삭제 실패:', error);
    return NextResponse.json(
      { error: '상품 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}

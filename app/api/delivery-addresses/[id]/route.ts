import { NextResponse } from 'next/server';
import { deliveryAddressRepository } from '@/entities/user/model/repository';

// 배송지 상세 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const address = await deliveryAddressRepository.findById(parseInt(id));

    if (!address) {
      return NextResponse.json(
        { error: '배송지를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ address });
  } catch (error) {
    console.error('배송지 조회 실패:', error);
    return NextResponse.json(
      { error: '배송지 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 배송지 수정
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await deliveryAddressRepository.update(parseInt(id), userId, updateData);

    return NextResponse.json({
      success: true,
      message: '배송지가 수정되었습니다.',
    });
  } catch (error) {
    console.error('배송지 수정 실패:', error);
    return NextResponse.json(
      { error: '배송지 수정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 배송지 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await deliveryAddressRepository.delete(parseInt(id), userId);

    return NextResponse.json({
      success: true,
      message: '배송지가 삭제되었습니다.',
    });
  } catch (error) {
    console.error('배송지 삭제 실패:', error);
    return NextResponse.json(
      { error: '배송지 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 기본 배송지 설정
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    await deliveryAddressRepository.setDefault(parseInt(id), userId);

    return NextResponse.json({
      success: true,
      message: '기본 배송지로 설정되었습니다.',
    });
  } catch (error) {
    console.error('기본 배송지 설정 실패:', error);
    return NextResponse.json(
      { error: '기본 배송지 설정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

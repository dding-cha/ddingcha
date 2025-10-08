import { NextResponse } from 'next/server';
import { deliveryAddressRepository } from '@/entities/user/model/repository';

// 배송지 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: '사용자 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    const addresses = await deliveryAddressRepository.findByUserId(userId);

    return NextResponse.json({ addresses }, { status: 200 });
  } catch (error) {
    console.error('배송지 조회 실패:', error);
    return NextResponse.json(
      { error: '배송지 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}

// 배송지 생성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, recipientName, phone, postalCode, address, addressDetail, isDefault } = body;

    // 필수 필드 검증
    if (!userId || !recipientName || !phone || !postalCode || !address) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const addressId = await deliveryAddressRepository.create(userId, {
      recipientName,
      phone,
      postalCode,
      address,
      addressDetail,
      isDefault: isDefault || false,
    });

    return NextResponse.json(
      {
        success: true,
        addressId,
        message: '배송지가 등록되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('배송지 등록 실패:', error);
    return NextResponse.json(
      { error: '배송지 등록에 실패했습니다.' },
      { status: 500 }
    );
  }
}

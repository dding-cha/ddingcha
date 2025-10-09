import { NextRequest, NextResponse } from 'next/server';
import { orderRepository } from '@/entities/order';
import { userRepository } from '@/entities/user/model/repository';

// GET /api/orders?userId=123
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const orders = await orderRepository.findByUserId(parseInt(userId));
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      email,
      name,
      phone,
      totalAmount,
      shippingFee,
      recipientName,
      recipientPhone,
      postalCode,
      address,
      addressDetail,
      items,
    } = body;

    // Validate required fields
    if (!totalAmount || !recipientName || !recipientPhone || !postalCode || !address || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let finalUserId = userId;

    // If no userId provided, create guest user
    if (!finalUserId) {
      finalUserId = await userRepository.create(
        email || null,
        name || null,
        phone || null,
        true // isGuest
      );
    }

    // Create order
    const orderId = await orderRepository.create(
      finalUserId,
      {
        totalAmount,
        shippingFee: shippingFee || 0,
        recipientName,
        phone: recipientPhone,
        postalCode,
        address,
        addressDetail,
      },
      items
    );

    const order = await orderRepository.findById(orderId);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

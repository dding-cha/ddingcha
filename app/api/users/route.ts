import { NextRequest, NextResponse } from 'next/server';
import { userRepository, deliveryAddressRepository } from '@/entities/user/model/repository';
import { orderRepository } from '@/entities/order';

// GET /api/users?email=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'email parameter is required' },
        { status: 400 }
      );
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch additional user data
    const orders = await orderRepository.findByUserId(user.id);
    const addresses = await deliveryAddressRepository.findByUserId(user.id);

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      isGuest: user.isGuest,
      totalOrders: orders.length,
      totalAddresses: addresses.length,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Failed to search user:', error);
    return NextResponse.json(
      { error: 'Failed to search user' },
      { status: 500 }
    );
  }
}

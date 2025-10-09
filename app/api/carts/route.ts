import { NextRequest, NextResponse } from 'next/server';
import { cartRepository } from '@/entities/cart';

// GET /api/carts?userId=123
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

    const carts = await cartRepository.findByUserId(parseInt(userId));
    return NextResponse.json({ carts });
  } catch (error) {
    console.error('Failed to fetch carts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch carts' },
      { status: 500 }
    );
  }
}

// POST /api/carts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId, quantity = 1 } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = await cartRepository.add(userId, productId, quantity);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to add to cart:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

// DELETE /api/carts
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await cartRepository.remove(userId, productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { cartRepository } from '@/entities/cart';

// PATCH /api/carts/[productId] - Update cart item quantity
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const body = await request.json();
    const { userId, quantity } = body;

    if (!userId || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await cartRepository.updateQuantity(userId, productId, quantity);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update cart quantity:', error);
    return NextResponse.json(
      { error: 'Failed to update cart quantity' },
      { status: 500 }
    );
  }
}

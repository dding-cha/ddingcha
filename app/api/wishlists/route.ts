import { NextRequest, NextResponse } from 'next/server';
import { wishlistRepository } from '@/entities/wishlist';

// GET /api/wishlists?userId=123
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

    const wishlists = await wishlistRepository.findByUserId(parseInt(userId));
    return NextResponse.json({ wishlists });
  } catch (error) {
    console.error('Failed to fetch wishlists:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlists' },
      { status: 500 }
    );
  }
}

// POST /api/wishlists
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = await wishlistRepository.add(userId, productId);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to add to wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

// DELETE /api/wishlists
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

    await wishlistRepository.remove(userId, productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to remove from wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}

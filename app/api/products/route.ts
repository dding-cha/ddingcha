import { NextResponse } from 'next/server';
import { productRepository } from '@/entities/product/model/repository';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const trending = searchParams.get('trending');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || 'popular'; // popular, latest, discount

    let products;

    if (search) {
      products = await productRepository.search(search);
    } else if (category) {
      products = await productRepository.findByCategory(category);
    } else if (trending === 'true') {
      // For trending, get all and sort/paginate
      const allTrending = await productRepository.findTrending(1000); // Get all

      // Sort based on criteria
      const sorted = [...allTrending].sort((a, b) => {
        switch (sort) {
          case 'popular':
            // Sort by reviews count (popularity)
            return b.reviews - a.reviews;
          case 'latest':
            // Latest products (assuming higher ID = newer)
            return b.id.localeCompare(a.id);
          case 'discount':
            // Sort by discount percentage
            return b.discount - a.discount;
          default:
            return b.reviews - a.reviews;
        }
      });

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      products = sorted.slice(startIndex, endIndex);

      return NextResponse.json({
        products,
        pagination: {
          page,
          limit,
          total: sorted.length,
          hasMore: endIndex < sorted.length
        }
      }, { status: 200 });
    } else {
      products = await productRepository.findAll();
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

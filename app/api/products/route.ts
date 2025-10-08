import { NextResponse } from 'next/server';
import { productRepository } from '@/entities/product/model/repository';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const trending = searchParams.get('trending');

    let products;

    if (search) {
      products = await productRepository.search(search);
    } else if (category) {
      products = await productRepository.findByCategory(category);
    } else if (trending === 'true') {
      products = await productRepository.findTrending();
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

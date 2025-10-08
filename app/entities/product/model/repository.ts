import { query, queryOne } from '@/shared/lib/db/connection';
import { Product } from './types';
import { RowDataPacket } from 'mysql2';

interface ProductRow extends RowDataPacket {
  id: string;
  name: string;
  description: string | null;
  category_id: string;
  price: number;
  original_price: number;
  discount: number;
  stock: number;
  rating: number;
  reviews_count: number;
  image_url: string;
  trending: boolean;
  badge: string | null;
  free_shipping: boolean;
  shipping_days: string;
  brand: string | null;
  origin: string | null;
  warranty_period: string | null;
  created_at: Date;
  updated_at: Date;
}

interface ProductFeatureRow extends RowDataPacket {
  feature: string;
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice: Number(row.original_price),
    discount: row.discount,
    rating: Number(row.rating),
    reviews: row.reviews_count,
    image: row.image_url,
    categoryId: row.category_id as any,
    trending: Boolean(row.trending),
    badge: row.badge || undefined,
    description: row.description || undefined,
    stock: row.stock,
    shippingInfo: {
      freeShipping: Boolean(row.free_shipping),
      estimatedDays: row.shipping_days,
    },
    specifications: {
      브랜드: row.brand || '띵차 셀렉션',
      원산지: row.origin || '한국',
      보증기간: row.warranty_period || '1년',
    },
  };
}

export const productRepository = {
  async findAll(): Promise<Product[]> {
    const rows = await query<ProductRow[]>(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    return rows.map(mapProductRow);
  },

  async findById(id: string): Promise<Product | null> {
    const row = await queryOne<ProductRow>(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (!row) return null;

    const product = mapProductRow(row);

    // Fetch features
    const features = await query<ProductFeatureRow[]>(
      'SELECT feature FROM product_features WHERE product_id = ? ORDER BY display_order',
      [id]
    );
    product.features = features.map((f) => f.feature);

    return product;
  },

  async findByCategory(categoryId: string): Promise<Product[]> {
    const rows = await query<ProductRow[]>(
      'SELECT * FROM products WHERE category_id = ? ORDER BY created_at DESC',
      [categoryId]
    );
    return rows.map(mapProductRow);
  },

  async findTrending(limit: number = 12): Promise<Product[]> {
    const rows = await query<ProductRow[]>(
      'SELECT * FROM products WHERE trending = true ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return rows.map(mapProductRow);
  },

  async search(searchQuery: string): Promise<Product[]> {
    const rows = await query<ProductRow[]>(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC',
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );
    return rows.map(mapProductRow);
  },

  async findRelated(
    categoryId: string,
    excludeId: string,
    limit: number = 4
  ): Promise<Product[]> {
    const rows = await query<ProductRow[]>(
      'SELECT * FROM products WHERE category_id = ? AND id != ? ORDER BY RAND() LIMIT ?',
      [categoryId, excludeId, limit]
    );
    return rows.map(mapProductRow);
  },

  async create(product: Omit<Product, 'id'>): Promise<string> {
    const id = crypto.randomUUID();

    await query(
      `INSERT INTO products (
        id, name, description, category_id, price, original_price, discount,
        stock, rating, reviews_count, image_url, trending, badge,
        free_shipping, shipping_days, brand, origin, warranty_period
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        product.name,
        product.description || null,
        product.categoryId,
        product.price,
        product.originalPrice,
        product.discount,
        product.stock || 0,
        product.rating,
        product.reviews,
        product.image,
        product.trending || false,
        product.badge || null,
        product.shippingInfo?.freeShipping || false,
        product.shippingInfo?.estimatedDays || '1-2일',
        product.specifications?.브랜드 || null,
        product.specifications?.원산지 || null,
        product.specifications?.보증기간 || null,
      ]
    );

    // Insert features if provided
    if (product.features && product.features.length > 0) {
      for (let i = 0; i < product.features.length; i++) {
        await query(
          'INSERT INTO product_features (product_id, feature, display_order) VALUES (?, ?, ?)',
          [id, product.features[i], i]
        );
      }
    }

    return id;
  },

  async update(id: string, product: Partial<Product>): Promise<void> {
    const updates: string[] = [];
    const values: any[] = [];

    if (product.name !== undefined) {
      updates.push('name = ?');
      values.push(product.name);
    }
    if (product.description !== undefined) {
      updates.push('description = ?');
      values.push(product.description);
    }
    if (product.price !== undefined) {
      updates.push('price = ?');
      values.push(product.price);
    }
    if (product.originalPrice !== undefined) {
      updates.push('original_price = ?');
      values.push(product.originalPrice);
    }
    if (product.discount !== undefined) {
      updates.push('discount = ?');
      values.push(product.discount);
    }
    if (product.stock !== undefined) {
      updates.push('stock = ?');
      values.push(product.stock);
    }
    if (product.trending !== undefined) {
      updates.push('trending = ?');
      values.push(product.trending);
    }

    if (updates.length > 0) {
      values.push(id);
      await query(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`, values);
    }
  },

  async delete(id: string): Promise<void> {
    await query('DELETE FROM products WHERE id = ?', [id]);
  },
};

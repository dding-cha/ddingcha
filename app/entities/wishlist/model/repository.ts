import { query, queryOne } from '@/shared/lib/db/connection';
import { Wishlist } from '@/entities/user/model/types';
import { RowDataPacket } from 'mysql2';

interface WishlistRow extends RowDataPacket {
  id: number;
  user_id: number;
  product_id: string;
  created_at: Date;
}

function mapWishlistRow(row: WishlistRow): Wishlist {
  return {
    id: row.id,
    userId: row.user_id,
    productId: row.product_id,
    createdAt: row.created_at,
  };
}

export const wishlistRepository = {
  async findByUserId(userId: number): Promise<Wishlist[]> {
    const rows = await query<WishlistRow>(
      'SELECT * FROM wishlists WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    ) as WishlistRow[];
    return rows.map(mapWishlistRow);
  },

  async findOne(userId: number, productId: string): Promise<Wishlist | null> {
    const row = await queryOne<WishlistRow>(
      'SELECT * FROM wishlists WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return row ? mapWishlistRow(row) : null;
  },

  async add(userId: number, productId: string): Promise<number> {
    const existing = await this.findOne(userId, productId);
    if (existing) {
      return existing.id;
    }

    const result: any = await query(
      'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );
    return result.insertId;
  },

  async remove(userId: number, productId: string): Promise<void> {
    await query(
      'DELETE FROM wishlists WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
  },

  async exists(userId: number, productId: string): Promise<boolean> {
    const item = await this.findOne(userId, productId);
    return item !== null;
  },
};

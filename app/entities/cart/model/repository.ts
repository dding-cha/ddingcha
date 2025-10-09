import { query, queryOne } from '@/shared/lib/db/connection';
import { Cart } from '@/entities/user/model/types';
import { RowDataPacket } from 'mysql2';

interface CartRow extends RowDataPacket {
  id: number;
  user_id: number;
  product_id: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

function mapCartRow(row: CartRow): Cart {
  return {
    id: row.id,
    userId: row.user_id,
    productId: row.product_id,
    quantity: row.quantity,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const cartRepository = {
  async findByUserId(userId: number): Promise<Cart[]> {
    const rows = await query<CartRow>(
      'SELECT * FROM carts WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    ) as CartRow[];
    return rows.map(mapCartRow);
  },

  async findOne(userId: number, productId: string): Promise<Cart | null> {
    const row = await queryOne<CartRow>(
      'SELECT * FROM carts WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return row ? mapCartRow(row) : null;
  },

  async add(userId: number, productId: string, quantity: number): Promise<number> {
    // Check if product already in cart
    const existing = await this.findOne(userId, productId);

    if (existing) {
      // Update quantity
      await query(
        'UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
      return existing.id;
    } else {
      // Insert new cart item
      const result: any = await query(
        'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
      return result.insertId;
    }
  },

  async updateQuantity(userId: number, productId: string, quantity: number): Promise<void> {
    await query(
      'UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId]
    );
  },

  async remove(userId: number, productId: string): Promise<void> {
    await query(
      'DELETE FROM carts WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
  },

  async clear(userId: number): Promise<void> {
    await query('DELETE FROM carts WHERE user_id = ?', [userId]);
  },
};

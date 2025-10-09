import { query, queryOne } from '@/shared/lib/db/connection';
import { Order, OrderItem } from '@/entities/user/model/types';
import { RowDataPacket } from 'mysql2';

interface OrderRow extends RowDataPacket {
  id: number;
  user_id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_fee: number;
  recipient_name: string;
  phone: string;
  postal_code: string;
  address: string;
  address_detail: string | null;
  created_at: Date;
  updated_at: Date;
}

interface OrderItemRow extends RowDataPacket {
  id: number;
  order_id: number;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  created_at: Date;
}

function mapOrderRow(row: OrderRow): Order {
  return {
    id: row.id,
    userId: row.user_id,
    orderNumber: row.order_number,
    status: row.status,
    totalAmount: row.total_amount,
    shippingFee: row.shipping_fee,
    recipientName: row.recipient_name,
    phone: row.phone,
    postalCode: row.postal_code,
    address: row.address,
    addressDetail: row.address_detail,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapOrderItemRow(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    orderId: row.order_id,
    productId: row.product_id,
    productName: row.product_name,
    price: row.price,
    quantity: row.quantity,
    createdAt: row.created_at,
  };
}

function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `ORD${year}${month}${day}${random}`;
}

export const orderRepository = {
  async findByUserId(userId: number): Promise<Order[]> {
    const rows = await query<OrderRow>(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    ) as OrderRow[];
    return rows.map(mapOrderRow);
  },

  async findById(id: number): Promise<Order | null> {
    const row = await queryOne<OrderRow>(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    return row ? mapOrderRow(row) : null;
  },

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const row = await queryOne<OrderRow>(
      'SELECT * FROM orders WHERE order_number = ?',
      [orderNumber]
    );
    return row ? mapOrderRow(row) : null;
  },

  async create(
    userId: number,
    data: {
      totalAmount: number;
      shippingFee: number;
      recipientName: string;
      phone: string;
      postalCode: string;
      address: string;
      addressDetail?: string;
    },
    items: Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
    }>
  ): Promise<number> {
    const orderNumber = generateOrderNumber();

    const result: any = await query(
      `INSERT INTO orders
       (user_id, order_number, total_amount, shipping_fee, recipient_name, phone, postal_code, address, address_detail)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        orderNumber,
        data.totalAmount,
        data.shippingFee,
        data.recipientName,
        data.phone,
        data.postalCode,
        data.address,
        data.addressDetail || null,
      ]
    );

    const orderId = result.insertId;

    // Insert order items
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.productId, item.productName, item.price, item.quantity]
      );
    }

    return orderId;
  },

  async updateStatus(orderId: number, status: Order['status']): Promise<void> {
    await query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );
  },

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    const rows = await query<OrderItemRow>(
      'SELECT * FROM order_items WHERE order_id = ?',
      [orderId]
    ) as OrderItemRow[];
    return rows.map(mapOrderItemRow);
  },
};

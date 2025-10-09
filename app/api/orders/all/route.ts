import { NextResponse } from 'next/server';
import { query } from '@/shared/lib/db/connection';
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

interface OrderWithItems {
  id: number;
  orderNumber: string;
  recipientName: string;
  phone: string;
  totalAmount: number;
  shippingFee: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
}

// GET /api/orders/all - Fetch all orders for manager (admin)
export async function GET() {
  try {
    // Fetch all orders with order items in one query (with JOIN)
    const rows = await query<OrderRow>(
      `SELECT
        o.id,
        o.order_number,
        o.recipient_name,
        o.phone,
        o.total_amount,
        o.shipping_fee,
        o.status,
        o.created_at
       FROM orders o
       ORDER BY o.created_at DESC`
    ) as OrderRow[];

    // Fetch order items for all orders
    const orderIds = rows.map((row: OrderRow) => row.id);

    let orderItemsMap: Map<number, Array<any>> = new Map();

    if (orderIds.length > 0) {
      const itemRows = await query<any[]>(
        `SELECT
          order_id,
          product_id,
          product_name,
          price,
          quantity
         FROM order_items
         WHERE order_id IN (${orderIds.join(',')})`,
        []
      );

      // Group items by order_id
      itemRows.forEach((item: any) => {
        if (!orderItemsMap.has(item.order_id)) {
          orderItemsMap.set(item.order_id, []);
        }
        orderItemsMap.get(item.order_id)!.push({
          productId: item.product_id,
          productName: item.product_name,
          price: item.price,
          quantity: item.quantity,
        });
      });
    }

    // Map to response format
    const orders: OrderWithItems[] = rows.map((row) => ({
      id: row.id,
      orderNumber: row.order_number,
      recipientName: row.recipient_name,
      phone: row.phone,
      totalAmount: row.total_amount,
      shippingFee: row.shipping_fee,
      status: row.status,
      createdAt: new Date(row.created_at).toISOString(),
      items: orderItemsMap.get(row.id) || [],
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Failed to fetch all orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

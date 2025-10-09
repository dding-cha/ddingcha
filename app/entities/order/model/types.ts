export interface Order {
  id: number;
  userId: number;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingFee: number;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string | null;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
}

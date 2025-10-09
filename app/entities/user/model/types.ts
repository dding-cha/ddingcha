export interface User {
  id: number;
  email: string | null;
  name: string | null;
  phone: string | null;
  isGuest: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
}

export interface DeliveryAddress {
  id: number;
  userId: number;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string | null;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: number;
  userId: number;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id: number;
  userId: number;
  productId: string;
  createdAt: Date;
}

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

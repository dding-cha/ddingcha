export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface DeliveryAddress {
  id: number;
  userId: string;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

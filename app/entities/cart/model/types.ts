export interface Cart {
  id: number;
  userId: number;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

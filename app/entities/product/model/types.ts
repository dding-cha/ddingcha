import { CategoryId } from '@/shared/config/categories'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  categoryId: CategoryId
  trending?: boolean
  badge?: string
}

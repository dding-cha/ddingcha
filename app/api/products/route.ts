import { NextResponse } from 'next/server'

const products = [
  {
    id: 1,
    name: 'Premium Wireless Earbuds',
    price: 79.99,
    category: 'Electronics',
    description: 'High-quality wireless earbuds with active noise cancellation',
  },
  {
    id: 2,
    name: 'Smart Water Bottle',
    price: 34.99,
    category: 'Lifestyle',
    description: 'Temperature-controlled bottle that tracks hydration',
  },
  {
    id: 3,
    name: 'Portable LED Desk Lamp',
    price: 29.99,
    category: 'Home & Office',
    description: 'Adjustable brightness lamp with USB charging',
  },
  {
    id: 4,
    name: 'Fitness Resistance Bands',
    price: 19.99,
    category: 'Sports & Fitness',
    description: 'Set of 5 resistance bands for home workouts',
  },
]

export async function GET() {
  return NextResponse.json({ products }, { status: 200 })
}

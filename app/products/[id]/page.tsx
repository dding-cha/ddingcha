import { ProductDetail } from "@/widgets/product-detail"
import { getProductById, getRelatedProducts } from "@/shared/api/products"
import { query } from "@/shared/lib/db/connection"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const products = await query<{ id: string }>('SELECT id FROM products')
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  return (
    <div className="flex flex-col w-full">
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </div>
  )
}

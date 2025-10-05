import { ProductDetail } from "@/widgets/product-detail"
import { getProductById, getRelatedProducts } from "@/shared/api/products"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

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

import { Skeleton } from "@/shared/ui/skeleton"
import { Card } from "@/shared/ui/card"

export function ProductDetailSkeleton() {
  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Badge */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Rating */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>

          {/* Prices */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-baseline gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          {/* Benefits */}
          <Card className="p-4 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-44" />
          </Card>

          {/* Quantity */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-4 border-y">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-7 w-32" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>

          {/* Info Icons */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-10 w-10 mx-auto rounded-full" />
                <Skeleton className="h-4 w-16 mx-auto" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 space-y-6">
        <div className="flex gap-6 border-b">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        <div className="space-y-4 py-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-6 w-24" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

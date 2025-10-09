import { Skeleton } from "@/shared/ui/skeleton"
import { Card } from "@/shared/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square bg-muted">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4 space-y-3">
        {/* Category */}
        <Skeleton className="h-4 w-20" />

        {/* Product name */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Prices */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </Card>
  )
}

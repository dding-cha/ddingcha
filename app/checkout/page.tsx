import { Suspense } from "react"
import { CheckoutForm } from "@/widgets/checkout-form"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "결제하기 | 띵차",
  description: "띵차에서 안전하고 빠르게 결제하세요.",
}

function CheckoutLoading() {
  return (
    <div className="container py-20 flex justify-center items-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={<CheckoutLoading />}>
        <CheckoutForm />
      </Suspense>
    </div>
  )
}

"use client"

import { useState } from "react"
import DaumPostcode from "react-daum-postcode"
import { Button } from "@/shared/ui/button"
import { X } from "lucide-react"

interface AddressSearchModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (data: { postalCode: string; address: string }) => void
}

export function AddressSearchModal({
  isOpen,
  onClose,
  onComplete,
}: AddressSearchModalProps) {
  if (!isOpen) return null

  const handleComplete = (data: any) => {
    let fullAddress = data.address
    let extraAddress = ""

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : ""
    }

    onComplete({
      postalCode: data.zonecode,
      address: fullAddress,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl bg-card rounded-lg shadow-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h2 className="text-lg font-semibold text-foreground">주소 검색</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Daum Postcode */}
        <div className="p-4 overflow-auto flex-1">
          <DaumPostcode
            onComplete={handleComplete}
            autoClose={false}
            style={{ height: "450px", maxHeight: "60vh" }}
          />
        </div>
      </div>
    </div>
  )
}

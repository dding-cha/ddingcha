"use client";

import { useState, useEffect } from "react";
import { Plus, MapPin, Trash2, Edit, Star, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DeliveryAddress } from "@/entities/user";
import { AddressSearchModal } from "@/features/address-search";

export default function MyAddressesPage() {
  // TODO: 실제 사용자 ID는 인증 시스템에서 가져와야 함
  const userId = 1;

  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [formData, setFormData] = useState({
    recipientName: "",
    phone: "",
    postalCode: "",
    address: "",
    addressDetail: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    setLoading(true);
    try {
      const response = await fetch(`/api/delivery-addresses?userId=${userId}`);
      const data = await response.json();
      setAddresses(data.addresses || []);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing address
        const response = await fetch(`/api/delivery-addresses/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...formData }),
        });

        if (!response.ok) throw new Error("Failed to update address");
      } else {
        // Create new address
        const response = await fetch("/api/delivery-addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...formData }),
        });

        if (!response.ok) throw new Error("Failed to create address");
      }

      // Reset form and refresh
      setFormData({
        recipientName: "",
        phone: "",
        postalCode: "",
        address: "",
        addressDetail: "",
        isDefault: false,
      });
      setShowForm(false);
      setEditingId(null);
      fetchAddresses();
    } catch (error) {
      console.error("Failed to save address:", error);
      alert("배송지 저장에 실패했습니다.");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("이 배송지를 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/delivery-addresses/${id}?userId=${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete address");

      fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("배송지 삭제에 실패했습니다.");
    }
  }

  async function handleSetDefault(id: number) {
    try {
      const response = await fetch(`/api/delivery-addresses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Failed to set default address");

      fetchAddresses();
    } catch (error) {
      console.error("Failed to set default address:", error);
      alert("기본 배송지 설정에 실패했습니다.");
    }
  }

  function handleEdit(address: DeliveryAddress) {
    setFormData({
      recipientName: address.recipientName,
      phone: address.phone,
      postalCode: address.postalCode,
      address: address.address,
      addressDetail: address.addressDetail || "",
      isDefault: address.isDefault,
    });
    setEditingId(address.id);
    setShowForm(true);
  }

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">배송지를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">배송지 관리</h1>
        <Button
          onClick={() => {
            setFormData({
              recipientName: "",
              phone: "",
              postalCode: "",
              address: "",
              addressDetail: "",
              isDefault: false,
            });
            setEditingId(null);
            setShowForm(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          새 배송지 추가
        </Button>
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="mb-8 p-4 sm:p-6 border border-border rounded-lg bg-card">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
            {editingId ? "배송지 수정" : "새 배송지 추가"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  받는 분 이름 *
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData({ ...formData, recipientName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  연락처 *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                우편번호 *
              </label>
              <div className="flex gap-2 items-stretch">
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="12345"
                  required
                  readOnly
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddressModal(true)}
                  className="whitespace-nowrap"
                >
                  <Search className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">주소 검색</span>
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                주소 *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="서울특별시 강남구 테헤란로 123"
                required
                readOnly
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                상세 주소
              </label>
              <input
                type="text"
                value={formData.addressDetail}
                onChange={(e) =>
                  setFormData({ ...formData, addressDetail: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="101동 1001호"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="h-4 w-4"
              />
              <label htmlFor="isDefault" className="text-sm text-foreground">
                기본 배송지로 설정
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1">
                {editingId ? "수정" : "추가"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-20">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            등록된 배송지가 없습니다
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            배송지 추가하기
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="p-4 sm:p-6 border border-border rounded-lg bg-card hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">
                    {address.recipientName}
                  </h3>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded inline-flex items-center w-fit">
                      <Star className="h-3 w-3 mr-1" />
                      기본 배송지
                    </span>
                  )}
                </div>
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(address)}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(address.id)}
                    className="h-8 w-8 sm:h-10 sm:w-10"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 text-xs sm:text-sm text-muted-foreground mb-4">
                <p>{address.phone}</p>
                <p className="break-words">
                  ({address.postalCode}) {address.address}
                </p>
                {address.addressDetail && <p className="break-words">{address.addressDetail}</p>}
              </div>

              {!address.isDefault && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(address.id)}
                >
                  기본 배송지로 설정
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Address Search Modal */}
      <AddressSearchModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onComplete={(data) => {
          setFormData({
            ...formData,
            postalCode: data.postalCode,
            address: data.address,
          });
        }}
      />
    </div>
  );
}

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
  refreshCartCount: () => Promise<void>;
  incrementCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      // TODO: Get actual userId from authentication
      const userId = 1;
      const response = await fetch(`/api/carts?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        const count = data.carts?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  const incrementCartCount = () => {
    setCartCount((prev) => prev + 1);
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCartCount, incrementCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

"use client";

import React from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import CartItem from "@/features/cart/components/CartItem";
import CartSummary from "@/features/cart/components/CartSummary";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

const CartContainer: React.FC = () => {
  const {
    items,
    summary,
    loading,
    error,
    updateQuantity,
    toggleSelection,
    selectAll,
    removeItem,
    proceedToCheckout,
  } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat keranjang...</p>
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <ShoppingCartIcon />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Wah, keranjangmu masih kosong!
        </h2>
        <p className="text-gray-600 mb-4">
          Ayo jelajahi produk menarik dan tambahkan ke keranjang.
        </p>
        <Link
          href="/"
          className=" bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Belanja Sekarang
        </Link>
      </div>
    );
  }
  const allSelected = items.length > 0 && items.every((item) => item.selected);

  return (
    <div className="mycontainer">
      <div className="flex sm:flex-row flex-col gap-4">
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-netral-100 p-4 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => selectAll(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-sm font-medium">
                Pilih Semua ({items.length} barang)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.cart_items_id}
                item={item}
                onQuantityChange={updateQuantity}
                onToggleSelection={toggleSelection}
                onRemove={removeItem}
              />
            ))}
          </div>
        </div>

        <div className="w-80">
          <CartSummary
            summary={summary}
            onProceedToCheckout={proceedToCheckout}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CartContainer;

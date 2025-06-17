"use client";
import { useState } from "react";
import { Plus, Minus, MessageSquareText, Heart, Share2 } from "lucide-react";
import { useAddToCart } from "../hooks/useAddToCart";
import { ProductDetailClientProps } from "../types/product";
import { toast } from 'react-toastify';

const PurchasePanel = ({ product }: ProductDetailClientProps) => {
  const [quantity, setQuantity] = useState(1);
  const { handleAdd, loading } = useAddToCart();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = (productId: number, qty: number | undefined) => {
    handleAdd(productId, qty);
    toast.success("Produk berhasil ditambahkan ke keranjang!"); // Use toast for success message
  };

  return (
    <div className="border border-netral-200 p-4 rounded-lg shadow-sm space-y-5">
      <h4 className="font-semibold text-lg">Atur jumlah dan catatan</h4>
      <div className="flex items-center gap-3">
        <button onClick={decreaseQuantity}>
          <Minus />
        </button>
        <span className="text-lg font-medium">{quantity}</span>
        <button onClick={increaseQuantity} className="text-blu-350">
          <Plus />
        </button>
        <span className="text-sm text-netral-200">
          Stok Total {product.stock}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-lg font-semibold">
          Rp{(product.price * quantity).toLocaleString("id-ID")}
        </p>
      </div>
      <div className="flex gap-2">
        <button className="w-full bg-white text-blu-350 border-2 border-blu-350 py-2 rounded-lg hover:bg-blu-100 transition-all cursor-pointer">
          Beli Langsung
        </button>
        <button
          onClick={() => addToCart(product.product_id, quantity)}
          disabled={loading}
          className="w-full flex justify-center border-2 border-blu-350 bg-blu-350 text-white py-2 rounded-lg hover:bg-blu-400 hover:border-blu-400 transition cursor-pointer"
        >
          <Plus />
          Keranjang
        </button>
      </div>
      <div className="flex justify-around text-xs font-semibold text-netral-250 mt-2">
        <button className="flex items-center gap-2 hover:text-black cursor-pointer">
          <MessageSquareText strokeWidth={1} className="w-4 h-4 text-black" />
          Chat
        </button>
        |
        <button className="flex items-center gap-2 hover:text-black cursor-pointer">
          <Heart strokeWidth={1} className="w-4 h-4 text-black" />
          Wishlist
        </button>
        |
        <button className="flex items-center gap-2 hover:text-black cursor-pointer">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default PurchasePanel;

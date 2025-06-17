import React from "react";
import Image from "next/image";
import { Heart, Trash2, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "../types/cart";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (cartId: number, quantity: number) => void;
  onToggleSelection: (cartId: number) => void;
  onRemove: (cartId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onToggleSelection,
  onRemove,
}) => {
  const handleQuantityIncrease = () => {
    onQuantityChange(item.cart_items_id, item.quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.cart_items_id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 w-full bg-white rounded-lg border border-netral-100">
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onToggleSelection(item.cart_items_id)}
        className="mt-2 w-4 h-4 text-blu-350 rounded border-netral-100 hover:ring-blu-350 cursor-pointer"
      />

      <div className="flex-shrink-0">
        <Image
          src={item.image_url}
          alt={item.product_name}
          width={80}
          height={80}
          className="rounded-lg h-20 object-cover"
        />
      </div>

      <div className="flex-1 space-y-2">
        <div>
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {item.product_name}
          </h3>
          <p className="text-sm text-gray-500">{item.store_name}</p>
        </div>

        <div className="flex items-center justify-end text-end space-y-10">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-gray-900">
              Rp{item.price.toLocaleString("id-ID")}
            </p>

            <div className="flex gap-4">
              <div className="flex">
                <button
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRemove(item.cart_items_id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Hapus item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleQuantityDecrease}
                  disabled={item.quantity <= 1}
                  className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={handleQuantityIncrease}
                  className="p-1 rounded-md border border-netral-100 hover:bg-gray-50 text-blu-350 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

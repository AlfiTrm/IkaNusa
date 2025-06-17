import { addToCart } from "@/api/services/products/cart";
import { useState } from "react";

export const useAddToCart = () => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (product_id: number, quantity: number = 1) => {
    try {
      setLoading(true);
      const result = await addToCart({ product_id, quantity });
      return result;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleAdd, loading };
};

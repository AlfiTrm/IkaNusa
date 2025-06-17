
import core from "@/api/core/core";
import { CartItem } from "@/features/cart/types/cart";

export interface AddToCartPayload {
  product_id: number;
  quantity: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: CartItem[];
}

export const addToCart = async (payload: AddToCartPayload) => {
  const token = localStorage.getItem("token");
  try {
    const response = await core.post("/users/add-to-cart", payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan ke keranjang:", error);
    throw error;
  }
};

export const getCart = async (): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  try {
    const response = await core.get("/users/my-cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    const data = response.data?.data;

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("Cart kosong atau bukan array:", data);
      return { ...response.data, data: [] };
    }

    const cartId = data.map((item: CartItem) => item.cart_items_id);
    console.log("CartId:", cartId);
    console.log("Cart Data:", data);

    return { ...response.data, data };
  } catch (error) {
    console.error("Gagal mengambil data keranjang:", error);
    throw error;
  }
};



export const deleteCartItem = async (cartId: number): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  try {
    const response = await core.delete(`/users/delete-cart-items/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus item dari keranjang:", error);
    throw error;
  }
};
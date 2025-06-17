import core from "@/api/core/core";
import { CartResponse } from "./cart";

export const checkoutCart = async (payload: { cart_items_id: number[] }): Promise<CartResponse> => {
    const token = localStorage.getItem("token");
    try {
        const response = await core.post("/users/checkout", payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Gagal melakukan checkout:", error);
        throw error;
    }
};
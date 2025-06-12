
import core from "@/api/core/core";

interface AddToCartPayload {
    product_id: number;
    quantity: number;
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

export interface IProduct {
    product_id: number;
    product_name: string;
    image_url: string;
    price: number;
    rating: number;
    sold: string;
    store_name: string;
    category: "air tawar" | "air laut" | "lain-lain";
}

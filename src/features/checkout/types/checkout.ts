import { StaticImageData } from "next/image";

export interface CheckoutItem {
  cart_items_id: number;
  product_id: number;
  product_name: string;
  image_url: string;
  price: number;
  quantity: number;
  store_name: string;
}

export interface CheckoutData {
  items: CheckoutItem[];
  summary: {
    selected_items: number;
    selected_price: number;
  };
  timestamp: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'ewallet' | 'va' | 'credit_card';
  icon: StaticImageData;
  fee?: number;
}
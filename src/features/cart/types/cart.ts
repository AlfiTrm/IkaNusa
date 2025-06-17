export interface CartItem {
  cart_items_id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
  store_name: string;
  selected: boolean;
}

export interface CartSummary {
  total_items: number;
  total_price: number;
  selected_items: number;
  selected_price: number;
}

export interface CartState {
  items: CartItem[];
  summary: CartSummary;
  loading: boolean;
  error: string | null;
}
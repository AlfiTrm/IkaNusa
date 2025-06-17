import { IProduct } from "@/shared/types/products";

export interface ProductDetailClientProps {
  product: IProduct & {
    description?: string;
    product_type?: string;
    stock?: number;
  };
}
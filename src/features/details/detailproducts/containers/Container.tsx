import React from "react";
import { ProductDetailClientProps } from "../types/product";
import ProductDetailClient from "../components/ProductDetail";

const ProductDetailContainer = ({ product }: ProductDetailClientProps) => {
  return (
    <div>
      <ProductDetailClient product={product}/>
    </div>
  );
};

export default ProductDetailContainer;

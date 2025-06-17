"use client";
import React from "react";
import ProductImageGallery from "./ProductImage";
import ProductInfo from "./ProductInfo";
import SellerInfo from "./SellerInfo";
import PurchaseBuy from "./ProductBuy";
import { ProductDetailClientProps } from "../types/product";

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  return (
    <main className="mycontainer px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <section className="flex flex-col lg:flex-row gap-10 w-full">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </section>
        <section className="flex flex-col gap-4 w-full lg:max-w-xs">
          <SellerInfo storeName={product.store_name} />
          <PurchaseBuy product={product} />
        </section>
      </div>
    </main>
  );
};

export default ProductDetailClient;
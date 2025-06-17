"use client";

import React from "react";
import ProdukTerdekat from "../components/PromoTerdekat";
import { ProductByCategory } from "../components/ProductByCategory";

const ProductContainer = () => {
  return (
    <div className="w-full md:h-screen pt-10">
      <ProductByCategory />
      <ProdukTerdekat />
    </div>
  );
};

export default ProductContainer;

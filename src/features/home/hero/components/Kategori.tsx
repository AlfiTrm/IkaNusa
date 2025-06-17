"use client";

import React from "react";
import { CategoryType } from "./KategoriPilihan";
import { categoriesType } from "../data/KategoriPilihan";

const Hero = () => {
  return (
    <section className="mycontainer w-full">
      <h1 className="font-bold text-xl">Kategori Pilihan</h1>
      <div className="flex justify-center mt-6 overflow-x-auto px-4 py-2">
        <div className="flex gap-4 justify-between w-full">
          {categoriesType.map((item, i) => (
            <CategoryType key={i} title={item.title} imageSrc={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

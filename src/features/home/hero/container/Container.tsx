"use client";

import React from "react";
import Kategori from "../components/Kategori";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

const HeroContainer = () => {
  return (
    <div className="w-full space-y-10">
      <Header />
      <Carousel />
      <Kategori />
    </div>
  );
};

export default HeroContainer;

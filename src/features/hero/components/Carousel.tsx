import React from "react";
import { useCarousel } from "../hooks/useCarousel";
import Image from "next/image";
import { dataCarousel } from "../data/Carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const { index, next, prev } = useCarousel(dataCarousel.length);

  return (
    <section className="flex justify-center w-full">
      <div className="relative w-[90%] rounded-xl">
        <button
          onClick={prev}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-blu-250 text-white w-12 h-12 rounded-full hidden lg:flex items-center justify-center cursor-pointer hover:bg-blu-350"
        >
          <ChevronLeft size={35} />
        </button>

        <button
          onClick={next}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-blu-250 text-white w-12 h-12 rounded-full hidden lg:flex items-center justify-center cursor-pointer hover:bg-blu-350"
        >
          <ChevronRight size={35} />
        </button>

        <Image
          src={dataCarousel[index]}
          alt={`Banner ${index + 1}`}
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {dataCarousel.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;

"use client";

import { useRouter } from "next/navigation";
import { IProduct } from "@/shared/types/products";
import { Star, Store } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/home/details/${product.product_id}`);
  };

  return (
    <section
      onClick={handleClick}
      className="w-full max-w-[160px] sm:max-w-48 hover:cursor-pointer"
    >
      <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md hover:scale-105 transition duration-200 hover:bg-neutral-50">
        <div className="relative w-full h-32 sm:h-40">
          <Image
            src={product.image_url}
            alt={product.product_name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 160px, 200px"
          />
        </div>

        <div className="p-2">
          <p className="text-xs sm:text-sm font-medium line-clamp-2">{product.product_name}</p>
          <p className="text-sm font-bold text-gray-800 mt-1">
            Rp{product.price.toLocaleString("id-ID")}
          </p>

          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 mt-1">
            <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
            <span>4.5</span>
            <span>• 5rb+ terjual</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-blue-500 mt-1">
            <Store className="w-3 h-3" />
            <span className="truncate">{product.store_name}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;

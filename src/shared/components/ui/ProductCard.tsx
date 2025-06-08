import { IProduct } from "@/shared/types/products";
import { Star, Store } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log("Product:", product);

  return (
    <div className="w-full max-w-[160px] sm:max-w-[200px]">
      <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md hover:scale-105 cursor-pointer hover:bg-neutral-50 transition duration-200">
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
            <span>{product.rating}</span>
            <span>•</span>
            <span>{product.sold} terjual</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-blue-500 mt-1">
            <Store className="w-3 h-3" />
            <span className="truncate">{product.store_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

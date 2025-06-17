import { Star, Store } from "lucide-react";
import Image from "next/image";
import { IProductStok } from "../types/product";

interface ProductCardProps {
  product: IProductStok;
}

const ProductDiscount = ({ product }: ProductCardProps) => {
  return (
    <div className="w-50">
      <div className="bg-white shadow overflow-hidden hover:shadow-md hover:scale-101 cursor-pointer hover:bg-neutral-50 transition">
        <Image
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-45 object-cover"
        />
        <div className="p-2">
          <p className="text-sm font-medium">{product.product_name}</p>
          <p className="text-sm font-bold text-gray-800">
            Rp{product.price.toLocaleString("id-ID")}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
            <span>{product.rating}</span>
            <span>•</span>
            <span>{product.sold} terjual</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-blue-500 mt-1">
            <Store className="w-3 h-3" />
            <span>{product.store_name}</span>
            {product.stock}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDiscount;

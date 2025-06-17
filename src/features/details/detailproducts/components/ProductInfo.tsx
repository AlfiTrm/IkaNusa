import { Star } from "lucide-react";
import { IProduct } from "@/shared/types/products";

const ProductInfo = ({
  product,
}: {
  product: IProduct & { description?: string; product_type?: string };
}) => {
  return (
    <div className="flex flex-col justify-between space-y-2 w-full max-w-xl">
      <div>
        <h1 className="text-xl font-bold">{product.product_name}</h1>
        <div className="flex items-center gap-2 text-sm text-netral-200">
          <span>Terjual 1 •</span>
          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
          <span>4.8 (1 rating)</span>
        </div>
        <p className="text-3xl font-bold mt-3">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
      </div>

      <div className="mt-2 pb-2">
        <h3 className="font-bold text-sm border-b-2 w-16 text-center text-netral-200 border-blu-400 pb-1">
          Detail
        </h3>
        <div className="text-sm mt-2 space-y-1 pl-2">
          <p className="flex gap-2 font-medium">
            <span className="text-netral-200">Kategori:</span>
            {product.category}
          </p>
          <p className="flex gap-2 font-medium">
            <span className=" text-netral-200">Tipe:</span>
            {product.product_type}
          </p>
        </div>
      </div>

      <p className="h-64 overflow-y-auto leading-7 text-justify pr-4">
        {product.description}
      </p>
    </div>
  );
};

export default ProductInfo;

import Image from "next/image";
import { IProduct } from "@/shared/types/products";

const ProductImageGallery = ({ product }: { product: IProduct }) => {
  return (
    <section className="flex flex-row md:flex-col items-center justify-center gap-4">
      <Image
        src={product.image_url}
        alt={product.product_name}
        width={450}
        height={450}
        className="rounded-xl shadow object-cover w-80 h-80 md:w-100 md:h-100 lg:w-200 xl:h-100 overflow-hidden"
      />
      <div className="flex gap-3 mt-4 flex-col md:flex-row">
        {[...Array(3)].map((_, i) => (
          <Image
            key={i}
            src={product.image_url}
            alt={`Thumbnail ${i + 1}`}
            width={80}
            height={80}
            className="rounded-xl border w-20 h-20 md:w-30 md:h-30 lg:w-20 lg:h-20 object-cover shadow"
          />
        ))}
      </div>
    </section>
  );
};

export default ProductImageGallery;

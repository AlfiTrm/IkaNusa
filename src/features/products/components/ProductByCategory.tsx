import { categories } from "@/features/hero/data/KategoriPilihan";
import LoadingProduct from "@/shared/components/ui/LoadingProduct";
import ProductCard from "@/shared/components/ui/ProductCard";
import { useProductByCategory } from "@/shared/hooks/useProductByCategory";
import { useState } from "react";

export const ProductByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("rekomendasi");
  const { products, loading, error } = useProductByCategory(selectedCategory);

  if (loading) return <LoadingProduct />;
  if (error) return <p>{error}</p>;

  return (
    <section className="px-4">
      <div className="flex gap-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.map((item) => (
          <button
            key={item.value}
            className={`pb-2 border-b-4 text-sm md:text-base shrink-0 ${
              selectedCategory === item.value
                ? "text-blu-350 border-blu-350 font-semibold"
                : "text-gray-600 border-transparent hover:text-blu-300"
            }`}
            onClick={() => setSelectedCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
};

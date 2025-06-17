import LoadingProduct from "@/shared/components/ui/LoadingProduct";
import ProductCard from "@/shared/components/ui/ProductCard";
import { useProductByCategory } from "@/shared/hooks/useProductByCategory";
import { useEffect, useState } from "react";
import { categories } from "../../hero/data/KategoriPilihan";

export const ProductByCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("rekomendasi");
  const { products, loading, error } = useProductByCategory(selectedCategory);
  const [lastProductCount, setLastProductCount] = useState(6);

  useEffect(() => {
    if (products.length > 0) {
      setLastProductCount(products.length);
    }
  }, [products]);

  if (error) return <p>{error}</p>;

  return (
    <section className="mycontainer">
      <div className="flex gap-4 mb-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.map((item) => (
          <button
            key={item.value}
            className={`pb-2 border-b-4 text-sm md:text-base shrink-0 cursor-pointer ${
              selectedCategory === item.value
                ? "text-blu-350 border-blu-350 font-semibold"
                : "text-netral-300 border-transparent hover:border-netral-100 transition-all"
            }`}
            onClick={() => setSelectedCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
        {loading ? (
          <LoadingProduct count={lastProductCount} />
        ) : (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

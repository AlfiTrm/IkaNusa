import { useState, useEffect } from "react";
import { IProduct } from "@/shared/types/products";
import { getAllProducts, getProductsByCategory } from "@/api/services/products/product";

export const useProductByCategory = (category: string) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProducts = async () => {
      try {
        let data: IProduct[] = [];
        if (category.toLowerCase() === "rekomendasi") {
          data = await getAllProducts();
        } else {
          data = await getProductsByCategory(category);
        }
        setProducts(data);
      } catch (error) {
        console.log(error)
        setError("Gagal memuat produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

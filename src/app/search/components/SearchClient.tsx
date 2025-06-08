"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IProduct } from "@/shared/types/products";
import { getProductsByName } from "@/api/services/products/product";
import ProductCard from "@/shared/components/ui/ProductCard";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const results = await getProductsByName(query);
        setProducts(results);
      } catch (error) {
        console.error("Gagal ambil data produk berdasarkan nama:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchSearchResults();
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hasil untuk: &quot;{query}&quot;</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>Tidak ada produk ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchClient;

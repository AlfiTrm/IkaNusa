"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IProduct } from "@/shared/types/products";
import {
  getProductsByName,
  getProductsByCategory,
  getProductsByType,
} from "@/api/services/products/product";
import ProductCard from "@/shared/components/ui/ProductCard";
import LoadingProduct from "@/shared/components/ui/LoadingProduct";
import { categories, categoriesType } from "@/features/home/hero/data/KategoriPilihan";


const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastProductCount, setLastProductCount] = useState(6);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [searchMode, setSearchMode] = useState<"search" | "category" | "type">(
    "search"
  );

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      setSearchMode("search");
      setSelectedCategory("");
      setSelectedType(null);
      console.log(setLastProductCount);
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

  const handleCategoryChange = async (categoryValue: string) => {
    if (categoryValue === selectedCategory) return;

    setLoading(true);
    setSelectedCategory(categoryValue);
    setSelectedType(null); 
    setSearchMode("category");

    try {
      const results = await getProductsByCategory(categoryValue);
      setProducts(results);
    } catch (error) {
      console.error("Gagal ambil data produk berdasarkan kategori:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = async (typeId: number) => {
    if (typeId === selectedType) return;

    setLoading(true);
    setSelectedType(typeId);
    setSelectedCategory("");
    setSearchMode("type");

    try {
      const results = await getProductsByType(typeId);
      setProducts(results);
    } catch (error) {
      console.error("Gagal ambil data produk berdasarkan tipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedType(null);
    if (query) {
      setSearchMode("search");
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
      fetchSearchResults();
    } else {
      setProducts([]);
      setSearchMode("search");
    }
  };

const getTitle = () => {
  if (searchMode === "category" && selectedCategory) {
    const categoryLabel = categories.find(
      (cat) => cat.value === selectedCategory
    )?.label;
    return (
      <>
        Produk Kategori:
        <span className="italic text-netral-600">&quot;{categoryLabel}&quot;</span>
      </>
    );
  }
  if (searchMode === "type" && selectedType) {
    const typeLabel = categoriesType.find(
      (type) => type.id === selectedType
    )?.title;
    return (
      <>
        Produk Tipe:
        <span className="italic text-netral-600">&quot;{typeLabel}&quot;</span>
      </>
    );
  }
  if (query) {
    return (
      <>
        Hasil pencarian untuk:
        <span className="italic text-netral-600">&quot;{query}&quot;</span>
      </>
    );
  }
  return "Pilih kategori atau tipe untuk melihat produk";
};

  return (
    <section className="mycontainer py-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-blu-400">
        {getTitle()}
      </h1>

      <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <h3 className="font-medium text-gray-800">Filter Kategori:</h3>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleResetFilters}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                !selectedCategory && !selectedType
                  ? "bg-gray-500 text-white border-gray-500"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Semua
            </button>

            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedCategory === category.value
                    ? "bg-blu-350 text-white border-blu-350"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-gray-200">
          <h3 className="font-medium text-gray-800">Filter Tipe:</h3>

          <div className="flex flex-wrap gap-2">
            {categoriesType.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  selectedType === type.id
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        {(selectedCategory || selectedType) && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filter aktif:</span>

              {selectedCategory && (
                <span className="px-2 py-1 bg-blu-350 text-white text-xs rounded-full">
                  {
                    categories.find((cat) => cat.value === selectedCategory)
                      ?.label
                  }
                </span>
              )}

              {selectedType && (
                <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  {categoriesType.find((type) => type.id === selectedType)?.title}
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Hapus semua filter
              </button>
            </div>
          </div>
        )}
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

      {!loading &&
        products.length === 0 &&
        (query || selectedCategory || selectedType) && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              {searchMode === "category"
                ? `Tidak ada produk dalam kategori "${
                    categories.find((cat) => cat.value === selectedCategory)
                      ?.label
                  }"`
                : searchMode === "type"
                ? `Tidak ada produk dengan tipe "${
                    categoriesType.find((type) => type.id === selectedType)?.title
                  }"`
                : `Tidak ada hasil untuk pencarian "${query}"`}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blu-350 text-white rounded-md hover:bg-blu-400 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

      {!loading &&
        products.length === 0 &&
        !query &&
        !selectedCategory &&
        !selectedType && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Mulai pencarian atau pilih kategori/tipe
            </h3>
            <p className="text-gray-600">
              Gunakan search bar di atas atau pilih kategori/tipe untuk melihat
              produk
            </p>
          </div>
        )}
    </section>
  );
};

export default SearchClient;

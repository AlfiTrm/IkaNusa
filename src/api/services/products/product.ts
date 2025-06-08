

import core from "@/api/core/core";
import { IProduct } from "@/shared/types/products";

export const getAllProducts = async () => {
  try {
    const response = await core.get("/products/all")
    if (Array.isArray(response.data.data)) {

      return response.data.data
    }
    console.log(response.data.data)
    console.log(response.data)

  } catch (error) {
    console.log("Error fetching products: ", error)
    throw error

  }
}

export const getProductsByCategory = async (category: string): Promise<IProduct[]> => {
  try {
    const encodedCategory = encodeURIComponent(category.toLowerCase());
    const response = await core.get(`/products/category/${encodedCategory}`);

    if (Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.warn("Format data tidak sesuai");
      return [];
    }
  } catch (error) {
    console.error("Gagal fetch produk berdasarkan kategori:", error);
    return [];
  }
};

// Get product by name (search)
export const getProductsByName = async (name: string): Promise<IProduct[]> => {
  try {
    const res = await core.get(`/products?product=${encodeURIComponent(name)}`);
    return res.data.data || [];
  } catch (err) {
    console.error("Failed to fetch products by name:", err);
    return [];
  }
};

// Get product detail by ID
export const getProductDetail = async (id: number): Promise<IProduct | null> => {
  try {
    const res = await core.get(`/products/detail/${id}`);
    return res.data.data || null;
  } catch (err) {
    console.error(`Failed to fetch product detail with ID ${id}:`, err);
    return null;
  }
};

// Get products by type ID
export const getProductsByType = async (typeId: number): Promise<IProduct[]> => {
  try {
    const res = await core.get(`/products/type/${typeId}`);
    return res.data.data || [];
  } catch (err) {
    console.error(`Failed to fetch products by type ID ${typeId}:`, err);
    return [];
  }
};

// Get product types
export interface IProductType {
  id: number;
  name: string;
}

export const getProductTypes = async (): Promise<IProductType[]> => {
  try {
    const res = await core.get("/products/products-types");
    return res.data.data || [];
  } catch (err) {
    console.error("Failed to fetch product types:", err);
    return [];
  }
};
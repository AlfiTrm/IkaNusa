"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Store,
  Heart,
  Share2,
  Minus,
  Plus,
  MessageSquareText,
} from "lucide-react";
import { IProduct } from "@/shared/types/products";
import { useAddToCart } from "../hooks/useAddToCart";

interface ProductDetailClientProps {
  product: IProduct & {
    description?: string;
    product_type?: string;
  };
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [quantity, setQuantity] = useState(1);
  const { handleAdd, loading } = useAddToCart();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <main className="mycontainer px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <section className="flex flex-col lg:flex-row gap-10 w-full">
          <div className="flex flex-col items-center">
            <Image
              src={product.image_url}
              alt={product.product_name}
              width={450}
              height={450}
              className="rounded-xl shadow object-cover"
            />
            <div className="flex gap-3 mt-4">
              {[...Array(3)].map((_, i) => (
                <Image
                  key={i}
                  src={product.image_url}
                  alt={`Thumbnail ${i + 1}`}
                  width={80}
                  height={80}
                  className="rounded-xl border w-20 h-20 object-cover shadow"
                />
              ))}
            </div>
          </div>

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
        </section>

        <section className="flex flex-col gap-4 w-full lg:max-w-xs">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-blu-350" />
              <span className="text-xl font-semibold text-netral-200">
                {product.store_name}
              </span>
            </div>
            <button className="border border-blu-350 text-blu-350 font-semibold px-3 py-1 rounded-lg hover:bg-blu-100 cursor-pointer transition">
              Follow
            </button>
          </div>

          <div className="border border-netral-200 p-4 rounded-lg shadow-sm space-y-5">
            <h4 className="font-semibold text-lg">Atur jumlah dan catatan</h4>
            <div className="flex items-center gap-3">
              <button onClick={decreaseQuantity}>
                <Minus />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button onClick={increaseQuantity} className="text-blu-350">
                <Plus />
              </button>
              <span className="text-sm text-gray-500">
                Stok Total {product.price}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-lg font-semibold">
                Rp{(product.price * quantity).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-full bg-white text-blu-350 border-2 border-blu-350 py-2 rounded-lg hover:bg-blu-350 hover:text-white transition-all cursor-pointer">
                Beli Langsung
              </button>
              <button
                onClick={() => handleAdd(product.product_id, quantity)}
                disabled={loading}
                className="w-full flex justify-center border-2 border-blu-350 bg-blu-350 text-white py-2 rounded-lg hover:bg-white hover:text-blu-350 transition cursor-pointer"
              >
                <Plus />
                Keranjang
              </button>
            </div>
            <div className="flex justify-around text-xs font-semibold text-netral-250 mt-2">
              <button className="flex items-center gap-2 hover:text-black cursor-pointer">
                <MessageSquareText
                  strokeWidth={1}
                  className="w-4 h-4 text-black"
                />
                Chat
              </button>
              |
              <button className="flex items-center gap-2 hover:text-black cursor-pointer">
                <Heart strokeWidth={1} className="w-4 h-4 text-black" />
                Wishlist
              </button>
              |
              <button className="flex items-center gap-2 hover:text-black cursor-pointer">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetailClient;

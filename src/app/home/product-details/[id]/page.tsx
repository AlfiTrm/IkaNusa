import { getProductDetail } from "@/api/services/products/product";
import ProductDetailClient from "@/features/details/detailproducts/components/DetailProduct";
import { Review } from "@/features/details/reviewproduct/components/Review";
import { IProduct } from "@/shared/types/products";

interface ProductDetailProps extends IProduct {
  description?: string;
  product_type?: string;
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product: ProductDetailProps | null = await getProductDetail(Number(id));

  if (!product) {
    return (
      <div className="p-6 text-center h-screen flex justify-center items-center">
        Produk tidak ditemukan
      </div>
    );
  }

  return (
    <main className="pt-20">
      <ProductDetailClient product={product} />
      <Review productId={product.product_id} />
    </main>
  );
};

export default ProductDetailPage;

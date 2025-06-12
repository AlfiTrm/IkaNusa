import { getProductDetail } from "@/api/services/products/product";
import ProductDetailClient from "@/features/details/detailproducts/components/DetailProduct";
import { Review } from "@/features/details/reviewproduct/components/Review";
import { IProduct } from "@/shared/types/products";

interface DetailPageProps {
  params: {
    id: string;
  };
}

interface ProductDetailProps extends IProduct {
  description?: string;
  product_type?: string;
}

const ProductDetailPage = async ({ params }: DetailPageProps) => {
  const product: ProductDetailProps | null = await getProductDetail(
    Number(params.id)
  );

  if (!product) {
    return (
      <div className="p-6 text-center h-screen flex justify-center items-center ">
        Produk tidak ditemukan
      </div>
    );
  }

  return (
    <>
      <ProductDetailClient product={product} />
      <Review productId={product.product_id} />;
    </>
  );
};

export default ProductDetailPage;

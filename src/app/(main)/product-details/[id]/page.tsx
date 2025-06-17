import { getProductDetail } from "@/api/services/products/product";
import ProductDetailContainer from "@/features/details/detailproducts/containers/Container";
import ReviewContainer from "@/features/details/reviewproduct/container/Container";
import { IProduct } from "@/shared/types/products";

interface ProductDetailProps extends IProduct {
  description?: string;
  product_type?: string;
}
interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const product: ProductDetailProps | null = await getProductDetail(
    Number((await params).id)
  );

  if (!product) {
    return (
      <div className="p-6 text-center font-bold text-3xl h-screen flex justify-center items-center">
        Produk tidak ada
      </div>
    );
  }

  return (
    <main>
      <ProductDetailContainer product={product} />
      <ReviewContainer productId={product.product_id} />
    </main>
  );
};

export default ProductDetailPage;

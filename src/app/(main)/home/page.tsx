import DiscountContainer from "@/features/home/discount/container/Container";
import HeroContainer from "@/features/home/hero/container/Container";
import ProductContainer from "@/features/home/products/container/Container";

export default function Home() {
  return (
    <main>
      <HeroContainer />
      <ProductContainer />
      <DiscountContainer />
    </main>
  );
}

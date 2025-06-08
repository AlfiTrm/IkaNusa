import DiscountContainer from "@/features/discount/container/Container";
import HeroContainer from "@/features/hero/container/Container";
import ProductContainer from "@/features/products/container/Container";

export default function Home() {
  return (
    <main>
      <HeroContainer />
      <ProductContainer />
      <DiscountContainer />
    </main>
  );
}

import { promoProducts } from "../data/Promo";
import PromoCard from "./PromoCard";

const ProdukTerdekat = () => {
  return (
    <section className="mycontainer my-10">
      <h1 className="text-xl font-bold mb-5">Produk Terdekat</h1>
      <div className="flex pb-2 gap-5 2xl:overflow-x-hidden overflow-x-auto">
        {promoProducts.map((item) => (
          <PromoCard
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            discount={item.discount}
            rating={item.rating}
            sold={item.sold}
            endDate={item.endDate}
          />
        ))}
      </div>
    </section>
  );
};

export default ProdukTerdekat;

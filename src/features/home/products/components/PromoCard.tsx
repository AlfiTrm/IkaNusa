import Image from "next/image";
import CountdownTimer from "../hooks/Countdown";
import { Plus } from "lucide-react";
import { IPromoCardProps } from "../types/IPromo";

const PromoCard = ({
  image,
  title,
  price,
  discount,
  rating,
  sold,
  endDate,
}: IPromoCardProps) => {
  return (
    <div className="border rounded-lg p-3 w-full relative flex flex-col sm:flex-row gap-4">
      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
        {discount}
      </div>

      <div className="w-full sm:w-64 h-40 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2 className="font-semibold text-sm">{title}</h2>
          <p className="text-xs text-gray-500">
            ⭐ {rating} • {sold} terjual
          </p>
          <p className="font-bold text-sm mt-1">{price}</p>
        </div>

        <div className="mt-2 bg-neutral-100 rounded-lg p-2 w-max">
          <CountdownTimer endDate={endDate} />
        </div>

        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-blue-600 cursor-pointer transition w-full sm:w-auto justify-center">
          <Plus />
          <p>Keranjang</p>
        </button>
      </div>
    </div>
  );
};

export default PromoCard;

import { CategoryProps } from "../types/Types";
import Image from "next/image";

export const CategoryType = ({ title, imageSrc }: CategoryProps) => {
  return (
    <button className="bg-white rounded-xl shadow hover:shadow-md shadow-netral-100 p-4 w-full max-w-[160px] sm:max-w-[180px] lg:max-w-[168px] h-auto flex flex-col items-center hover:scale-101 cursor-pointer hover:bg-neutral-50 transition duration-200">
      <div className="w-16 h-16 lg:w-20 lg:h-16 relative mb-2">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <p className="text-center font-semibold text-sm">{title}</p>
    </button>
  );
};

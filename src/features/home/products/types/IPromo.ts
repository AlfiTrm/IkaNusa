import { StaticImageData } from "next/image";

export interface IPromoCardProps {
    image: StaticImageData;
    title: string;
    price: string;
    discount: string;
    rating: number;
    sold: string;
    endDate: string;
}
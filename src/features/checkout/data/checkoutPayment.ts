import { PaymentMethod } from "../types/checkout";
import mandiri from "@/assets/img/checkout/mandiri.webp";
import alfa from "@/assets/img/checkout/alfa.webp";
import bca from "@/assets/img/checkout/bca.webp";
import bri from "@/assets/img/checkout/bri.webp";

export const paymentMethods: PaymentMethod[] = [
    { id: "bca_va", name: "BCA Virtual Account", type: "va", icon: bca },
    {
        id: "alfamart",
        name: "Alfamart / Indomaret",
        type: "va",
        icon: alfa,
    },
    {
        id: "mandiri_va",
        name: "Mandiri Virtual Account",
        type: "va",
        icon: mandiri,
    },
    { id: "bri_va", name: "BRI Virtual Account", type: "va", icon: bri },
];
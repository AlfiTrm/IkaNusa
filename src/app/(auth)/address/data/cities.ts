import { SelectOption } from '../types/SelectOption';

export const cities: Record<string, SelectOption[]> = {
  "jawa-timur": [
    { value: "malang", label: "Malang" },
    { value: "surabaya", label: "Surabaya" },
    { value: "batu", label: "Batu" },
    { value: "blitar", label: "Blitar" },
  ],
  "jawa-barat": [
    { value: "bandung", label: "Bandung" },
    { value: "bekasi", label: "Bekasi" },
    { value: "bogor", label: "Bogor" },
  ],
};

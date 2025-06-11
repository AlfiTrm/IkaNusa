import { SelectOption } from '../types/SelectOption';

export const districts: Record<string, SelectOption[]> = {
  malang: [
    { value: "klojen", label: "Klojen" },
    { value: "blimbing", label: "Blimbing" },
    { value: "lowokwaru", label: "Lowokwaru" },
    { value: "sukun", label: "Sukun" },
  ],
  surabaya: [
    { value: "gubeng", label: "Gubeng" },
    { value: "wonokromo", label: "Wonokromo" },
    { value: "rungkut", label: "Rungkut" },
  ],
};

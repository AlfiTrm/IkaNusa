import { City, District, Province } from "@/api/services/users/addres";
import { SelectOption } from "../types/SelectOption";

export const useStep1 = (
  provinces: Province[],
  cities: City[],
  districts: District[]
) => {
  const provinceOptions: SelectOption[] = provinces.map((province) => ({
    value: province.province_id.toString(),
    label: province.province_name,
  }));

  const cityOptions: SelectOption[] = cities.map((city) => ({
    value: city.city_id.toString(),
    label: city.city_name,
  }));

  const districtOptions: SelectOption[] = districts.map((district) => ({
    value: district.district_id.toString(),
    label: district.district_name,
  }));

  return {
    provinceOptions,
    cityOptions,
    districtOptions,
  };
};

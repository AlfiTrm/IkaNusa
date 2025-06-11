import React from "react";
import CustomSelect from "./ui/CustomSelect";
import { AddressData } from "../types/addresData";
import { MapPin } from "lucide-react";
import Header from "./ui/Header";
import ProgressSteps from "./ui/ProgressSteps";
import { City, District, Province } from "@/api/services/users/addres";
import { SelectOption } from "../types/SelectOption";

interface Step1Props {
  addressData: AddressData;
  handleProvinceChange: (value: string) => void;
  handleCityChange: (value: string) => void;
  handleDistrictChange: (value: string) => void;
  isStep1Valid: boolean;
  onSubmit: () => void;
  currentStep: number;
  totalSteps: number;
  provinces: Province[];
  cities: City[];
  districts: District[];
}

const Step1: React.FC<Step1Props> = ({
  addressData,
  handleProvinceChange,
  handleCityChange,
  handleDistrictChange,
  isStep1Valid,
  onSubmit,
  currentStep,
  totalSteps,
  provinces,
  cities,
  districts,
}) => {
  // Format data provinsi menjadi array of SelectOption
  const provinceOptions: SelectOption[] = provinces.map((province) => ({
    value: province.province_id.toString(),
    label: province.province_name,
  }));

  // Format data kota menjadi array of SelectOption
  const cityOptions: SelectOption[] = cities.map((city) => ({
    value: city.city_id.toString(),
    label: city.city_name,
  }));

  // Format data kecamatan menjadi array of SelectOption
  const districtOptions: SelectOption[] = districts.map((district) => ({
    value: district.district_id.toString(),
    label: district.district_name,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md shadow-netral-100 p-6 mb-6 md:translate-y-20">
      <Header />
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blu-150 p-3 rounded-full">
          <MapPin className="w-6 h-6 text-blu-400 animate-pulse" />
        </div>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-netral-300 mb-2">
          Tambah Alamat Pengiriman
        </h2>
        <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
        <div className="flex items-center justify-center md:space-x-80 space-x-8 text-xs text-netral-200">
          <span className="text-blu-400 font-medium">
            Cari lokasi pengirimanmu
          </span>
          <span>Lengkapi detail alamat</span>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Di mana lokasi tujuan pengirimanmu?
          </h3>
        </div>
        <div className="space-y-4">
          <CustomSelect
            placeholder="Pilih Provinsi"
            options={provinceOptions}
            value={addressData.province}
            onChange={handleProvinceChange}
          />
          <CustomSelect
            placeholder="Kota"
            options={cityOptions}
            value={addressData.city}
            onChange={handleCityChange}
            disabled={!addressData.province || cities.length === 0}
          />
          <CustomSelect
            placeholder="Kecamatan"
            options={districtOptions}
            value={addressData.district.toString()}
            onChange={handleDistrictChange}
            disabled={!addressData.city || districts.length === 0}
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={!isStep1Valid}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
          isStep1Valid
            ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Simpan
      </button>
    </div>
  );
};

export default Step1;
import React from "react";
import InputField from "./ui/InputField";
import { AddressData } from "../types/addresData";
import { MapPin } from "lucide-react";
import Header from "./ui/Header";
import ProgressSteps from "./ui/ProgressSteps";

interface Step2Props {
  addressData: AddressData;
  setAddressData: React.Dispatch<React.SetStateAction<AddressData>>;
  isStep2Valid: boolean;
  onSubmit: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isSubmitting?: boolean;
}

const Step2: React.FC<Step2Props> = ({
  addressData,
  setAddressData,
  isStep2Valid,
  onSubmit,
  onBack,
  currentStep,
  totalSteps,
  isSubmitting = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md shadow-netral-100 p-6 mb-6">
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
          <span>Cari lokasi pengirimanmu</span>
          <span className="text-blu-400 font-medium">
            Lengkapi detail alamat
          </span>
        </div>
      </div>
      <div className="space-y-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Lengkapi Detail Alamat
          </h3>
        </div>
        <div className="space-y-4">
          <InputField
            placeholder="Label Alamat (contoh: Rumah, Kantor)"
            value={addressData.label}
            onChange={(value) =>
              setAddressData({ ...addressData, label: value })
            }
            maxLength={30}
            disabled={isSubmitting}
          />
          <InputField
            placeholder="Alamat Lengkap"
            value={addressData.address_detail}
            onChange={(value) =>
              setAddressData({ ...addressData, address_detail: value })
            }
            maxLength={200}
            multiline={true}
            rows={4}
            disabled={isSubmitting}
          />
          <InputField
            placeholder="Catatan untuk Kurir (opsional)"
            value={addressData.notes}
            onChange={(value) =>
              setAddressData({ ...addressData, notes: value })
            }
            maxLength={100}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className={`flex-1 py-3 px-4 border border-gray-300 rounded-xl font-semibold transition-all duration-300 ${
            isSubmitting 
              ? "text-gray-400 cursor-not-allowed" 
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Kembali
        </button>
        <button
          onClick={onSubmit}
          disabled={!isStep2Valid || isSubmitting}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
            isStep2Valid && !isSubmitting
              ? "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
};

export default Step2;
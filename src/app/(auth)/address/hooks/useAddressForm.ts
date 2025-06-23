"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  City,
  District,
  getAllCities,
  getAllDistricts,
  getAllProvinces,
  Province,
} from "@/api/services/users/addres";
import { decodeToken } from "@/utils/token";
import { postAddress } from "@/api/services/users/register";
import { AddressData } from "../types/addresData";

export const useAddressForm = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState<AddressData>({
    province: "",
    city: "",
    district: 0,
    label: "",
    address_detail: "",
    notes: "",
  });
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provincesData = await getAllProvinces();
        setProvinces(provincesData);
      } catch (error) {
        console.log(error)
        alert("Gagal memuat data provinsi. Silakan refresh halaman.");
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (addressData.province) {
        try {
          const citiesData = await getAllCities(Number(addressData.province));
          setCities(citiesData);
        } catch {
          setCities([]);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [addressData.province]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (addressData.city) {
        try {
          const districtsData = await getAllDistricts(Number(addressData.city));
          setDistricts(districtsData);
        } catch {
          setDistricts([]);
        }
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [addressData.city]);

  const handleProvinceChange = (value: string) => {
    setAddressData((prev) => ({
      ...prev,
      province: value,
      city: "",
      district: 0,
    }));
    setCities([]);
    setDistricts([]);
  };

  const handleCityChange = (value: string) => {
    setAddressData((prev) => ({
      ...prev,
      city: value,
      district: 0,
    }));
    setDistricts([]);
  };

  const handleDistrictChange = (value: string) => {
    setAddressData((prev) => ({
      ...prev,
      district: Number(value),
    }));
  };

  const handleSubmitStep1 = () => {
    if (addressData.province && addressData.city && addressData.district) {
      setCurrentStep(2);
    } else {
      alert("Mohon lengkapi semua field!");
    }
  };

  const handleSubmitStep2 = async () => {
    if (addressData.label && addressData.address_detail) {
      setIsSubmitting(true);
      try {
        const decoded = decodeToken();
        if (!decoded || !decoded.UserID) {
          alert("Token tidak valid. Silakan login ulang.");
          router.push("/signin");
          return;
        }

        const payload = {
          user_id: decoded.UserID,
          district_id: addressData.district,
          label: addressData.label,
          notes: addressData.notes,
          address_detail: addressData.address_detail,
        };

        await postAddress(payload);
        alert("Alamat berhasil disimpan!");
        router.push("/otp");
      } catch {
        alert("Gagal menyimpan alamat. Silakan coba lagi.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Mohon lengkapi field yang wajib diisi!");
    }
  };

  const handleBack = () => setCurrentStep(1);

  const isStep1Valid = !!(addressData.province && addressData.city && addressData.district);
  const isStep2Valid = !!(addressData.label && addressData.address_detail);

  return {
    currentStep,
    addressData,
    provinces,
    cities,
    districts,
    isSubmitting,
    handleProvinceChange,
    handleCityChange,
    handleDistrictChange,
    handleSubmitStep1,
    handleSubmitStep2,
    handleBack,
    setAddressData,
    isStep1Valid,
    isStep2Valid,
  };
};

"use client";

import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Footer from "./ui/Footer";
import { AddressData } from "../types/addresData";
import {
  City,
  District,
  getAllCities,
  getAllDistricts,
  getAllProvinces,
  Province,
} from "@/api/services/users/addres";
import { decodeToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { postAddress } from "@/api/services/users/register";

const AddressForm: React.FC = () => {
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
        console.log("Provinces:", provincesData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
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
          console.log("Cities for province", addressData.province, ":", citiesData);
        } catch (error) {
          console.error("Error fetching cities:", error);
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
          console.log("Districts for city", addressData.city, ":", districtsData);
        } catch (error) {
          console.error("Error fetching districts:", error);
          setDistricts([]);
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [addressData.city]);

  const handleProvinceChange = (value: string) => {
    console.log("Province changed to:", value);
    setAddressData({
      ...addressData,
      province: value,
      city: "",
      district: 0,
    });
    setCities([]);
    setDistricts([]);
  };

  const handleCityChange = (value: string) => {
    console.log("City changed to:", value);
    setAddressData({
      ...addressData,
      city: value,
      district: 0,
    });
    setDistricts([]);
  };

  const handleDistrictChange = (value: string) => {
    console.log("District changed to:", value);
    setAddressData({
      ...addressData,
      district: Number(value),
    });
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

        console.log("Submitting address data:", payload);

        const response = postAddress(payload)
        
        console.log("Address submission successful:", response);
        alert("Alamat berhasil disimpan!");
        
        router.push("/otp");
        
      } catch (error) {
        console.error("Error submitting address:", error);
        alert("Gagal menyimpan alamat. Silakan coba lagi.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Mohon lengkapi field yang wajib diisi!");
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const isStep1Valid = !!(
    addressData.province &&
    addressData.city &&
    addressData.district
  );
  const isStep2Valid = !!(addressData.label && addressData.address_detail);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 mx-auto px-4 py-8 max-w-4xl">
        {currentStep === 1 ? (
          <Step1
            addressData={addressData}
            handleProvinceChange={handleProvinceChange}
            handleCityChange={handleCityChange}
            handleDistrictChange={handleDistrictChange}
            isStep1Valid={isStep1Valid}
            onSubmit={handleSubmitStep1}
            currentStep={currentStep}
            totalSteps={2}
            provinces={provinces}
            cities={cities}
            districts={districts}
          />
        ) : (
          <Step2
            addressData={addressData}
            setAddressData={setAddressData}
            isStep2Valid={isStep2Valid}
            onSubmit={handleSubmitStep2}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={2}
            isSubmitting={isSubmitting}
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default AddressForm;
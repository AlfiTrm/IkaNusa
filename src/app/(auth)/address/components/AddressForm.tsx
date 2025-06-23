"use client";

import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Footer from "./ui/Footer";
import { useAddressForm } from "../hooks/useAddressForm";

const AddressForm: React.FC = () => {
  const {
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
  } = useAddressForm();

  return (
    <div className="pb-20">
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

import { useState } from 'react';
import { AddressData } from '../types/addresData';

const useAddressForm = () => {
  const [addressData, setAddressData] = useState<AddressData>({
    province : "",
    city: "",
    district: 0,
    label: "",
    address_detail: "",
    notes: "",
  });

  const handleProvinceChange = (value: string) => {
    setAddressData({
      ...addressData,
      province: value,
      city: "",
      district: 0,
    });
  };

  const handleCityChange = (value: string) => {
    setAddressData({
      ...addressData,
      city: value,
      district: 0,
    });
  };

  const handleDistrictChange = () => {
    setAddressData({
      ...addressData,
      district: 1,
    });
  };

  const resetForm = () => {
    setAddressData({
      province: "",
      city: "",
      district: 0,
      label: "",
      address_detail: "",
      notes: "",
    });
  };

  return {
    addressData,
    handleProvinceChange,
    handleCityChange,
    handleDistrictChange,
    resetForm,
  };
};

export default useAddressForm;

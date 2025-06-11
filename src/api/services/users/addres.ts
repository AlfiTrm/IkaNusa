import core from "@/api/core/core";

export interface Province {
    province_id: number;
    province_name: string;
}

export const getAllProvinces = async (): Promise<Province[]> => {
    try {
        const response = await core.get("/provinces");
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error("Gagal mengambil data provinsi:", error);
        return [];
    }
};

export interface City {
    city_id: number;
    city_name: string;
}

export const getAllCities = async (provinceId: number): Promise<City[]> => {
    try {
        const response = await core.get(`/cities/${provinceId}`);
        return response.data.data;
    } catch (error) {
        console.error("Gagal mengambil data kota:", error);
        return [];
    }
};

export interface District {
    district_id: number,
    district_name: string,
}

export const getAllDistricts = async (cityId: number): Promise<District[]> => {
    try {
        const response = await core.get(`/districts/${cityId}`);
        return response.data.data;
    } catch (error) {
        console.error("Gagal mengambil data kecamatan:", error);
        return [];
    }
};
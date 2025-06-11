import core from "@/api/core/core";

interface RegisterPayload {
  username: string;
  email: string;
  phone_number: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const res = await core.post("/auth/register", payload);
  return res.data;
}


interface AddressPayload {
  user_id: string;
  district_id: number;
  label: string;
  notes: string;
  address_detail: string;
}

export const postAddress = async (payload: AddressPayload) => {
  try {
    const response = await core.post("/auth/register/add-address", payload);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan alamat:", error);
    throw error;
  }
};

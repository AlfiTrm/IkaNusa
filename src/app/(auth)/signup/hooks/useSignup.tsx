import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/services/users/register";
import { decodeToken } from "@/utils/token";
import { jwtDecode } from "jwt-decode";

export const useSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    password: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Kamu harus menyetujui syarat & ketentuan dulu.");
      return;
    }

    try {
      const payload = {
        username: formData.fullName,
        email: formData.email,
        phone_number: formData.whatsapp,
        password: formData.password,
      };

      const data = await registerUser(payload);

      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        const decoded = decodeToken();
        if (decoded) {
          localStorage.setItem("user_id", decoded.UserID);
          localStorage.setItem("exp", decoded.exp);
          console.log("Isi token:", jwtDecode(data.data.token));
        }
      }

      router.push("/address");
      alert("Berhasil mendaftar!");
    } catch (err) {
      console.error("Register failed:", err);
      alert("Gagal mendaftar. Cek kembali data kamu.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

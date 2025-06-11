"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/img/logo/ikanusalogo.webp";
import { LockKeyhole, Mail, Phone, User2 } from "lucide-react";
import { registerUser } from "@/api/services/users/register";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/token";
import { jwtDecode } from "jwt-decode";

export default function SignUp() {
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

      console.log("Register success:", data);

      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        console.log(data.data.token)
        const decoded = decodeToken();
        if (decoded) {
          localStorage.setItem("user_id", decoded.UserID);
          localStorage.setItem("exp", decoded.exp);
          console.log(decoded.UserID)
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 z-50 rounded-xl shadow-md w-full max-w-10/12"
      >
        <div className="flex justify-center mb-4">
          <Image src={logo} alt="IkaNusa Logo" className="w-44" />
        </div>

        <h2 className="text-4xl font-bold text-center text-netral-250 mb-6">
          Sign up
        </h2>

        <label
          htmlFor="Nama Lengkap"
          className="flex flex-col gap-2 font-semibold text-base"
        >
          Nama Lengkap
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Tulis Namamu disini"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-16 py-3 mb-4 border rounded-full font-semibold text-sm"
              required
            />
            <div className="absolute top-3 left-8">
              <User2 />
            </div>
          </div>
        </label>

        <label
          htmlFor="Nama Lengkap"
          className="flex flex-col gap-2 font-semibold text-base"
        >
          Email
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Tulis Email disini"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 px-16 mb-4 border rounded-full font-semibold text-sm"
              required
            />
            <div className="absolute top-3 left-8">
              <Mail />
            </div>
          </div>
        </label>

        <label
          htmlFor="Nomor WhatsApp"
          className="flex flex-col gap-2 font-semibold text-base"
        >
          Nomor WhatsApp
          <div className="flex relative items-center mb-4">
            <input
              type="tel"
              name="whatsapp"
              placeholder=""
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full py-3 px-24 border rounded-full font-semibold text-sm"
              required
            />
            <div className="flex gap-2 items-center absolute left-8 text-sm">
              <Phone size={20} />
              <span className="mr-2 font-semibold">+62</span>
            </div>
          </div>
        </label>

        <label
          htmlFor="Nama Lengkap"
          className="flex flex-col gap-2 font-semibold text-base"
        >
          Password
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 px-16 mb-4 border rounded-full font-semibold text-sm"
              required
            />
            <div className="absolute top-2 left-8">
              <LockKeyhole />
            </div>
          </div>
        </label>

        <div className="flex items-center gap-2 mb-4 text-sm">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="w-6 h-6 cursor-pointer"
          />
          <p>
            By continuing, you agree to
            <span className="font-medium">Tutormy.id Term</span> and{" "}
            <span className="font-medium">Use and Privacy Policy</span>.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blu-400 text-white py-3 rounded-2xl hover:bg-blu-350 transition cursor-pointer"
        >
          Buat Akun
        </button>

        <p className="text-center font-semibold mt-4 text-sm">
          Sudah punya akun?
          <a href="/signin" className="ml-2 text-blu-350">
            Masuk Sekarang
          </a>
        </p>
      </form>
    </div>
  );
}

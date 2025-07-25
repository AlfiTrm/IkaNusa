"use client";

import Image from "next/image";
import logo from "@/assets/img/logo/ikanusalogo.webp";
import { Mail, Phone, User2 } from "lucide-react";
import PasswordInput from "@/shared/components/ui/PasswordInput";
import { useSignUp } from "../hooks/useSignup";

export default function SignUp() {
  const { formData, handleChange, handleSubmit } = useSignUp();

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
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
          htmlFor="fullName"
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
          htmlFor="email"
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
          htmlFor="whatsapp"
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

        <PasswordInput
          name="password"
          placeholder="*********"
          value={formData.password}
          onChange={handleChange}
          required
          label="Password"
          className="mb-2"
          showValidation={true}
          minLength={8}
        />

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
            <span className="font-medium"> Tutormy.id Term</span> and{" "}
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
    </main>
  );
}

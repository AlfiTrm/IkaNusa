"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/img/logo/ikanusalogo.webp";
import { Mail } from "lucide-react";
import { loginUser } from "@/api/services/users/login";
import PasswordInput from "@/shared/components/ui/PasswordInput";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      
      const data = await loginUser(payload);
      console.log("Login success:", data);
      
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        
        window.dispatchEvent(new Event('storage'));
        
        alert("Berhasil login!");
        
        router.push("/home");
      } else {
        alert("Login berhasil tapi tidak mendapat token!");
      }
      
    } catch (err) {
      console.error("Login failed:", err);
      alert("Email atau password salah!");
    } finally {
      setIsLoading(false);
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
          Login
        </h2>
        
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
              disabled={isLoading}
              className="w-full py-3 px-16 mb-4 border rounded-full font-semibold text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
            <div className="absolute top-3 left-8">
              <Mail />
            </div>
          </div>
        </label>
        
        <PasswordInput
          name="password"
          placeholder="*********"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
          label="Password"
        />
        
        <div className="flex items-center justify-between mb-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              disabled={isLoading}
              className="w-4 h-4 disabled:cursor-not-allowed"
            />
            Ingat saya
          </label>
          <a href="#" className="text-blu-350 font-semibold hover:text-blu-400 transition-colors">
            Lupa Password?
          </a>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blu-400 text-white py-3 rounded-2xl hover:bg-blu-350 disabled:bg-gray-300 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sedang Login...
            </>
          ) : (
            "Login"
          )}
        </button>
        
        <p className="text-center font-semibold mt-4 text-sm">
          Belum punya akun?
          <a href="/signup" className="ml-2 text-blu-350 hover:text-blu-400 transition-colors">
            Daftar Sekarang
          </a>
        </p>
      </form>
    </div>
  );
}
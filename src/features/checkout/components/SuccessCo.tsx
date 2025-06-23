"use client";
import { X } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/img/logo/ikanusalogo.webp";
import pembayaran from "@/assets/img/checkout/Payment.webp";

interface CheckoutSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
  orderTotal: number;
}

export default function SuccessCo({
  isOpen,
  onClose,
  onNavigateHome,
  orderTotal,
}: CheckoutSuccessPopupProps) {
  console.log(orderTotal);
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onNavigateHome();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onNavigateHome]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center">
            <div className="w-40  flex text-center justify-center items-center">
              <Image src={logo} alt="logo"></Image>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
            Pembayaran Berhasil!
          </h2>

          <p className="text-gray-600 mb-4">
            Pembayaran belanja anda telah berhasil dilakukan cek kembali progres
            pengantaran barang anda
          </p>
          <div className="flex justify-center">
            <div className="w-50 flex items-center animate-pulse">
              <Image src={pembayaran} alt="pembayaran"></Image>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onNavigateHome}
            className="w-full bg-blu-350 text-white py-3 rounded-xl font-medium hover:bg-blu-400 cursor-pointer transition"
          >
            Kembali ke Beranda
          </button>

          <p className="text-xs text-gray-500 text-center">
            Otomatis akan kembali ke beranda dalam 5 detik...
          </p>
        </div>
      </div>
    </div>
  );
}

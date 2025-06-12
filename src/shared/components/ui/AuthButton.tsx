"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface AuthButtonsProps {
  onAction?: () => void;
  variant?: "desktop" | "mobile";
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onAction, variant = "desktop" }) => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin');
    onAction?.();
  };

  const handleSignUp = () => {
    router.push('/signup');
    onAction?.();
  };

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={handleSignUp}
          className="w-full h-10 bg-transparent border border-blu-250 text-blu-250 flex items-center justify-center rounded-full font-medium hover:bg-blu-50 transition-colors"
        >
          Daftar
        </button>
        <button
          onClick={handleSignIn}
          className="w-full h-10 bg-blu-250 text-white flex items-center justify-center rounded-full font-medium hover:bg-blu-300 transition-colors"
        >
          Masuk
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSignUp}
        className="px-4 py-2 bg-transparent border border-blu-250 text-blu-250 rounded-full font-medium hover:bg-blu-50 transition-colors"
      >
        Daftar
      </button>
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blu-250 text-white rounded-full font-medium hover:bg-blu-300 transition-colors"
      >
        Masuk
      </button>
    </div>
  );
};

export default AuthButtons;
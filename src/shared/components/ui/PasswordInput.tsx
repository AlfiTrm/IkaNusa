"use client";
import { useState } from "react";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  className?: string;
  showValidation?: boolean;
  minLength?: number;
}

export default function PasswordInput({
  name,
  placeholder = "*********",
  value,
  onChange,
  disabled = false,
  required = false,
  label = "Password",
  className = "",
  showValidation = false,
  minLength = 8,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordTooShort = showValidation && value.length > 0 && value.length < minLength;

  return (
    <label
      htmlFor={name}
      className={`flex flex-col gap-2 font-semibold text-base ${className}`}
    >
      {label}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full py-3 px-16 pr-20 mb-2 border rounded-full font-semibold text-sm disabled:bg-gray-100 disabled:cursor-not-allowed ${
            isPasswordTooShort ? "border-red-500 focus:border-red-500" : ""
          }`}
        />
        <div className="absolute top-2 left-8">
          <LockKeyhole className={isPasswordTooShort ? "text-red-500" : ""} />
        </div>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className="absolute top-2 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-500" />
          ) : (
            <Eye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      {isPasswordTooShort && (
        <p className="text-red-500 text-sm -mt-2 mb-2 px-4">
          Password harus minimal {minLength} karakter
        </p>
      )}
    </label>
  );
}
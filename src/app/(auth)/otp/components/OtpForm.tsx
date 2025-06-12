"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserIdFromToken, resendOTP, verifyOTP } from '@/api/services/users/otp';

interface OTPInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement | null) => void;
  disabled: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ 
  value, 
  onChange, 
  onKeyDown, 
  inputRef, 
  disabled 
}) => (
  <input
    ref={inputRef}
    type="text"
    maxLength={1}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    disabled={disabled}
    className="w-12 h-12 text-center text-lg font-semibold border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
  />
);

const OTPPage: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleInputChange = (index: number, value: string): void => {
    if (!/^\d*$/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      alert('Mohon masukkan kode OTP yang lengkap');
      return;
    }

    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Session tidak valid. Silakan login ulang.');
      router.push('/signin');
      return;
    }

    setIsLoading(true);
    
    try {
      await verifyOTP({
        user_id: userId,
        otp_code: otpCode
      });
      
      router.push('/home');
      
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async (): Promise<void> => {
    if (!canResend) return;
    
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Session tidak valid. Silakan login ulang.');
      router.push('/signin');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resendOTP({
        user_id: userId
      });
      
      setCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      
      inputRefs.current[0]?.focus();
      
    } catch (error) {
      console.error('Failed to resend OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/signin');
  };

  const isOtpComplete = otp.every((digit: string) => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-15 translate-x-48 translate-y-48"></div>
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-blue-100 rounded-full opacity-30 -translate-x-24"></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">IkaNusa</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Autentikasi Akun
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Masukkan kode verifikasi yang telah dikirimkan pada akun emailmu
              </p>
            </div>

            <form className="flex justify-center space-x-3 mb-8">
              {otp.map((digit: string, index: number) => (
                <OTPInput
                  key={index}
                  value={digit}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    handleInputChange(index, e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => 
                    handleKeyDown(index, e)
                  }
                  inputRef={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  disabled={isLoading}
                />
              ))}
            </form>

            <button
              onClick={handleSubmit}
              disabled={!isOtpComplete || isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors mb-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memverifikasi...
                </div>
              ) : (
                'Kirim kode Verifikasi'
              )}
            </button>

            <div className="text-center mb-6">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors disabled:opacity-50"
                >
                  Kirim ulang kode OTP
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Kirim ulang dalam {countdown} detik
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              Tidak menerima kode? Periksa folder spam atau hubungi support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
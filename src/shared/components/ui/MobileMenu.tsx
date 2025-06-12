"use client";
import React from "react";
import { ShoppingCart, Bell, StoreIcon, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserData } from "../../types/userData";
import SearchBar from "./SearchBar";
import { getDisplayName, getSecondaryInfo, getUserInitials } from "@/shared/utils/userProfile";
import AuthButtons from "./AuthButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onSignOut: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  user,
  isAuthenticated,
  isLoading,
  onSignOut
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignOut = () => {
    onSignOut();
    onClose();
    router.push('/home');
    alert('Berhasil keluar dari akun');
  };

  return (
    <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex flex-col gap-4 p-4 lg:hidden z-50">
      <SearchBar onSubmit={onClose} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer transition-colors">
          <ShoppingCart size={20} />
          <span>Keranjang</span>
        </div>
        <div className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer transition-colors">
          <Bell size={20} />
          <span>Notifikasi</span>
        </div>
        <div className="flex items-center gap-3 py-2 hover:bg-gray-50 rounded-lg px-2 cursor-pointer transition-colors">
          <StoreIcon size={20} />
          <span>Toko</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-200">
        {isLoading ? (
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3"></div>
            </div>
          </div>
        ) : isAuthenticated && user ? (
          <>
            <div className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 bg-blu-250 rounded-full flex items-center justify-center text-white font-semibold">
                {getUserInitials(user)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {getDisplayName(user)}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {getSecondaryInfo(user)}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                router.push('/profile');
                onClose();
              }}
              className="w-full h-10 bg-gray-100 text-gray-700 flex items-center justify-center gap-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              <User size={16} />
              Profil Saya
            </button>
            
            <button
              onClick={handleSignOut}
              className="w-full h-10 bg-red-500 text-white flex items-center justify-center gap-2 rounded-full font-medium hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </>
        ) : (
          <AuthButtons variant="mobile" onAction={onClose} />
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
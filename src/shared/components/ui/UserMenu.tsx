"use client";
import React from "react";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserData } from "../../types/userData";
import { getDisplayName, getSecondaryInfo, getUserInitials } from "@/shared/utils/userProfile";

interface UserMenuProps {
  user: UserData;
  isOpen: boolean;
  onToggle: () => void;
  onSignOut: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, isOpen, onToggle, onSignOut }) => {
  const router = useRouter();

  const handleSignOut = () => {
    onSignOut();
    onToggle();
    router.push('/home');
    alert('Berhasil keluar dari akun');
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
      >
        <div className="w-8 h-8 bg-blu-250 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {getUserInitials(user)}
        </div>
        <span className="font-medium text-gray-700 max-w-32 truncate">
          {getDisplayName(user)}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
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
          </div>
          
          <div className="py-1">
            <button
              onClick={() => {
                router.push('/profile');
                onToggle();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
            >
              <User size={16} />
              <span>Profil Saya</span>
            </button>
          </div>
          
          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
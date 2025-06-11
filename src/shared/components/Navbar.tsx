"use client";
import React, { useRef, useState, useEffect } from "react";
import { Bell, Search, ShoppingCart, StoreIcon, Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import ikanusalogo from "../../assets/img/logo/ikanusalogo.webp";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/token"; // Adjust path as needed

interface UserData {
  UserID: string;
  Username?: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        setIsLoading(true);
        const decoded = decodeToken();
        
        if (decoded) {
          // Set the entire decoded object as user data
          setUser(decoded);
          setIsAuthenticated(true);
          console.log("Decoded user data:", decoded);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSearchClick = () => {
    setIsMenuOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 200);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?query=${encodeURIComponent(keyword.trim())}`);
      setIsMenuOpen(false); // Close mobile menu after search
    }
  };

  const handleSignOut = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    
    // Redirect to home or signin page
    router.push('/');
    
    // Optional: Show success message
    alert('Berhasil keluar dari akun');
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  // Get display name for user with better priority logic
  const getDisplayName = (userData: UserData): string => {
    if (!userData) return "User";
    
    // Priority: name > Username > email (before @) > UserID
    if (userData.name && userData.name.trim()) {
      return userData.name.trim();
    }
    
    if (userData.Username && userData.Username.trim()) {
      return userData.Username.trim();
    }
    
    if (userData.email && userData.email.trim()) {
      return userData.email.split('@')[0];
    }
    
    if (userData.UserID) {
      return `User ${userData.UserID.slice(-4)}`;
    }
    
    return "User";
  };

  // Get user initials for avatar
  const getUserInitials = (userData: UserData): string => {
    const displayName = getDisplayName(userData);
    const words = displayName.split(' ');
    
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    
    return displayName.charAt(0).toUpperCase();
  };

  // Get secondary info for dropdown
  const getSecondaryInfo = (userData: UserData): string => {
    if (!userData) return "";
    
    // Show email if available, otherwise show UserID
    if (userData.email && userData.email.trim()) {
      return userData.email;
    }
    
    if (userData.UserID) {
      return `ID: ${userData.UserID.slice(-8)}`;
    }
    
    return "";
  };

  return (
    <nav className="bg-white border-b border-netral-100 z-50">
      <main className="h-16 w-full flex items-center justify-between mycontainer text-sm font-normal relative">
        <section className="flex items-center w-44 mr-2">
          <Image src={ikanusalogo} alt="logo" className="w-44 h-auto" />
        </section>

        <section className="hidden lg:flex font-semibold items-center gap-6">
          <h2 className="text-lg cursor-pointer">Kategori</h2>

          <form onSubmit={handleSearch} className="relative">
            <input
              placeholder="Cari di SeaShop"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="2xl:w-180 w-72 h-10 border px-10 border-netral-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-blu-250 focus:border-transparent"
            />
            <button type="submit" className="absolute top-2 left-2 cursor-pointer text-netral-200 hover:text-blu-250 transition-colors">
              <Search />
            </button>
          </form>

          <div className="flex gap-5">
            <ShoppingCart className="cursor-pointer hover:text-blu-250 transition-colors" />
            <Bell className="cursor-pointer hover:text-blu-250 transition-colors" />
            <div className="flex items-center gap-2 cursor-pointer hover:text-blu-250 transition-colors">
              <StoreIcon />
              <p>Toko</p>
            </div>
          </div>
        </section>

        {/* Desktop Auth Section */}
        <section className="hidden lg:flex items-center gap-2">
          {isLoading ? (
            <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-8 h-8 bg-blu-250 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {getUserInitials(user)}
                </div>
                <span className="font-medium text-gray-700 max-w-32 truncate">
                  {getDisplayName(user)}
                </span>
                <ChevronDown size={16} className={`transition-transform text-gray-400 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blu-250 rounded-full flex items-center justify-center text-white font-semibold">
                        {getUserInitials(user)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{getDisplayName(user)}</p>
                        <p className="text-sm text-gray-500 truncate">{getSecondaryInfo(user)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setIsUserMenuOpen(false);
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
          ) : (
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
          )}
        </section>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button className="cursor-pointer hover:text-blu-250 transition-colors" onClick={handleSearchClick}>
            <Search size={22} />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer hover:text-blu-250 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex flex-col gap-4 p-4 lg:hidden z-50">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                placeholder="Cari di SeaShop"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-10 border px-10 border-netral-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-blu-250 focus:border-transparent"
              />
              <button type="submit" className="absolute top-2 left-2 text-netral-200 hover:text-blu-250 transition-colors">
                <Search />
              </button>
            </form>

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

            {/* Mobile Auth Section */}
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
                      <p className="font-medium text-gray-800 truncate">{getDisplayName(user)}</p>
                      <p className="text-sm text-gray-500 truncate">{getSecondaryInfo(user)}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setIsMenuOpen(false);
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
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      handleSignUp();
                      setIsMenuOpen(false);
                    }}
                    className="w-full h-10 bg-transparent border border-blu-250 text-blu-250 flex items-center justify-center rounded-full font-medium hover:bg-blu-50 transition-colors"
                  >
                    Daftar
                  </button>
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsMenuOpen(false);
                    }}
                    className="w-full h-10 bg-blu-250 text-white flex items-center justify-center rounded-full font-medium hover:bg-blu-300 transition-colors"
                  >
                    Masuk
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Overlay to close dropdowns when clicking outside */}
      {(isUserMenuOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-10"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
"use client";
import React, { useRef, useState } from "react";
import { Bell, Search, ShoppingCart, StoreIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import ikanusalogo from "../../assets/img/logo/ikanusalogo.webp";
import { NavbarProps } from "../types/NavbarProps";
import { useAuth } from "../hooks/useAuth";
import SearchBar from "./ui/SearchBar";
import UserMenu from "./ui/UserMenu";
import AuthButtons from "./ui/AuthButton";
import MobileMenu from "./ui/MobileMenu";
import Link from "next/link";

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  const handleSearchClick = () => {
    setIsMenuOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 200);
  };

  const closeAllMenus = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full bg-white border-b border-netral-100 z-50 ${className}`}
    >
      <main className="h-16 w-full flex items-center justify-between mycontainer text-sm font-normal relative">
        <Link
          href={"/home"}
          className="flex items-center w-44 mr-2 cursor-pointer"
        >
          <Image src={ikanusalogo} alt="logo" className="w-44 h-auto" />
        </Link>

        <section className="hidden lg:flex font-semibold items-center gap-6">
          <h2 className="text-lg cursor-pointer">Kategori</h2>

          <SearchBar className="2xl:w-180 w-72" />

          <div className="flex gap-5">
            <a href="/cart">
              <ShoppingCart className="cursor-pointer hover:text-blu-250 transition-colors" />
            </a>
            <Bell className="cursor-pointer hover:text-blu-250 transition-colors" />
            <div className="flex items-center gap-2 cursor-pointer hover:text-blu-250 transition-colors">
              <StoreIcon />
              <p>Toko</p>
            </div>
          </div>
        </section>

        <section className="hidden lg:flex items-center gap-2">
          {isLoading ? (
            <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          ) : isAuthenticated && user ? (
            <UserMenu
              user={user}
              isOpen={isUserMenuOpen}
              onToggle={() => setIsUserMenuOpen(!isUserMenuOpen)}
              onSignOut={signOut}
            />
          ) : (
            <AuthButtons />
          )}
        </section>

        <div className="lg:hidden flex items-center gap-3">
          <button
            className="cursor-pointer hover:text-blu-250 transition-colors"
            onClick={handleSearchClick}
          >
            <Search size={22} />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer hover:text-blu-250 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          user={user}
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          onSignOut={signOut}
        />
      </main>

      {(isUserMenuOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-40"
          onClick={closeAllMenus}
        />
      )}
    </nav>
  );
};

export default Navbar;

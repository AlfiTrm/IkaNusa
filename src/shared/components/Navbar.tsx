"use client";
import React, { useRef, useState } from "react";
import { Bell, Search, ShoppingCart, StoreIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import ikanusalogo from "../../assets/img/logo/ikanusalogo.webp";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

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
    }
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
              className="2xl:w-180 w-72 h-10 border px-10 border-netral-250 rounded-lg"
            />
            <button type="submit" className="absolute top-2 left-2 cursor-pointer text-netral-200">
              <Search />
            </button>
          </form>

          <div className="flex gap-5">
            <ShoppingCart className="cursor-pointer" />
            <Bell className="cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <StoreIcon />
              <p>Toko</p>
            </div>
          </div>
        </section>

        <section className="hidden lg:flex items-center gap-2">
          <p className="w-24 h-8 bg-transparent flex items-center justify-center rounded-full font-medium">
            Daftar
          </p>
          <p className="w-24 h-8 bg-blu-250 flex items-center justify-center rounded-full text-white font-medium">
            Masuk
          </p>
        </section>

        <div className="lg:hidden flex items-center gap-3">
          <button className="cursor-pointer" onClick={handleSearchClick}>
            <Search size={22} />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-4 lg:hidden z-50">
            <form className="relative">
              <input
                ref={searchInputRef}
                placeholder="Cari di SeaShop"
                className="w-full h-10 border px-10 border-netral-250 rounded-lg"
              />
              <div className="absolute top-2 left-2 text-netral-200">
                <Search />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <ShoppingCart />
              <span>Keranjang</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell />
              <span>Notifikasi</span>
            </div>
            <div className="flex items-center gap-2">
              <StoreIcon />
              <span>Toko</span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <p className="w-full h-10 bg-transparent border border-blu-250 text-blu-250 flex items-center justify-center rounded-full font-medium">
                Daftar
              </p>
              <p className="w-full h-10 bg-blu-250 text-white flex items-center justify-center rounded-full font-medium">
                Masuk
              </p>
            </div>
          </div>
        )}
      </main>
    </nav>
  );
};

export default Navbar;

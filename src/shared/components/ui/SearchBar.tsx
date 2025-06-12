"use client";
import React, { useState, useRef, forwardRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSubmit?: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className = "", placeholder = "Cari di SeaShop", onSubmit }, ref) => {
    const [keyword, setKeyword] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (keyword.trim()) {
        router.push(`/search?query=${encodeURIComponent(keyword.trim())}`);
        onSubmit?.();
      }
    };

    return (
      <form onSubmit={handleSearch} className={`relative ${className}`}>
        <input
          ref={ref}
          placeholder={placeholder}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full h-10 border px-10 border-netral-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-blu-250 focus:border-transparent"
        />
        <button 
          type="submit" 
          className="absolute top-2 left-2 cursor-pointer text-netral-200 hover:text-blu-250 transition-colors"
        >
          <Search />
        </button>
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;

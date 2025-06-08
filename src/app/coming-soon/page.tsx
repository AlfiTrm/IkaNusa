"use client";

import React from "react";
import { Fish } from "lucide-react";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blu-400 via-blu-250 to-blu-150 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700"></div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blu-400 to-blu-250 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-6 border border-white/20">
              <Fish size={48} className="text-white animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-white via-blu-150 to-blu-250 bg-clip-text text-transparent animate-gradient-x">
            Coming Soon
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl leading-relaxed">
          Kami sedang mempersiapkan sesuatu yang luar biasa untuk Anda.
          Bersiaplah untuk pengalaman yang mengagumkan!
        </p>
      </div>
    </div>
  );
};

export default Page;

import React from "react";

interface LoadingProductProps {
  count?: number;
}

const LoadingProduct: React.FC<LoadingProductProps> = ({ count = 6 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <section
          key={index}
          className="w-full max-w-[160px] sm:max-w-[200px] mx-auto"
        >
          <main className="bg-white shadow rounded-lg animate-pulse">
            <div className="relative w-full h-32 sm:h-40 bg-netral-100" />

            <div className="p-2 space-y-2">
              <div className="h-3 bg-netral-100 rounded w-full" />
              <div className="h-4 bg-netral-100 rounded w-1/2" />

              <div className="flex items-center gap-1 text-xs mt-1">
                <div className="w-3 h-3 bg-yelo-100 rounded-full" />
                <div className="h-2 bg-netral-100 rounded w-6" />
                <span className="text-netral-100 text-[10px]">•</span>
                <div className="h-2 bg-netral-100 rounded w-10" />
              </div>

              <div className="flex items-center gap-1 text-xs">
                <div className="w-3 h-3 bg-blue-200 rounded-full" />
                <div className="h-2 bg-netral-100 rounded w-20" />
              </div>
            </div>
          </main>
        </section>
      ))}
    </>
  );
};

export default LoadingProduct;

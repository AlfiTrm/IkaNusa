import Link from "next/link";
import Image from "next/image";
import notpon from "@/assets/img/not-found/notpon.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                404 Not Found
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Halaman yang kamu cari tidak dapat ditemukan. Mungkin halaman
                sudah dipindahkan, dihapus, atau URL yang kamu masukkan salah.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 ">
              <div className="w-80 h-80 bg-blu-350 rounded-full relative"></div>
              <div className="w-90 h-90 bg-transparent border-2 border-dashed border-blue-300 animate-spin delay-700 rounded-full absolute top-0 -left-4 -translate-y-4"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center">
              <div className="w-100 h-100 relative">
                <Image src={notpon} alt="gambar"></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

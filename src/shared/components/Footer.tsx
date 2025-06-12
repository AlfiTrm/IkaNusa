import React from "react";
import Image from "next/image";
import ikanusalogo from "../../assets/img/logo/ikanusalogo.webp";
import { Building, Mail, PhoneCall } from "lucide-react";
import { footlink } from "../data/footlink";
import FootList from "./Footlist";

const Footer = () => {
  return (
    <footer className="w-full h-fit pb-10 mt-20 bg-white border-t border-gray-200 text-sm">
      <div className="mycontainer flex flex-col md:flex-row flex-wrap justify-between gap-10 px-6 pt-10">
        
        <section className="min-w-[200px]">
          <h1 className="font-medium mb-2">Tentang Kami</h1>
          <ul className="flex flex-col gap-1">
            {footlink.map((item) => (
              <FootList key={item.id} item={item} />
            ))}
          </ul>
        </section>

        {/* Kategori dan Bantuan */}
        <section className="flex flex-col gap-4 min-w-[200px]">
          <div className="w-36">
            <Image src={ikanusalogo} alt="logo" />
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h1 className="font-medium mb-2">Beli</h1>
              <ul className="flex flex-col gap-1">
                <li>Ikan Laut</li>
                <li>Hasil Laut</li>
                <li>Ikan Tawar</li>
                <li>Hasil Tambak</li>
              </ul>
            </div>
            <div>
              <h1 className="font-medium mb-2">Bantuan dan Panduan</h1>
              <ul className="flex flex-col gap-1">
                <li>IkaNusa Care</li>
                <li>Syarat dan Ketentuan</li>
                <li>Kebijakan Privasi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Kontak */}
        <section className="min-w-[200px]">
          <h1 className="font-medium mb-2">IkaNusa</h1>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-start gap-2">
              <Building size={18} className="mt-1" />
              <p>Jl. Ilmu No. 123, Jakarta, Indonesia 10230</p>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={18} className="mt-1" />
              <p>ikanusa@gmail.com</p>
            </div>
            <div className="flex items-start gap-2">
              <PhoneCall size={18} className="mt-1" />
              <p>+62 812 3456 7890</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Image from "next/image";
import bg from "../../../assets/img/auth/sidePict.webp";

const page = () => {
  return (
    <main >
      <div className="relative">
        <Image
          src={bg}
          alt="bg"
          className="w-full hidden lg:flex object-cover h-screen"
        ></Image>
      </div>
    </main>
  );
};

export default page;

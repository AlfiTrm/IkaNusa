import React from 'react'
import banner1 from "@/assets/img/discount/banner/banner1.webp"
import banner2 from "@/assets/img/discount/banner/banner2.webp"
import Image from 'next/image'

const DiscountBanner = () => {
  return (
    <section className='flex flex-col lg:flex-row gap-2 cursor-pointer'>
      <Image src={banner1} alt='banner' className='object-contain lg:w-1/2 w-full hover:scale-101 transition'></Image>
      <Image src={banner2} alt='banner' className='object-contain lg:w-1/2 w-full hover:scale-101 transition'></Image>
    </section>
  )
}

export default DiscountBanner

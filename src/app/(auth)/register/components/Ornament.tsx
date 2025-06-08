import React from 'react'
import Image from 'next/image'
import ornament1 from "@/assets/img/auth/ornament1.webp"
import ornament2 from "@/assets/img/auth/ornament2.webp"

const Ornament = () => {
  return (
    <div >
      <div className='animate-pulse'>
        <Image src={ornament1} alt='ornament' className='w-30 translate-y-40'></Image>
        <Image src={ornament2} alt='ornament' className='w-70 translate-y-20'></Image>
      </div>
    </div>
  )
}

export default Ornament

import React from 'react'
import Image from 'next/image'
import ornament3 from "@/assets/img/auth/ornament3.webp"

const Ornament = () => {
  return (
    <div>
      <div className='animate-pulse w-full'>
        <Image src={ornament3} alt='ornament' className='w-70'></Image>
      </div>
    </div>
  )
}

export default Ornament

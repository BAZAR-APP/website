import Image from 'next/image'
import React from 'react'
import LogoImg from '../../public/images/Logo.svg'

const Logo = () => {
  return (
    <div>
      <Image src={LogoImg} alt="Logo" className='sm:w-auto w-26' />
    </div>
  )
}

export default Logo

import Image from 'next/image'
import React from 'react'
import LogoImg from '../../../public/images/Logo.svg'

const Logo = () => {
  return (
    <div>
      <Image src={LogoImg} alt="Logo" />
    </div>
  )
}

export default Logo

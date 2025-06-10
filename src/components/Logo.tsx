import Image from 'next/image'
import React from 'react'
import LogoImg from '../../public/images/Logo.svg'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image src={LogoImg} alt="Logo" className='w-[150px] h-[53px]' />
    </Link>
  )
}

export default Logo

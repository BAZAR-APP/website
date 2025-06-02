import * as React from 'react'
import Logo from './Logo'
import { QuickLinks } from './QuickLinks'
import { ContactInfo } from './ContactInfo'
import FooterImg from '../../public/images/FooterTree.svg'
import Image from 'next/image'
import { Text } from '@radix-ui/themes'

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="flex flex-col m-4 md:m-10 p-8 md:p-16 gap-8 bg-[#F9FAFB] rounded-[20px] md:rounded-[40px]">
        <div className="flex flex-col md:flex-row w-full xl:justify-evenly justify-between flex-wrap lg:gap-0 gap-8">
          <div className="flex flex-col gap-5 max-w-full lg:max-w-[350px]">
            <Logo />
            <Text className="text-[16px] leading-[19px] font-normal text-[#484A4C] pr-0 md:pr-2">
              We make chalet booking in Kuwait easy, reliable, and rewarding. From weekend escapes
              to special occasions, our platform connects you to the best stays with flexible
              options, add-ons, and a loyalty program designed just for you.
            </Text>
          </div>

          <QuickLinks />
          <ContactInfo />

          <div className="max-[1221px]:hidden md:w-auto justify-end">
            <Image
              src={FooterImg}
              alt="Footer Tree Illustration"
              width={290}
              height={260}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </footer>
      <div className="w-full text-center py-9">
        <Text className="text-[14px] leading-4 font-normal text-[#9EA0A2] text-center">
          © 2025 Sea Villa Chalet . All rights reserved.
        </Text>
      </div>
    </>
  )
}

export default Footer

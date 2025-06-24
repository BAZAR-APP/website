import * as React from 'react';
import Logo from './Logo';
import { QuickLinks } from './QuickLinks';
import { ContactInfo } from './ContactInfo';
import { Text } from '@radix-ui/themes';

export const Footer: React.FC = () => {
  return (
    <div className='bg-[#FDFDFE] pt-6'>
      <footer className="flex flex-col m-4 md:m-12 p-4 md:p-16 gap-8 bg-[#F9FAFB] rounded-[20px] md:rounded-[40px]">
        <div className="flex flex-col md:flex-row w-full justify-between flex-wrap gap-8">
          <div className="flex flex-col gap-5 max-w-full lg:max-w-[350px]">
            <Logo />
            <Text className="text-[16px] leading-[19px] font-normal text-[#484A4C] md:pr-2">
              We make chalet booking in Kuwait easy, reliable, and rewarding. From weekend escapes
              to special occasions, our platform connects you to the best stays with flexible
              options, add-ons, and a loyalty program designed just for you.
            </Text>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-[48px] w-full md:w-auto">
            <QuickLinks />
            <ContactInfo />
          </div>
        </div>
      </footer>
      <div className="w-full text-center py-9">
        <Text className="text-[14px] leading-4 font-normal text-[#9EA0A2]">
          © 2025 Sea Villa Chalet . All rights reserved.
        </Text>
      </div>
    </div>
  );
};

export default Footer;
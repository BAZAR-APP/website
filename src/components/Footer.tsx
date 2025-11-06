import * as React from 'react';
import Logo from './Logo';
import { QuickLinks } from './QuickLinks';
import { ContactInfo } from './ContactInfo';
import { Text } from '@radix-ui/themes';

interface FooterProps {
  messages: {
    description: string;
    copyright: string;
    quick_links_title: string;
    quick_links: Record<string, string>;
    contact_title: string;
    address: string;
  };
}

export const Footer: React.FC<FooterProps> = ({ messages }) => {
  return (
    <div className='bg-[#FDFDFE] pt-6'>
      <footer className="flex flex-col m-4 md:m-12 p-4 md:p-16 gap-8 bg-[#F9FAFB] rounded-[20px] md:rounded-[40px]">
        <div className="flex flex-col md:flex-row w-full justify-between flex-wrap gap-8">
          <div className="flex flex-col gap-5 max-w-full lg:max-w-[350px]">
            <Logo />
            <Text className="text-[16px] leading-[19px] font-normal text-[#484A4C] md:pr-2">
              {messages?.description}
            </Text>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-[48px] w-full md:w-auto">
            <QuickLinks messages={messages} />
            <ContactInfo messages={messages} />
          </div>
        </div>
      </footer>
      <div className="w-full text-center py-9">
        <Text className="text-[14px] leading-4 font-normal text-[#9EA0A2]">
          {messages?.copyright}
        </Text>
      </div>
    </div>
  );
};

export default Footer;
import React from 'react';
import CommonButton from '@/components/Button/Button';
import Image from 'next/image';

interface VerifiedProps {
    title: string;
    message: string;
    buttonLabel: string;
    onButtonClick: () => void;
    iconSrc?: string;
}

const Verified: React.FC<VerifiedProps> = ({
    title,
    message,
    buttonLabel,
    onButtonClick,
    iconSrc = '/images/Verified.svg',
}) => {
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className='max-w-[360px] h-[90vh] overflow-y-auto flex flex-col gap-[24px]'>
                <Image src="/images/Logo.svg" alt="Logo" className='w-[150px] h-[48px] mb-[80px]' />
                <div className='flex flex-col gap-[12px]'>
                    {iconSrc && <img src={iconSrc} alt="Status Icon" className='w-[120px] h-[120px]' />}
                    <h2 className='!text-primary font-600 text-[39px]'>{title}</h2>
                    <p className='!text-secondary font-600 text-[16px]'>{message}</p>
                </div>
                <CommonButton
                    onClick={onButtonClick}
                    className="w-[360px] h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg"
                >
                    {buttonLabel}
                </CommonButton>
            </div>
        </div>
    );
};

export default Verified;

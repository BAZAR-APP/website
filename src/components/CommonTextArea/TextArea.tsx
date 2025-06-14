import { Row } from '@radix-ui/themes/components/table';
import React from 'react';

type ReusableTextAreaProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    width?: string;
    height?: string;
    placeholder?: string;
    row: number;
};

const ReusableTextArea: React.FC<ReusableTextAreaProps> = ({
    label,
    value,
    onChange,
    width = 'w-[330px]',
    height = 'h-[117px]',
    placeholder = 'Enter text...',
    row,
}) => {
    return (
        <div className={`flex ${width} ${height} flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[52]`}>
            <span className="h-[17px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#19191a] relative text-left overflow-hidden whitespace-nowrap z-[53]">
                {label}
            </span>
            <div className="flex w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] items-start shrink-0 flex-nowrap bg-[#f9fafb] rounded-[8px] relative overflow-hidden z-[54]">
                <textarea
                    className="w-full h-full resize-none bg-transparent border-none outline-none font-['Inter'] text-[14px] font-normal leading-[16.943px] text-[#484a4c] z-[55]"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={row}
                />
            </div>
        </div>
    );
};

export default ReusableTextArea;

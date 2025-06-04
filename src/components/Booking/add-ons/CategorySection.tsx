import React, { useState } from 'react';
import { AddOnCard } from './AddOnCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  items: Array<{
    icon: string;
    label: string;
    price: number;
    notice?: string;
    quantity?: number;
  }>;
  onItemAdd?: (index: number) => void;
  onQuantityChange?: (index: number, quantity: number) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  items,
  onItemAdd,
  onQuantityChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-start relative">
      <div className="flex w-[375px] flex-col items-start gap-4 relative pt-2 pb-0 sm:px-4 max-md:w-full max-md:max-w-screen-md max-sm:w-full max-sm:max-w-full">
        <div className="flex justify-center items-center gap-6 self-stretch relative">
          <div className="flex justify-between items-center flex-[1_0_0] relative">
            <div className="text-[#19191A] text-base font-medium leading-6 relative">
              {title}
            </div>
            <button
              onClick={toggleOpen}
              className="flex items-center justify-center p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label={isOpen ? "Collapse section" : "Expand section"}
            >
              {isOpen ? (
                <ChevronUp className="w-[18px] h-[18px] text-[#29397E]" />
              ) : (
                <ChevronDown className="w-[18px] h-[18px] text-[#29397E]" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="flex w-[375px] flex-col items-start gap-4 relative sm:px-4 py-3 max-md:w-full max-md:max-w-screen-md max-sm:w-full max-sm:max-w-full">
          <div className="flex w-[344px] flex-col items-start gap-4 relative max-sm:w-full">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col justify-center items-start gap-6 self-stretch relative">
                <AddOnCard
                  {...item}
                  onAdd={() => onItemAdd?.(index)}
                  onQuantityChange={
                    quantity => onQuantityChange?.(index, quantity)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
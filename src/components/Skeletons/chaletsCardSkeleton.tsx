
import React from 'react';
import { Skeleton } from './Skeleton';

export const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="flex w-[300px] flex-col items-start gap-6 relative bg-gray-50 p-3 rounded-2xl max-md:w-full">
      <div className="flex h-[184px] justify-center items-center self-stretch relative rounded-xl">
        <Skeleton className="h-[184px] w-[276px] rounded-xl" />
      </div>
      
      <div className="flex flex-col items-start gap-5 self-stretch relative">
        <div className="flex items-start gap-6 self-stretch relative">
          <div className="flex flex-col items-start gap-2 flex-[1_0_0] relative">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex items-center gap-1 relative">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="w-8 h-8 rounded" />
        </div>
        
        <div className="flex flex-col items-start self-stretch relative gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        <div className="flex justify-end items-end gap-4 self-stretch relative">
          <div className="flex items-center gap-1 flex-[1_0_0] relative">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-end items-center gap-2 relative">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

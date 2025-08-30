import React from "react";
import { Skeleton } from "./skeleton";

export default function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='rounded-full w-[100px] h-3 md:w-[200px] md:h-[20px]' />
      <div className='flex md:gap-10 gap-5'>
        <Skeleton className='rounded-full lg:w-[196px] md:w-[100px] w-[64px] h-[64px] md:h-[100px] lg:h-[196px]' />
        <div className='flex flex-col gap-3 mt-6 md:mt-10'>
          <Skeleton className='rounded-full w-[140px] md:w-[200px] h-3 md:h-5' />
          <Skeleton className='rounded-full w-[100px] md:w-[140px] h-3 md:h-5' />
        </div>
      </div>
    </div>
  );
}

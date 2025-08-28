import React from "react";
import { Skeleton } from "./skeleton";

export default function ProfileSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='rounded-full w-[200px] h-[20px]' />
      <div className='flex gap-10'>
        <Skeleton className='rounded-full w-[196px] h-[196px]' />
        <div className='flex flex-col gap-3 mt-10'>
          <Skeleton className='rounded-full w-[200px] h-[20px]' />
          <Skeleton className='rounded-full w-[140px] h-[18px]' />
        </div>
      </div>
    </div>
  );
}

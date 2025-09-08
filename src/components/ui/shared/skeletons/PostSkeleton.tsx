import React from "react";
import { Skeleton } from "./skeleton";

export default function PostSkeleton() {
  return (
    <li className='lg:px-5 md:px-4 px-3 lg:py-3 py-2 border-border border rounded-md w-full max-w-[650px] flex gap-2 items-start'>
      <Skeleton className='h-7 min-w-7 md:h-12 md:w-12 rounded-full' />
      <div className='w-full flex flex-col gap-2'>
        <Skeleton className='h-4 w-[75%]' />
        <Skeleton className='h-4 w-[70%]' />
        <Skeleton className='md:h-[350px] h-[200px] w-[90%] rounded-md' />
      </div>
    </li>
  );
}

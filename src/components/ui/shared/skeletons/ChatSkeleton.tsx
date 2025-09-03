import React from "react";
import { Skeleton } from "./skeleton";

export default function ChatSkeleton() {
  return (
    <div className='flex items-center space-x-2 w-full border border-border rounded-md px-3 py-2'>
      <Skeleton className='md:h-10 h-8 w-8 md:w-10 rounded-full flex-shrink-0' />
      <div className='space-y-1 w-full'>
        <Skeleton className='h-2 w-[50%]' />
        <Skeleton className='h-2 w-[85%]' />
      </div>
    </div>
  );
}

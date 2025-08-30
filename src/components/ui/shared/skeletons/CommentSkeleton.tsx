import React from "react";
import { Skeleton } from "./skeleton";

export default function CommentSkeleton() {
  return (
    <div className='flex items-center space-x-4 self-center'>
      <Skeleton className='md:h-12 h-8 w-8 md:w-12 rounded-full flex-shrink-0' />
      <div className='space-y-1'>
        <Skeleton className='h-4 lg:w-[650px] md:w-[400px] w-[250px]' />
        <Skeleton className='h-4 lg:w-[500px] md:w-[300px] w-[200px]' />
      </div>
    </div>
  );
}

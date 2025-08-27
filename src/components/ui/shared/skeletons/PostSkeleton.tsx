import React from "react";
import { Skeleton } from "./skeleton";

export default function PostSkeleton() {
  return (
    <li className='px-5 py-3 border-border border rounded-md w-[700px] flex items-start space-x-4 '>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[550px]' />
        <Skeleton className='h-4 w-[500px]' />
        <Skeleton className='h-[350px] w-[550px] rounded-md' />
      </div>
    </li>
  );
}

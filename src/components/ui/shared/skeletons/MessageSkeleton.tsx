import React from "react";
import { Skeleton } from "./skeleton";

export default function MessageSkeleton() {
  return (
    <div className='space-y-1'>
      <Skeleton className='h-4 lg:w-[550px] md:w-[400px] w-[250px]' />
      <Skeleton className='h-4 lg:w-[400px] md:w-[300px] w-[150px]' />
      <Skeleton className='h-4 lg:w-[300px] md:w-[200px] w-[100px]' />
    </div>
  );
}

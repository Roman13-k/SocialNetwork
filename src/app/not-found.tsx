import { H1 } from "@/components/ui/shared/text/H";
import React from "react";

export default function NotFound() {
  return (
    <div className='flex flex-col relative w-full h-full'>
      <main className='w-full h-full flex justify-center items-center'>
        <H1>This page is not found</H1>
      </main>
    </div>
  );
}

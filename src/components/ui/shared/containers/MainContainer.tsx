import React, { PropsWithChildren } from "react";

export default function MainContainer({ children }: PropsWithChildren) {
  return (
    <div className='bg-background-primary px-10 py-8 flex flex-col w-full max-w-[1440px] mx-auto'>
      {children}
    </div>
  );
}

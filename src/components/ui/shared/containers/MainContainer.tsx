import React, { PropsWithChildren } from "react";

export default function MainContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={` bg-background-primary`}>
      <div
        className={`${
          className ?? ""
        } lg:px-10 md:px-8 px-4 py-4 md:py-6 lg:py-8 flex flex-col w-full max-w-[1440px] mx-auto`}>
        {children}
      </div>
    </div>
  );
}

import React, { PropsWithChildren } from "react";

export default function ChatContainer({
  children,
  className,
  wrapper,
}: PropsWithChildren<{ className?: string; wrapper?: string }>) {
  return (
    <div
      className={`${
        wrapper ?? ""
      } w-full bg-[url("/chatbg.jpg")] min-w-0 min-h-0 bg-no-repeat bg-center bg-cover rounded-tl-lg md:rounded-tl-none rounded-tr-lg p-3 md:p-6 lg:p-8`}>
      <div className={`flex flex-col h-full gap-5 ${className ?? ""}`}>{children}</div>
    </div>
  );
}

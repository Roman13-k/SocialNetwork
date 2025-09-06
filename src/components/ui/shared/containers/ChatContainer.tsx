import React, { PropsWithChildren } from "react";

export default function ChatContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={` w-full bg-[url("/chatbg.jpg")] bg-no-repeat bg-center bg-cover rounded-tr-lg p-8`}>
      <div className={`flex flex-col h-full gap-5 ${className ?? ""}`}>{children}</div>
    </div>
  );
}

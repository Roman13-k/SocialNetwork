import ChatList from "@/components/ui/blocks/chat/ChatList";
import React, { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <div className=' bg-background-primary h-full'>
      <div className='flex px-10 pt-8 mx-auto max-w-[1440px] h-full'>
        <ChatList />
        {children}
      </div>
    </div>
  );
}

"use client";
import RenderContentWithLinks from "@/components/ui/layout/RenderContentWithLinks";
import { MessageInterface } from "@/interfaces/message";
import { chatDateFormat, chatTitleDateFormat } from "@/utils/dates/chatDateFormat";
import React from "react";

interface MessageProps {
  message: MessageInterface;
  userId: string | undefined;
}

export default function Message({ message, userId }: MessageProps) {
  return (
    <div
      className={`${
        message.sender_id === userId ? "bg-white ml-auto" : "bg-button/85"
      } py-1.5 md:py-2 md:px-4 px-2.5 rounded-[20px] border border-border flex flex-col max-w-full`}>
      <RenderContentWithLinks
        varinant='default'
        className='break-words whitespace-normal'
        content={message.content}
      />
      <span
        className='self-end text-[14px] text-text-secondary'
        title={chatTitleDateFormat(message.created_at)}>
        {chatDateFormat(message.created_at)}
      </span>
    </div>
  );
}

"use client";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import P from "@/components/ui/shared/text/P";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { daysBetween } from "@/utils/chatDateFormat";
import { loadMessages } from "@/store/redusers/messagesReduser";

interface MessagesProps {
  userId: string | undefined;
  chatId: string;
  isToBootom: boolean;
}

export default function Messages({ userId, chatId, isToBootom }: MessagesProps) {
  const { messages, offset, loading, error } = useAppSelector((state) => state.messages);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const dispatch = useAppDispatch();

  let lastDate = "";
  const curDate = new Date();

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isToBootom) bottomRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop < 100 && offset !== null && !loading && !error) {
        const prevHeight = el.scrollHeight;

        dispatch(loadMessages({ offset, chatId }))
          .unwrap()
          .then((newMessages) => {
            if (newMessages.length > 0) {
              requestAnimationFrame(() => {
                const newHeight = el.scrollHeight;
                el.scrollTop = newHeight - prevHeight + el.scrollTop;
              });
            }
          });
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [chatId, offset, loading, error, dispatch]);

  return (
    <div
      ref={messagesRef}
      className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
      <ul className='flex flex-col items-center gap-2 py-5 max-w-[768px] mx-auto'>
        {messages.map((message, index) => {
          const rafMessageDate = new Date(message.created_at);
          const diffDays = daysBetween(curDate, rafMessageDate);

          const messageDate =
            diffDays === 0
              ? "Today"
              : diffDays === 1
              ? "Yesterday"
              : rafMessageDate.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

          const showHeader = messageDate !== lastDate;
          if (showHeader) lastDate = messageDate;

          const nextMessage = messages[index + 1];
          const showFooter =
            message.sender_id !== userId &&
            (!nextMessage || nextMessage.sender_id !== message.sender_id);

          return (
            <React.Fragment key={message.id}>
              {showHeader && (
                <div className='bg-gray-100 rounded-full px-2 py-1'>
                  <P variant={"secondary"} size={"xs"}>
                    {messageDate}
                  </P>
                </div>
              )}
              <li
                className={`${
                  message.sender_id === userId ? "self-end " : "self-start"
                } flex gap-2 w-[85%] relative`}>
                {showFooter && (
                  <Image
                    className='rounded-full self-end absolute top-1/2 left-[-50px]'
                    src={activeChat?.participants[0].avatar_url ?? "/default-avatar.png"}
                    alt='avatar'
                    width={40}
                    height={40}
                  />
                )}
                <Message userId={userId} message={message} />
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <div ref={bottomRef} className='block'></div>
    </div>
  );
}

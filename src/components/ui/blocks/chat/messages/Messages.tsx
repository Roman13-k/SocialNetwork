"use client";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
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
  setIsToBottom: Dispatch<SetStateAction<boolean>>;
}

export default function Messages({ userId, chatId, isToBootom, setIsToBottom }: MessagesProps) {
  const { messages, offset, loading, error } = useAppSelector((state) => state.messages);
  const activeChat = useAppSelector((state) => state.chats.activeChat);
  const dispatch = useAppDispatch();
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isToBootom) bottomRef.current?.scrollIntoView();
  }, [messages, isToBootom]);

  useEffect(() => {
    if (offset === null || loading || error || messages.length !== 0) return;
    dispatch(loadMessages({ offset, chatId }));
    setIsToBottom(true);
  }, [chatId]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsToBottom(false);
      if (el.scrollTop < 100 && offset !== null && !loading && !error) {
        const prevHeight = el.scrollHeight;
        const prevScrollTop = el.scrollTop;

        dispatch(loadMessages({ offset, chatId }))
          .unwrap()
          .then((newMessages) => {
            if (newMessages.length > 0) {
              const newHeight = el.scrollHeight;
              el.scrollTop = newHeight - prevHeight + prevScrollTop;
            }
          });
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [chatId, offset, loading, error]);

  let lastDate = "";
  const curDate = new Date();

  return (
    <div
      ref={messagesRef}
      className='h-full flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
      <ul className='flex flex-col items-center gap-2 py-5 max-w-[768px] mx-auto min-w-0'>
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
                <li className='bg-gray-100 rounded-full px-2 py-1'>
                  <P variant={"secondary"} size={"xs"}>
                    {messageDate}
                  </P>
                </li>
              )}
              <li
                className={`${
                  message.sender_id === userId ? "self-end " : "self-start"
                } flex gap-2  w-[85%] relative`}>
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

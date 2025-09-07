"use client";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../shared/containers/ChatContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { enterChat, leaveChat } from "@/store/redusers/chatsReduser";
import { clearMessages, messageReceived } from "@/store/redusers/messagesReduser";
import { supabase } from "@/lib/supabaseClient";
import Messages from "./messages/Messages";
import { usePathname } from "next/navigation";
import ChatInput from "./ChatInput";

export default function Chat() {
  const path = usePathname();
  const chatId = path.split("/")[2];
  const [message, setMessage] = useState("");
  const [isToBootom, setIsToBottom] = useState(true);
  const { activeChat, chats } = useAppSelector((state) => state.chats);
  const userId = useAppSelector((state) => state.user.user?.id);
  const dispatch = useAppDispatch();

  const handleNewMessage = async () => {
    if (!message.trim() || !userId) return;

    const { error } = await supabase.from("messages").insert([
      {
        chat_id: activeChat?.id,
        sender_id: userId,
        content: message,
      },
    ]);

    if (!error) setMessage("");
  };

  useEffect(() => {
    if (!chatId || !chats) return;
    dispatch(enterChat(chatId));
  }, [chatId, chats]);

  useEffect(() => {
    if (!activeChat?.id) return;

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${activeChat.id}`,
        },
        (payload) => {
          dispatch(messageReceived(payload.new));
          setIsToBottom(true);
        },
      )
      .subscribe();

    return () => {
      dispatch(leaveChat());
      dispatch(clearMessages());
      supabase.removeChannel(channel);
    };
  }, [activeChat, dispatch]);

  return (
    <ChatContainer
      wrapper={`${activeChat ? "flex" : "hidden"} lg:flex justify-center min-w-0 shrink-1`}
      className='w-full min-w-0'>
      <Messages
        userId={userId}
        chatId={chatId}
        isToBootom={isToBootom}
        setIsToBottom={setIsToBottom}
      />
      <ChatInput handleNewMessage={handleNewMessage} message={message} setMessage={setMessage} />
    </ChatContainer>
  );
}

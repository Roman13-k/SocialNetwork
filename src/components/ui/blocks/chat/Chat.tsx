"use client";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../shared/containers/ChatContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { enterChat } from "@/store/redusers/chatsReduser";
import { incrOffset, messageReceived } from "@/store/redusers/messagesReduser";
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

    if (!error) {
      dispatch(incrOffset());
      setMessage("");
    }
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
      supabase.removeChannel(channel);
    };
  }, [activeChat, dispatch]);

  return (
    <ChatContainer
      wrapper={`${activeChat ? "flex" : "hidden"} lg:flex justify-center w-full min-w-0`}
      className='min-w-0 w-full'>
      <Messages
        userId={userId}
        chatId={activeChat?.id}
        isToBootom={isToBootom}
        setIsToBottom={setIsToBottom}
      />
      <ChatInput handleNewMessage={handleNewMessage} message={message} setMessage={setMessage} />
    </ChatContainer>
  );
}

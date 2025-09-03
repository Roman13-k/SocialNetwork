"use client";
import React, { useEffect } from "react";
import ChatContainer from "../../shared/containers/ChatContainer";
import { useAppDispatch } from "@/store/hooks";
import { enterChat, leaveChat } from "@/store/redusers/chatsReduser";
import { clearMessages, messageReceived } from "@/store/redusers/messagesReduser";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Chat() {
  const path = usePathname();
  const segments = path.split("/");
  const chatId = segments[2];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chatId) return;

    dispatch(enterChat(chatId));

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
        (payload) => {
          dispatch(messageReceived(payload.new));
        },
      )
      .subscribe();

    return () => {
      dispatch(leaveChat());
      dispatch(clearMessages());
      supabase.removeChannel(channel);
    };
  }, [chatId, dispatch]);

  return <ChatContainer>Chat</ChatContainer>;
}

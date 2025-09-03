"use client";
import { useAppSelector } from "@/store/hooks";
import { getUsersChats } from "@/store/redusers/chatsReduser";
import React, { useEffect } from "react";
import P from "../../shared/text/P";
import ChatSkeleton from "../../shared/skeletons/ChatSkeleton";
import ChatElement from "./ChatElement";
import RenderWithInfinityData from "../../layout/RenderWithInfinityData";

export default function ChatList() {
  const { chats, error, loading, offset } = useAppSelector((state) => state.chats);
  const userId = useAppSelector((state) => state?.user?.user?.id);

  const loadChats = () => {
    if (offset === null || !userId) return;

    return getUsersChats({ userId, offset });
  };

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  return (
    <aside className='w-[350px] bg-white rounded-tl-lg px-4 py-5'>
      <RenderWithInfinityData callback={loadChats} loading={loading}>
        {error ? (
          <P variant={"error"}>{error}</P>
        ) : (
          chats.map((chat) => <ChatElement key={chat.id} chat={chat} />)
        )}
        {loading && (
          <>
            <ChatSkeleton />
            <ChatSkeleton />
          </>
        )}
      </RenderWithInfinityData>
    </aside>
  );
}

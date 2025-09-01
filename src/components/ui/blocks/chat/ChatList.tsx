"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUsersChats } from "@/store/redusers/chatsReduser";
import React, { useEffect } from "react";
import P from "../../shared/text/P";

export default function ChatList() {
  const dispatch = useAppDispatch();
  const { chats, error, loading } = useAppSelector((state) => state.chats);
  const userId = useAppSelector((state) => state?.user?.user?.id);

  useEffect(() => {
    if (!userId) return;

    dispatch(getUsersChats({ userId }));
  }, [userId]);

  return (
    <aside className='w-[300px] bg-white rounded-tl-lg px-3 py-4'>
      <div className='flex flex-col gap-3'>
        {error ? (
          <P>Error</P>
        ) : loading ? (
          <P>Loading</P>
        ) : (
          chats.map((chat) => <div key={chat.id}>{chat?.participants[0]?.username}</div>)
        )}
      </div>
    </aside>
  );
}

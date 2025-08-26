"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../shared/buttons/button";
import { useAppSelector } from "@/store/hooks";

export default function NewPost({
  setPostModal,
}: {
  setPostModal: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useAppSelector((state) => state.user.user);
  return (
    <>
      <section className='flex items-center gap-10'>
        <h2 className='text-text-primary text-[22px] font-medium'>Create a new post ={">"}</h2>
        <Button
          disabledMessage='You must be logged in'
          disabled={!user}
          variant={user ? "default" : "destructive"}
          onClick={() => setPostModal(true)}
          size={"lg"}>
          + New Post
        </Button>
      </section>
    </>
  );
}

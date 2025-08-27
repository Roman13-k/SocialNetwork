"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../shared/buttons/button";
import { useAppSelector } from "@/store/hooks";
import { TooltipDemo } from "../../shared/tooltip";

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
        {user ? (
          <Button variant={"default"} onClick={() => setPostModal(true)} size={"lg"}>
            + New Post
          </Button>
        ) : (
          <TooltipDemo content='You must be logged in'>
            <Button disabled variant={"destructive"} size={"lg"}>
              + New Post
            </Button>
          </TooltipDemo>
        )}
      </section>
    </>
  );
}

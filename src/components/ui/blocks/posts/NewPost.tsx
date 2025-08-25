"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../../shared/buttons/button";

export default function NewPost({
  setPostModal,
}: {
  setPostModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <section className='flex items-center gap-10'>
        <h2 className='text-text-primary text-[22px] font-medium'>Create a new post ={">"}</h2>
        <Button onClick={() => setPostModal(true)} size={"lg"}>
          + New Post
        </Button>
      </section>
    </>
  );
}

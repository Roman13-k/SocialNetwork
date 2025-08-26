"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Button } from "../../shared/buttons/button";
import { Textarea } from "../../shared/textarea";

interface NewPostModalProps {
  setPostModal: Dispatch<SetStateAction<boolean>>;
  handleNewPost: (content: string) => void;
}

export default function NewPostModal({ setPostModal, handleNewPost }: NewPostModalProps) {
  const [content, setContent] = useState("");
  return (
    <ModalContainer onClose={() => setPostModal(false)}>
      <p className='text-[22px] font-medium text-text-primary'>New Post</p>
      <Textarea
        className='resize min-w-[200px] border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}></Textarea>
      <Button variant={"secondary"} onClick={() => handleNewPost(content)}>
        Create
      </Button>
    </ModalContainer>
  );
}

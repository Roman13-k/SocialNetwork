"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Button } from "../../shared/buttons/button";

interface NewPostModalProps {
  setPostModal: Dispatch<SetStateAction<boolean>>;
  handleNewPost: (content: string) => void;
}

export default function NewPostModal({ setPostModal, handleNewPost }: NewPostModalProps) {
  const [content, setContent] = useState("");
  return (
    <ModalContainer onClose={() => setPostModal(false)}>
      <p>New Post</p>
      <textarea
        className='border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}></textarea>
      <Button variant={"secondary"} onClick={() => handleNewPost(content)}>
        Create
      </Button>
    </ModalContainer>
  );
}

"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Button } from "../../shared/buttons/button";
import { Textarea } from "../../shared/textarea";
import { useAppSelector } from "@/store/hooks";
import { H3 } from "../../shared/text/H";
import FileInput from "../../shared/inputs/FileInput";

interface NewPostModalProps {
  setPostModal: Dispatch<SetStateAction<boolean>>;
  handleNewPost: (content: string, files?: File[]) => void;
}

export default function NewPostModal({ setPostModal, handleNewPost }: NewPostModalProps) {
  const [content, setContent] = useState("");
  const loading = useAppSelector((state) => state.posts.loading);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <ModalContainer onClose={() => setPostModal(false)}>
      <H3>New Post</H3>

      <Textarea
        className='resize min-w-[140px] sm:min-w-[200px] border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />

      <FileInput setError={setError} setFiles={setFiles} files={files} error={error} />

      <Button
        className='w-[100px] sm:w-[130px] flex justify-center items-center gap-2'
        size='lg'
        variant='secondary'
        onClick={() => handleNewPost(content, files)}
        disabled={!!error || !content.trim() || loading}
        loading={loading}>
        Create
      </Button>
    </ModalContainer>
  );
}

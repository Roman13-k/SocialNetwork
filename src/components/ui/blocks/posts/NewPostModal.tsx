"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Button } from "../../shared/buttons/button";
import { Textarea } from "../../shared/textarea";
import { Input } from "../../shared/input";
import { useAppSelector } from "@/store/hooks";
import P from "../../shared/text/P";

interface NewPostModalProps {
  setPostModal: Dispatch<SetStateAction<boolean>>;
  handleNewPost: (content: string, files?: File[]) => void;
}

export default function NewPostModal({ setPostModal, handleNewPost }: NewPostModalProps) {
  const [content, setContent] = useState("");
  const loading = useAppSelector((state) => state.posts.loading);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleValidateFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 3) {
      setError("The number of files is not more than 3");
      setFiles([]);
      return;
    }
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 2 * 1024 * 1024) {
      setError("The size of files not more than 2 MB.");
      setFiles([]);
      return;
    }

    setError(null);
    setFiles(selectedFiles);
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <ModalContainer onClose={() => setPostModal(false)}>
      <p className='text-[22px] font-medium text-text-primary'>New Post</p>

      <Textarea
        className='resize min-w-[200px] border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />

      <Input type='file' accept='image/*' multiple onChange={handleValidateFiles} />
      {error && <P variant={"error"}>{error}</P>}

      <Button
        className='w-[130px] flex justify-center items-center gap-2'
        size='lg'
        variant='secondary'
        onClick={() => handleNewPost(content, files)}
        disabled={!!error || !content.trim() || loading}>
        {loading && (
          <span className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></span>
        )}
        Create
      </Button>
    </ModalContainer>
  );
}

"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Button } from "../../shared/buttons/button";
import { Textarea } from "../../shared/textarea";
import { Input } from "../../shared/input";
import { useAppSelector } from "@/store/hooks";

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

  return (
    <ModalContainer onClose={() => setPostModal(false)}>
      <p className='text-[22px] font-medium text-text-primary'>New Post</p>

      <Textarea
        className='resize min-w-[200px] border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />

      <Input type='file' accept='image/*' multiple onChange={handleValidateFiles} />
      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <Button
        variant={"secondary"}
        onClick={() => handleNewPost(content, files)}
        disabled={!!error || !content.trim() || loading}>
        Create
      </Button>
    </ModalContainer>
  );
}

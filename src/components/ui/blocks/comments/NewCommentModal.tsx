import React, { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Textarea } from "../../shared/textarea";
import { Button } from "../../shared/buttons/button";
import { useAppSelector } from "@/store/hooks";
import P from "../../shared/text/P";

export default function NewCommentModal({
  setCommentModal,
  handleNewComment,
}: {
  setCommentModal: Dispatch<SetStateAction<boolean>>;
  handleNewComment: (content: string) => void;
}) {
  const { loading, error } = useAppSelector((state) => state.comments);
  const [content, setContent] = useState("");

  return (
    <ModalContainer onClose={() => setCommentModal(false)}>
      <p className='text-[22px] font-medium text-text-primary'>Сomment on this</p>

      <Textarea
        className='resize min-w-[200px] border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />

      {error && <P variant={"error"}>{error}</P>}
      <Button
        className='w-[130px] flex justify-center items-center gap-2'
        size='lg'
        variant='secondary'
        onClick={() => handleNewComment(content)}
        disabled={!content.trim() || loading}>
        {loading && (
          <span className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></span>
        )}
        Create
      </Button>
    </ModalContainer>
  );
}

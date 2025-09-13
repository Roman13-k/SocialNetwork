import React, { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../../shared/containers/ModalContainer";
import { Textarea } from "../../shared/textarea";
import { Button } from "../../shared/buttons/button";
import { useAppSelector } from "@/store/hooks";
import P from "../../shared/text/P";
import { H4 } from "../../shared/text/H";

export default function NewCommentModal({
  setCommentModal,
  handleNewComment,
}: {
  setCommentModal: Dispatch<SetStateAction<boolean>>;
  handleNewComment: (content: string) => void;
}) {
  const { loading, error } = useAppSelector((state) => state.comments);
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);

  return (
    <ModalContainer onClose={() => setCommentModal(false)}>
      <H4>Сomment on this</H4>
      <Textarea
        className='resize min-w-[200px] border-border border rounded-md p-2'
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
        maxChars={400}
        onValidateError={(err) => setContentError(err)}
      />
      {error && <P variant={"error"}>{error.message}</P>}
      <Button
        className='w-[130px] flex justify-center items-center gap-2'
        size='lg'
        variant='secondary'
        onClick={() => handleNewComment(content)}
        disabled={!content.trim() || loading || contentError}
        loading={loading}>
        Create
      </Button>
    </ModalContainer>
  );
}

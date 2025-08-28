import { CommentInterface } from "@/interfaces/comment";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteCommentById } from "@/store/redusers/commentsReduser";
import { postDateFormat } from "@/utils/postDateFormat";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import DeleteDialog from "../../shared/dialog/DeleteDialog";

export default function Comment({ comment }: { comment: CommentInterface }) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state?.user?.user?.id);

  const hadleDeleteComment = () => {
    dispatch(deleteCommentById(comment.id));
  };
  return (
    <li className='flex items-start px-5 py-3 border-border border rounded-md w-[700px] transition-all hover:bg-background-secondary/80'>
      <Image
        src={comment.user.avatar_url}
        alt=''
        width={40}
        height={40}
        className='mr-2 rounded-full'
      />
      <div className='flex flex-col gap-1 w-full'>
        <div className='flex gap-2 text-[17px] w-full'>
          <strong className='text-text-primary'>{comment.user.username}</strong>
          <p className='text-text-secondary'>· {postDateFormat(comment.created_at)}</p>
          {userId === comment.user_id && (
            <DeleteDialog
              handleAction={hadleDeleteComment}
              triger={
                <button className='ml-auto cursor-pointer'>
                  <Trash2 color='#ff0000' />
                </button>
              }
              trigerText={"Delete"}
            />
          )}
        </div>

        <p className='text-[16px] text-text-secondary'>{comment.content}</p>
      </div>
    </li>
  );
}

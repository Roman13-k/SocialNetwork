import { integerFormat } from "@/utils/integerFormat";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import P from "../text/P";

interface CommentButtonProps {
  count: number;
  setCommentModal: Dispatch<SetStateAction<boolean>>;
}

export default function CommentButton({ count, setCommentModal }: CommentButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setCommentModal(true);
      }}
      className='flex items-center transition-all cursor-pointer group'>
      <div className='rounded-full group-hover:bg-accent/30 p-1 transition-all'>
        <Image src={"/comment.png"} alt='comments' width={20} height={18} />
      </div>
      <P variant={"secondary"} className='group-hover:text-accent font-medium'>
        {integerFormat(count)}
      </P>
    </button>
  );
}

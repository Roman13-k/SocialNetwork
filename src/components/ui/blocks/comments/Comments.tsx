"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useRef } from "react";
import Comment from "./Comment";
import { useObserver } from "@/hooks/useObserver";
import { loadComments } from "@/store/redusers/commentsReduser";

export default function Comments() {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { comments, loading, offset } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const loadMoreComments = () => {
    if (offset !== null && !loading) {
      dispatch(loadComments({ offset }));
    }
  };

  useObserver(loadMoreComments, loading, divRef);

  return (
    <section className='flex flex-col'>
      <ul className='flex flex-col gap-4'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      <div ref={divRef} className='block w-[200px] h-4'></div>
    </section>
  );
}

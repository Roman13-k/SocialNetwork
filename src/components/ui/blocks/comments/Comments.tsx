"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect, useRef } from "react";
import Comment from "./Comment";
import { useObserver } from "@/hooks/useObserver";
import { loadComments, resetComments } from "@/store/redusers/commentsReduser";
import CommentSkeleton from "../../shared/skeletons/CommentSkeleton";

export default function Comments({ postId }: { postId: string }) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { comments, loading, offset } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const loadMoreComments = () => {
    if (offset !== null && !loading) {
      dispatch(loadComments({ offset, postId }));
    }
  };

  useObserver(loadMoreComments, loading, divRef);

  useEffect(() => {
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch]);

  return (
    <section className='flex flex-col'>
      <ul className='flex flex-col gap-4'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      {loading && (
        <div className='flex flex-col gap-4'>
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      )}
      <div ref={divRef} className='block w-[200px] h-4'></div>
    </section>
  );
}

"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import Comment from "./Comment";
import { loadComments, resetComments } from "@/store/redusers/commentsReduser";
import CommentSkeleton from "../../shared/skeletons/CommentSkeleton";
import RenderWithInfinityData from "../../layout/RenderWithInfinityData";

export default function Comments({ postId }: { postId: string }) {
  const { comments, loading, offset } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch]);

  return (
    <RenderWithInfinityData
      callback={() => loadComments({ offset, postId })}
      loading={loading}
      offset={offset}>
      <ul className='flex flex-col gap-3 md:gap-5 w-full max-w-[650px]'>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      {loading && (
        <div className='flex flex-col gap-3 md:gap-5 w-full max-w-[650px]'>
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      )}
    </RenderWithInfinityData>
  );
}

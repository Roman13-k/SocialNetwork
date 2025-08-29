"use client";
import React, { useEffect, useRef } from "react";
import { DataVariantsType } from "./UserInfluence";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUserLikedPosts, loadUserPosts } from "@/store/redusers/postsReduser";
import Post from "../posts/Post";
import PostSkeleton from "../../shared/skeletons/PostSkeleton";
import { useObserver } from "@/hooks/useObserver";
import CommentSkeleton from "../../shared/skeletons/CommentSkeleton";
import Comment from "../comments/Comment";
import { loadUserComments, resetComments } from "@/store/redusers/commentsReduser";

export default function SelectedData({ selectedVariant }: { selectedVariant: DataVariantsType }) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const { loading, userLikedPosts, userLikedOffset, userOffset, userPosts } = useAppSelector(
    (state) => state.posts,
  );
  const { comments, loading: commentsLoading, offset } = useAppSelector((state) => state.comments);
  const userId = useAppSelector((state) => state.user.user?.id);
  const dispatch = useAppDispatch();

  const loadData = () => {
    if (selectedVariant === "posts" && userOffset !== null) {
      dispatch(loadUserPosts({ userId, offset: userOffset }));
    } else if (selectedVariant === "likedPosts" && userLikedOffset !== null) {
      dispatch(loadUserLikedPosts({ userId, offset: userLikedOffset }));
    } else if (offset !== null) dispatch(loadUserComments({ userId, offset }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch]);

  useObserver(
    loadData,
    selectedVariant === "posts" || selectedVariant === "likedPosts" ? loading : commentsLoading,
    divRef,
  );

  return (
    <div className='flex flex-col gap-4'>
      {selectedVariant === "posts"
        ? userPosts.map((post) => <Post key={post.id} post={post} />)
        : selectedVariant === "likedPosts"
        ? userLikedPosts.map((post) => <Post key={post.id} post={post} />)
        : comments.map((com) => <Comment comment={com} key={com.id} />)}
      {loading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {commentsLoading && (
        <>
          <CommentSkeleton />
          <CommentSkeleton />
        </>
      )}
      <div ref={divRef} className='block w-full h-4'></div>
    </div>
  );
}

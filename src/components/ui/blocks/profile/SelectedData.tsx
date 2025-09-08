"use client";
import React, { useEffect } from "react";
import { DataVariantsType } from "./UserInfluence";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadUserLikedPosts, loadUserPosts } from "@/store/redusers/postsReduser";
import Post from "../posts/Post";
import PostSkeleton from "../../shared/skeletons/PostSkeleton";
import CommentSkeleton from "../../shared/skeletons/CommentSkeleton";
import Comment from "../comments/Comment";
import { loadUserComments, resetComments } from "@/store/redusers/commentsReduser";
import RenderWithInfinityData from "../../layout/RenderWithInfinityData";

export default function SelectedData({ selectedVariant }: { selectedVariant: DataVariantsType }) {
  const { loading, userLikedPosts, userLikedOffset, userOffset, userPosts } = useAppSelector(
    (state) => state.posts,
  );
  const { comments, loading: commentsLoading, offset } = useAppSelector((state) => state.comments);
  const userId = useAppSelector((state) => state.user.user?.id);
  const dispatch = useAppDispatch();

  const loadData = () => {
    if (selectedVariant === "posts" && userOffset !== null) {
      return loadUserPosts({ userId, offset: userOffset });
    } else if (selectedVariant === "likedPosts" && userLikedOffset !== null) {
      return loadUserLikedPosts({ userId, offset: userLikedOffset });
    } else if (offset !== null) return loadUserComments({ userId, offset });
  };

  useEffect(() => {
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch]);

  return (
    <RenderWithInfinityData
      callback={loadData}
      loading={
        selectedVariant === "posts" || selectedVariant === "likedPosts" ? loading : commentsLoading
      }>
      <ul className='flex flex-col items-center gap-3 md:gap-5 w-full'>
        {selectedVariant === "posts"
          ? userPosts.map((post) => <Post key={post.id} post={post} type='userPosts' />)
          : selectedVariant === "likedPosts"
          ? userLikedPosts.map((post) => <Post key={post.id} post={post} type='userLikedPosts' />)
          : comments.map((com) => <Comment comment={com} key={com.id} />)}
      </ul>

      <ul className='flex flex-col gap-3 md:gap-5 w-full max-w-[650px]'>
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
      </ul>
    </RenderWithInfinityData>
  );
}

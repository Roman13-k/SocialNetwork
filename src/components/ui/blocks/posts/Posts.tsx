"use client";
import React, { useEffect, useRef } from "react";
import Post from "./Post";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPosts } from "@/store/redusers/postsReduser";
import PostSkeleton from "../../shared/skeletons/PostSkeleton";
import { useObserver } from "@/hooks/useObserver";

export default function Posts() {
  const { posts, loading: postLoading } = useAppSelector((state) => state.posts);
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const offset = useAppSelector((state) => state.posts.offset);
  const divRef = useRef<HTMLDivElement | null>(null);

  const loadMore = () => {
    if (!postLoading && offset !== null) {
      dispatch(loadPosts({ userId: user?.id, offset }));
    }
  };

  useEffect(() => {
    if (loading) return;
    dispatch(loadPosts({ userId: user?.id, offset }));
  }, [loading]);

  useObserver(loadMore, loading, divRef);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <section className='flex flex-col w-full items-center justify-center'>
      <ul className='flex flex-col gap-5'>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <ul className='flex flex-col gap-5'>
        {postLoading && Array.from({ length: 3 }, (_, index) => <PostSkeleton key={index} />)}
      </ul>
      <div className='block w-full h-4' ref={divRef}></div>
    </section>
  );
}

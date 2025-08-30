"use client";
import React from "react";
import Post from "./Post";
import { useAppSelector } from "@/store/hooks";
import { loadPosts } from "@/store/redusers/postsReduser";
import PostSkeleton from "../../shared/skeletons/PostSkeleton";
import RenderWithInfinityData from "../../layout/RenderWithInfinityData";

export default function Posts() {
  const { posts, loading: postLoading } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.user);
  const offset = useAppSelector((state) => state.posts.offset);

  return (
    <RenderWithInfinityData
      offset={offset}
      loading={postLoading}
      callback={() => loadPosts({ userId: user?.id, offset })}>
      <ul className='flex flex-col gap-5'>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <ul className='flex flex-col gap-5'>
        {postLoading && Array.from({ length: 3 }, (_, index) => <PostSkeleton key={index} />)}
      </ul>
    </RenderWithInfinityData>
  );
}

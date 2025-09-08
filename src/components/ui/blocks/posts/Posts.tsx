"use client";
import React from "react";
import Post from "./Post";
import { useAppSelector } from "@/store/hooks";
import { loadPosts } from "@/store/redusers/postsReduser";
import PostSkeleton from "../../shared/skeletons/PostSkeleton";
import RenderWithInfinityData from "../../layout/RenderWithInfinityData";

export default function Posts() {
  const { posts, loading: postLoading } = useAppSelector((state) => state.posts);
  const { user, loading } = useAppSelector((state) => state.user);
  const offset = useAppSelector((state) => state.posts.offset);

  return (
    <RenderWithInfinityData
      loading={postLoading || loading}
      callback={() => loadPosts({ userId: user?.id, offset })}>
      <ul className='flex flex-col items-center gap-3 md:gap-5 w-full'>
        {posts?.map((post) => (
          <Post key={post.id} post={post} type={"posts"} />
        ))}
      </ul>
      {postLoading && (
        <ul className='flex flex-col items-center gap-3 md:gap-5 w-full'>
          {Array.from({ length: 3 }, (_, index) => (
            <PostSkeleton key={index} />
          ))}
        </ul>
      )}
    </RenderWithInfinityData>
  );
}

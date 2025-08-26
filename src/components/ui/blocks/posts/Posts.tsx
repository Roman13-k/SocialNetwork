"use client";
import React, { useEffect } from "react";
import Post from "./Post";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPosts } from "@/store/redusers/postsReduser";

export default function Posts() {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <section className='flex w-full justify-center'>
      <ul className='flex flex-col gap-5'>
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

"use client";
import React, { useEffect } from "react";
import Post from "./Post";
import { supabase } from "@/lib/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addPrevPosts } from "@/store/redusers/postsReduser";

export default function Posts() {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*, likes(count), comments(count)")
      .range(0, 5)
      .order("created_at", { ascending: false });

    if (data) {
      dispatch(addPrevPosts(data));
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <section className='flex flex-col gap-10'>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}

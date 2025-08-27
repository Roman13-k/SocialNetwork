"use client";
import React, { useState } from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import Posts from "../ui/blocks/posts/Posts";
import NewPost from "../ui/blocks/posts/NewPost";
import Intro from "../ui/blocks/Intro";
import NewPostModal from "../ui/blocks/posts/NewPostModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewPost, setLoading } from "@/store/redusers/postsReduser";
import { supabase } from "@/lib/supabaseClient";

export default function HomeScreen() {
  const [postModal, setPostModal] = useState(false);
  const userId = useAppSelector((state) => state.user.user?.id);
  const error = useAppSelector((state) => state.posts.error);
  const dispatch = useAppDispatch();

  async function uploadPostsImages(postId: string, files?: File[]): Promise<string[] | undefined> {
    if (!files || files.length === 0) return;
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("posts-images")
        .upload(`${postId}/${file.name}`, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data: publicUrlData } = supabase.storage.from("posts-images").getPublicUrl(data.path);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return uploadedUrls;
  }

  const handleNewPost = async (content: string, files?: File[]) => {
    if (!content.trim() || !userId) return;

    dispatch(setLoading());
    const postId = crypto.randomUUID();
    const image_url = await uploadPostsImages(postId, files);
    dispatch(createNewPost({ content, userId, image_url, postId }));
    if (!error) setPostModal(false);
  };

  return (
    <>
      {postModal && <NewPostModal setPostModal={setPostModal} handleNewPost={handleNewPost} />}
      <MainContainer className='gap-10 min-h-[95dvh]'>
        <Intro />
        <NewPost setPostModal={setPostModal} />
        <Posts />
      </MainContainer>
    </>
  );
}

"use client";
import React, { useState } from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import Posts from "../ui/blocks/posts/Posts";
import NewPost from "../ui/blocks/posts/NewPost";
import Intro from "../ui/blocks/Intro";
import NewPostModal from "../ui/blocks/posts/NewPostModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { supabase } from "@/lib/supabaseClient";
import { addNewPost } from "@/store/redusers/postsReduser";

export default function HomeScreen() {
  const [postModal, setPostModal] = useState(false);
  const userId = useAppSelector((state) => state.user.user?.id);
  const dispatch = useAppDispatch();

  const handleNewPost = async (content: string) => {
    if (!content.trim()) return;
    const { data, error } = await supabase
      .from("posts")
      .insert([{ content, user_id: userId }])
      .select("*, likes(count), comments(count)");

    if (!error && data) {
      dispatch(addNewPost(data));
      setPostModal(false);
    }
  };

  return (
    <>
      {postModal && <NewPostModal setPostModal={setPostModal} handleNewPost={handleNewPost} />}
      <MainContainer className='gap-10'>
        <Intro />
        <NewPost setPostModal={setPostModal} />
        <Posts />
      </MainContainer>
    </>
  );
}

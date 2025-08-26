"use client";
import React, { useState } from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import Posts from "../ui/blocks/posts/Posts";
import NewPost from "../ui/blocks/posts/NewPost";
import Intro from "../ui/blocks/Intro";
import NewPostModal from "../ui/blocks/posts/NewPostModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewPost, deletePostById } from "@/store/redusers/postsReduser";

export default function HomeScreen() {
  const [postModal, setPostModal] = useState(false);
  const userId = useAppSelector((state) => state.user.user?.id);
  const error = useAppSelector((state) => state.posts.error);
  const dispatch = useAppDispatch();

  const handleNewPost = async (content: string) => {
    if (!content.trim() || !userId) return;
    dispatch(createNewPost({ content, userId }));
    if (!error) setPostModal(false);
  };

  const handleDeletePost = (postId: string) => {
    dispatch(deletePostById(postId));
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

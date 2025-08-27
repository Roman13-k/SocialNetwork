"use client";
import { redirect, useParams } from "next/navigation";
import React from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import Comments from "../ui/blocks/comments/Comments";
import Post from "../ui/blocks/posts/Post";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import P from "../ui/shared/text/P";
import Link from "next/link";
import { deletePostById } from "@/store/redusers/postsReduser";
import { deleteCommentById } from "@/store/redusers/commentsReduser";
import DeleteDialog from "../ui/shared/dialog/DeleteDialog";

export default function PostScreen() {
  const params = useParams();
  const post = useAppSelector((state) => state.posts.posts.find((post) => post.id === params.id));
  const userId = useAppSelector((state) => state?.user?.user?.id);
  const dispatch = useAppDispatch();

  if (!post)
    return (
      <MainContainer className='min-h-[90dvh]'>
        <P variant={"error"}>Post By Id {params.id} not found</P>
      </MainContainer>
    );

  const handleDeletePost = () => {
    dispatch(deletePostById({ postId: post.id, image_url: post.image_url }));
    redirect("/");
  };

  const hadleDeleteComment = (commentId: string) => {
    dispatch(deleteCommentById(commentId));
  };

  return (
    <MainContainer>
      <div className='flex flex-col items-center gap-10 px-14 pt-10'>
        <nav className='text-sm text-text-secondary mb-4 font-medium text-[18px] self-start'>
          <Link href='/' className='text-text-secondary hover:text-accent font-medium text-[18px]'>
            Главная
          </Link>
          / Пост {params.id}
        </nav>
        <div className='flex flex-col items-start gap-3'>
          <Post post={post} />
          {post.user.id === userId && (
            <DeleteDialog handleAction={handleDeletePost} trigerText='Delete post' />
          )}
        </div>
        <Comments />
      </div>
    </MainContainer>
  );
}

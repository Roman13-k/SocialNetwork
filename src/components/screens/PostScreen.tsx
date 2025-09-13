"use client";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import Comments from "../ui/blocks/comments/Comments";
import Post from "../ui/blocks/posts/Post";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import P from "../ui/shared/text/P";
import Link from "next/link";
import { deletePostById, getPostById } from "@/store/redusers/postsReduser";
import DeleteDialog from "../ui/shared/dialog/DeleteDialog";
import PostSkeleton from "../ui/shared/skeletons/PostSkeleton";

export default function PostScreen() {
  const params = useParams();
  const { currentPost, loading } = useAppSelector((state) => state.posts);
  const { loading: userLoading, user } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userLoading) return;
    if (params.id && !Array.isArray(params.id)) {
      dispatch(getPostById({ id: params.id, userId: user?.id }));
    }
  }, [params.id, user?.id, dispatch]);

  if ((!currentPost && !loading) || !params.id || Array.isArray(params.id))
    return (
      <MainContainer className='min-h-[90dvh]'>
        <P variant={"error"}>Post By Id {params.id} not found</P>
      </MainContainer>
    );

  const handleDeletePost = () => {
    dispatch(deletePostById({ postId: currentPost.id, image_url: currentPost.image_url }));
    redirect("/");
  };

  return (
    <MainContainer className='min-h-[100dvh]'>
      <div className='flex flex-col items-center md:gap-8 gap-4 lg:gap-10 pt-10'>
        <nav className='text-sm text-text-secondary mb-4 font-medium text-[18px] self-start'>
          <Link
            href='/'
            className='text-text-secondary hover:text-accent font-medium text-[14px] md:text-[16px] lg:text-[18px]'>
            Главная
          </Link>{" "}
          / Пост {params.id}
        </nav>
        {loading || userLoading ? (
          <PostSkeleton />
        ) : (
          <div className='flex flex-col items-start gap-3'>
            <Post post={currentPost} />
            {currentPost?.user?.id === user?.id && (
              <DeleteDialog handleAction={handleDeletePost} trigerText='Delete post' />
            )}
          </div>
        )}
        <Comments postId={params.id} />
      </div>
    </MainContainer>
  );
}

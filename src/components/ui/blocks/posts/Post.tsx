"use client";
import { PostInterface } from "@/interfaces/post";
import { postDateFormat } from "@/utils/dates/postDateFormat";
import Image from "next/image";
import React, { useState } from "react";
import LikeButton from "../../shared/buttons/LikeButton";
import Link from "next/link";
import CommentButton from "../../shared/buttons/CommentButton";
import NewCommentModal from "../comments/NewCommentModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewComment } from "@/store/redusers/commentsReduser";
import P from "../../shared/text/P";
import { PostsType, updateCommentsCout } from "@/store/redusers/postsReduser";
import { profanity } from "@/lib/profanity";
import RenderContentWithLinks from "../../layout/RenderContentWithLinks";

export default function Post({ post, type }: { post: PostInterface; type?: PostsType }) {
  const [commentModal, setCommentModal] = useState(false);
  const dispatch = useAppDispatch();
  const { error: commentError } = useAppSelector((state) => state.comments);
  const userId = useAppSelector((state) => state.user.user?.id);

  const handleNewComment = async (content: string) => {
    if (!userId) return;
    await dispatch(createNewComment({ content, user_id: userId, post_id: post.id }));
    if (!commentError) {
      dispatch(updateCommentsCout({ count: 1, postId: post.id, type }));
      setCommentModal(false);
    }
  };

  return (
    <>
      <li className='lg:px-5 md:px-4 px-3 lg:py-3 py-2 border-border border rounded-md w-full max-w-[650px] transition-all hover:bg-background-secondary/80 cursor-pointer'>
        <div className='flex items-start'>
          {/* Ссылка на профиль */}
          <Link
            className='md:mr-2 mr-1'
            href={userId === post?.user?.id ? "/profile" : `/profile/${post?.user?.id}`}>
            <Image
              src={post?.user?.avatar_url ?? "/"}
              alt=''
              width={40}
              height={40}
              className='rounded-full lg:scale-100 md:scale-95 scale-85'
            />
          </Link>

          <div className='flex-1 flex flex-col md:gap-2 gap-1'>
            {/* Ссылка на пост */}
            <Link href={`/post/${post?.id}`}>
              <div className='flex gap-2 text-[17px]'>
                <strong className='text-text-primary'>{post?.user?.username}</strong>
                <P variant={"secondary"}>· {postDateFormat(post?.created_at)}</P>
              </div>
            </Link>

            <RenderContentWithLinks content={profanity.censor(post?.content)} />

            {post?.image_url && post?.image_url?.length > 0 && (
              <div
                className={`
                grid md:gap-2 gap-1 max-w-[540px] w-full h-auto
                ${post.image_url.length === 1 ? "grid-cols-1 grid-rows-1" : ""}
                ${post.image_url.length === 2 ? "grid-cols-2 grid-rows-1" : ""}
                ${post.image_url.length === 3 ? "grid-cols-2 grid-rows-2" : ""}
              `}>
                {post.image_url.map((url, i) => (
                  <Image
                    key={url}
                    src={url}
                    alt='post'
                    width={540}
                    height={540}
                    className={`
                    object-contain rounded-2xl w-full h-full max-h-[650px] border-2 border-accent/15
                    ${post?.image_url?.length === 3 && i === 0 ? "col-span-2 row-span-2" : ""}
                    ${post?.image_url?.length === 3 && i > 0 ? "w-full h-full" : ""}
                  `}
                  />
                ))}
              </div>
            )}

            <div className='flex gap-6 md:gap-10 font-medium'>
              <LikeButton
                user_id={userId}
                post_id={post.id}
                count={post?.likes?.[0].count}
                liked_by_user={post?.liked_by_user}
              />
              <CommentButton
                setCommentModal={setCommentModal}
                count={post?.comments?.[0]?.count ?? 0}
              />
            </div>
          </div>
        </div>
      </li>

      {commentModal && userId && (
        <NewCommentModal handleNewComment={handleNewComment} setCommentModal={setCommentModal} />
      )}
    </>
  );
}

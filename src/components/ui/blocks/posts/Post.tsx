import { PostInterface } from "@/interfaces/post";
import { integerFormat } from "@/utils/integerFormat";
import { postDateFormat } from "@/utils/postDateFormat";
import Image from "next/image";
import React from "react";
import LikeButton from "../../shared/buttons/LikeButton";
import Link from "next/link";

export default function Post({ post }: { post: PostInterface }) {
  return (
    <li className='px-5 py-3 border-border border rounded-md w-[700px] transition-all hover:bg-background-secondary/80 cursor-pointer'>
      <Link className='flex items-start' href={`/post/${post.id}`}>
        <Image
          src={post.user.avatar_url}
          alt=''
          width={40}
          height={40}
          className='mr-2 rounded-full'
        />
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 text-[17px]'>
            <strong className='text-text-primary'>{post.user.username}</strong>
            <p className='text-text-secondary'>· {postDateFormat(post.created_at)}</p>
          </div>

          <p className='text-[16px] text-text-secondary'>{post.content}</p>
          {post.image_url && post.image_url.length > 0 && (
            <div
              className={`
              grid gap-2 max-w-[520px] max-h-[520px] w-full h-full
              ${post.image_url.length === 1 ? "grid-cols-1 grid-rows-1" : ""}
              ${post.image_url.length === 2 ? "grid-cols-2 grid-rows-1" : ""}
              ${post.image_url.length === 3 ? "grid-cols-2 grid-rows-2" : ""}
              `}>
              {post.image_url.map((url, i) => (
                <Image
                  key={url}
                  src={url}
                  alt='post'
                  width={520}
                  height={520}
                  className={`
            object-cover rounded-2xl w-full h-full border-2 border-accent/15
            ${post?.image_url?.length === 3 && i === 0 ? "col-span-2 row-span-2" : ""}
            ${post?.image_url?.length === 3 && i > 0 ? "w-full h-full" : ""}
          `}
                />
              ))}
            </div>
          )}

          <div className='flex gap-10 font-medium'>
            <LikeButton
              user_id={post.user.id}
              post_id={post.id}
              count={post.likes[0].count}
              liked_by_user={post.liked_by_user}
            />
            <button className='flex items-center text-text-secondary hover:text-accent transition-all group'>
              <div className='rounded-full group-hover:bg-accent/30 p-1 transition-all'>
                <Image src={"/comment.png"} alt='comments' width={20} height={18} />
              </div>
              <p>{integerFormat(post.comments[0].count)}</p>
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
}

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

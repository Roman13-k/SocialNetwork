import { PostInterface } from "@/interfaces/post";
import Image from "next/image";
import React from "react";

export default function Post({ post }: { post: PostInterface }) {
  return (
    <li className='px-5 py-3 border-border border rounded-md flex items-start w-[700px] transition-all hover:bg-background-secondary/80 cursor-pointer'>
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
          <p className='text-text-secondary'>· 14h</p>
        </div>

        <p className='text-[16px] text-text-secondary'>{post.content}</p>

        <div className='flex gap-10 font-medium'>
          <div className='flex items-center text-text-secondary hover:text-like transition-all group'>
            <div className='rounded-full group-hover:bg-like/30 p-1 transition-all'>
              <Image src={"/like.png"} alt='likes' width={22} height={20} />
            </div>
            <p>{post.likes[0].count}</p>
          </div>
          <div className='flex items-center text-text-secondary hover:text-accent transition-all group'>
            <div className='rounded-full group-hover:bg-accent/30 p-1 transition-all'>
              <Image src={"/comment.png"} alt='comments' width={20} height={18} />
            </div>
            <p>{post.comments[0].count}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

"use client";
import { supabase } from "@/lib/supabaseClient";
import { integerFormat } from "@/utils/integerFormat";
import Image from "next/image";
import React, { useState } from "react";
import P from "../text/P";

interface LikeButtonProps {
  post_id: string;
  user_id: string | undefined;
  count: number;
  liked_by_user: boolean;
}

export default function LikeButton({ post_id, user_id, count, liked_by_user }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked_by_user);
  const [countLikes, setCountLikes] = useState(count);

  const toggleLike = async () => {
    if (!user_id) return;
    if (isLiked) {
      const { error } = await supabase.from("likes").delete().match({ post_id, user_id });
      if (!error) {
        setIsLiked(false);
        setCountLikes((prev) => prev - 1);
      }
    } else {
      const { error } = await supabase.from("likes").insert([{ post_id, user_id }]);
      if (!error) {
        setIsLiked(true);
        setCountLikes((prev) => prev + 1);
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleLike();
      }}
      className='flex items-center transition-all group cursor-pointer'>
      <div className='rounded-full group-hover:bg-like/30 p-1 transition-all'>
        {isLiked ? (
          <Image
            src={"/like-field.png"}
            alt='likes'
            width={22}
            height={20}
            className='lg:scale-100 scale-80'
          />
        ) : (
          <Image
            src={"/like.png"}
            alt='likes'
            width={22}
            height={20}
            className='lg:scale-100 scale-80'
          />
        )}
      </div>
      <P variant={"secondary"} className='group-hover:text-like font-medium'>
        {integerFormat(countLikes)}
      </P>
    </button>
  );
}

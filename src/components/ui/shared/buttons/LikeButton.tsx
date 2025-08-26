"use client";
import { supabase } from "@/lib/supabaseClient";
import { integerFormat } from "@/utils/integerFormat";
import Image from "next/image";
import React, { useState } from "react";

interface LikeButtonProps {
  post_id: string;
  user_id: string;
  count: number;
  liked_by_user: boolean;
}

export default function LikeButton({ post_id, user_id, count, liked_by_user }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked_by_user);
  const [countLikes, setCountLikes] = useState(count);

  const toggleLike = async () => {
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
      className='flex items-center text-text-secondary hover:text-like transition-all group cursor-pointer'>
      <div className='rounded-full group-hover:bg-like/30 p-1 transition-all'>
        {isLiked ? (
          <Image src={"/like-field.png"} alt='likes' width={22} height={20} />
        ) : (
          <Image src={"/like.png"} alt='likes' width={22} height={20} />
        )}
      </div>
      <p>{integerFormat(countLikes)}</p>
    </button>
  );
}

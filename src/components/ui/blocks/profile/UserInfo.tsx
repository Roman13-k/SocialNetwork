import Image from "next/image";
import React from "react";
import { H1 } from "../../shared/text/H";
import P from "../../shared/text/P";
import { UserInterface } from "@/interfaces/user";

export default function UserInfo({ user }: { user: UserInterface }) {
  const userInfo = [
    { name: "Email: ", value: user?.user_metadata.email },
    { name: "Count of posts: ", value: user?.stats.posts_count },
    { name: "Count of likes: ", value: user?.stats.likes_count },
    { name: "Count of comments: ", value: user?.stats.comments_count },
  ];
  return (
    <>
      <H1>Hi, {user?.user_metadata.name}</H1>
      <div className='flex gap-5'>
        <Image
          src={user?.user_metadata.avatar_url ?? ""}
          width={196}
          height={196}
          alt='profile'
          className='rounded-full'
        />
        <ul className='flex flex-col gap-3'>
          {userInfo.map((inf, index) => (
            <li key={index}>
              <P size={"lg"} className='text-[18px] font-medium'>
                <span className='text-text-primary'>{inf.name}</span>
                <span className='text-text-secondary'>{inf.value}</span>
              </P>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

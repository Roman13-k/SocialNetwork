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
      <div className='flex items-center lg:gap-5 gap-3'>
        <Image
          src={user?.user_metadata.avatar_url ?? ""}
          width={196}
          height={196}
          alt='profile'
          className='rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48'
        />
        <ul className='flex flex-col gap-2 lg:gap-3'>
          {userInfo.map((inf, index) => (
            <li key={index}>
              <P size={"lg"}>
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

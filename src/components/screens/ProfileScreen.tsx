"use client";
import React from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { logoutUser } from "@/store/redusers/userReducer";
import { redirect } from "next/navigation";
import DeleteDialog from "../ui/shared/dialog/DeleteDialog";
import { Skeleton } from "../ui/shared/skeletons/skeleton";
import P from "../ui/shared/text/P";

export default function ProfileScreen() {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  //! сделать полное удаление аккаунта

  const userInfo = [
    { name: "Email: ", value: user?.user_metadata.email },
    { name: "Count of posts: ", value: user?.stats.posts_count },
    { name: "Count of likes: ", value: user?.stats.likes_count },
    { name: "Count of comments: ", value: user?.stats.comments_count },
  ];

  const handleExit = () => {
    dispatch(logoutUser());
    redirect("/");
  };

  return (
    <MainContainer className='min-h-[95dvh]'>
      {!user ? (
        <P variant={"error"}>{error}</P>
      ) : (
        <section className='flex flex-col justify-start items-start gap-10 p-16'>
          {loading ? (
            <div className='flex flex-col gap-4'>
              <Skeleton className='rounded-full w-[200px] h-[20px]' />
              <div className='flex gap-10'>
                <Skeleton className='rounded-full w-[196px] h-[196px]' />
                <div className='flex flex-col gap-3 mt-10'>
                  <Skeleton className='rounded-full w-[200px] h-[20px]' />
                  <Skeleton className='rounded-full w-[140px] h-[18px]' />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className='text-text-primary text-[32px]'>Hi, {user?.user_metadata.name}</h1>
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
                      <p className='text-[18px] font-medium'>
                        <span className='text-text-primary'>{inf.name}</span>
                        <span className='text-text-secondary'>{inf.value}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <DeleteDialog
                handleAction={handleExit}
                description='You will be logged out of your account.'
              />
            </>
          )}
        </section>
      )}
    </MainContainer>
  );
}

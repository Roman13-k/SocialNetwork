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
                  <li>
                    <p className='text-[18px] font-medium'>
                      <span className='text-text-primary'>Email: </span>
                      <span className='text-text-secondary'>{user?.user_metadata.email}</span>
                    </p>
                  </li>
                </ul>
              </div>
              <DeleteDialog handleExit={handleExit} />
            </>
          )}
        </section>
      )}
    </MainContainer>
  );
}

"use client";
import React from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { Button } from "../ui/shared/buttons/button";
import { logoutUser } from "@/store/redusers/usersReducer";
import { redirect } from "next/navigation";

export default function ProfileScreen() {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(logoutUser());
    redirect("/");
  };

  if (loading) return <div>Loading...</div>;

  if (!loading && !user) {
    return <div>{error}</div>;
  }
  return (
    <MainContainer>
      <section className='flex flex-col gap-10'>
        <h1 className='text-text-primary text-[32px] '>Hi, {user?.user_metadata.name}</h1>
        <div className='flex gap-5'>
          <Image
            src={user?.user_metadata.avatar_url ?? ""}
            width={64}
            height={64}
            alt='profile'
            className='rounded-full'
          />
          <ul>
            <li></li>
          </ul>
        </div>
        <Button variant={"dangerous"} onClick={handleExit}>
          Exit
        </Button>
      </section>
    </MainContainer>
  );
}

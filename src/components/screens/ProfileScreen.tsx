"use client";
import React from "react";
import MainContainer from "../ui/shared/containers/MainContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/redusers/userReducer";
import { redirect } from "next/navigation";
import DeleteDialog from "../ui/shared/dialog/DeleteDialog";
import P from "../ui/shared/text/P";
import ProfileSkeleton from "../ui/shared/skeletons/ProfileSkeleton";
import UserInfo from "../ui/blocks/profile/UserInfo";
import UserInfluence from "../ui/blocks/profile/UserInfluence";

export default function ProfileScreen() {
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(logoutUser());
    redirect("/");
  };

  return (
    <MainContainer className='min-h-[95dvh]'>
      {error || !user ? (
        <P variant={"error"}>{error}</P>
      ) : (
        <>
          <section className='flex flex-col justify-start items-start gap-4 lg:gap-10 lg:p-12 md:p-8 pb-4'>
            {loading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <UserInfo user={user} />
                <DeleteDialog
                  handleAction={handleExit}
                  description='You will be logged out of your account.'
                />
              </>
            )}
          </section>
          <UserInfluence />
        </>
      )}
    </MainContainer>
  );
}

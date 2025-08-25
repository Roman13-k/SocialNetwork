import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../../shared/buttons/button";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

export default function UserNav({
  setLoginModal,
}: {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-text-primary text-[22px] font-medium'>
        <Link href={"/"}>Twister</Link>
      </h2>
      <div className='flex gap-3 items-center'>
        {user == null ? (
          <Image src={"/user.png"} width={64} height={64} alt='profile' />
        ) : (
          <Link href={"/profile"}>
            <Image
              src={user.user_metadata.avatar_url ?? ""}
              width={64}
              height={64}
              alt='profile'
              className='rounded-full'
            />
          </Link>
        )}
        <Button onClick={() => setLoginModal(true)} size={"lg"}>
          Login
        </Button>
      </div>
    </div>
  );
}

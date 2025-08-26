import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../../shared/button";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

export default function UserNav({
  setLoginModal,
  hover,
}: {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
  hover: boolean;
}) {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-text-primary text-center font-medium'>
        {hover ? (
          <Link className='text-[22px]' href={"/"}>
            Twister
          </Link>
        ) : (
          <Link className='text-[32px] ' href={"/"}>
            T
          </Link>
        )}
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
        {hover && (
          <Button onClick={() => setLoginModal(true)} size={"lg"}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

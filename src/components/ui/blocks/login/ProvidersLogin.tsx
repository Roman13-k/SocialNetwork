import { LoginProviderType } from "@/types/login";
import Image from "next/image";
import React from "react";

export default function ProvidersLogin({
  handleLoginProvider,
}: {
  handleLoginProvider: (provider: LoginProviderType) => void;
}) {
  return (
    <div className='flex gap-5'>
      <button onClick={() => handleLoginProvider("google")} className='cursor-pointer'>
        <Image
          width={64}
          height={64}
          src={"/google.svg"}
          className='md:scale-100 scale-90'
          alt='google.svg'
        />
      </button>
      <button onClick={() => handleLoginProvider("github")} className='cursor-pointer'>
        <Image
          width={64}
          height={64}
          src={"/github.svg"}
          className='md:scale-100 scale-90'
          alt='github.svg'
        />
      </button>
    </div>
  );
}

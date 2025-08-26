"use cleint";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/redusers/userReducer";
import { LoginProviderType } from "@/types/login";
import ModalContainer from "../../shared/containers/ModalContainer";

export default function LoginModal({
  setLoginModal,
}: {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const handleLogin = (provider: LoginProviderType) => {
    dispatch(loginUser(provider));
    setLoginModal(false);
  };

  return (
    <ModalContainer onClose={() => setLoginModal(false)}>
      <h2 className='text-[22px] text-text-primary font-medium'>Login</h2>
      <div className='flex gap-5'>
        <button onClick={() => handleLogin("google")} className='cursor-pointer'>
          <Image width={64} height={64} src={"/google.svg"} alt='google.svg' />
        </button>
        <button onClick={() => handleLogin("github")} className='cursor-pointer'>
          <Image width={64} height={64} src={"/github.svg"} alt='github.svg' />
        </button>
      </div>
    </ModalContainer>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import Nav from "./Nav";
import LoginModal from "../../shared/modals/LoginModal";
import { useAppDispatch } from "@/store/hooks";
import { fetchSession } from "@/store/redusers/usersReducer";

export default function Header() {
  const [loginModal, setLoginModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);
  return (
    <>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
      <header className='flex flex-col gap-10 py-5 px-7 bg-background-secondary border-border border-r border-y rounded-r-md h-full min-h-screen'>
        <UserNav setLoginModal={setLoginModal} />
        <Nav />
      </header>
    </>
  );
}

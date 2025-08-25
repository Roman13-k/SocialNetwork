"use client";
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import Nav from "./Nav";
import LoginModal from "../../shared/modals/LoginModal";
import { useAppDispatch } from "@/store/hooks";
import { fetchSession } from "@/store/redusers/usersReducer";

export default function Header() {
  const [hover, setHover] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);
  return (
    <>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
      <header
        className={`flex flex-col gap-10 py-5 px-4 bg-background-secondary border-border border-r border-y rounded-r-md min-h-screen w-[80px] hover:w-[260px] transition-all ${
          hover ? "" : "delay-300"
        } duration-300 overflow-hidden`}
        onMouseEnter={() => setTimeout(() => setHover(true), 300)}
        onMouseLeave={() => setHover(false)}>
        <UserNav hover={hover} setLoginModal={setLoginModal} />
        <Nav hover={hover} />
      </header>
    </>
  );
}

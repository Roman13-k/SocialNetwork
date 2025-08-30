"use client";
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import Nav from "./Nav";
import { useAppDispatch } from "@/store/hooks";
import { fetchSession } from "@/store/redusers/userReducer";
import LoginModal from "../../blocks/login/LoginModal";
import { Button } from "../../shared/buttons/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [hover, setHover] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  useEffect(() => {
    if (burgerMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [burgerMenu]);

  return (
    <>
      {loginModal && <LoginModal setLoginModal={setLoginModal} />}
      {/* десктоп */}
      <header
        className={`hidden md:flex flex-col gap-10 py-5 px-4 bg-background-secondary border-border border-r border-y rounded-r-md min-h-screen w-[80px] hover:w-[260px] transition-all   
         duration-300 overflow-hidden`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <UserNav hover={hover} setLoginModal={setLoginModal} />
        <Nav hover={hover} />
      </header>

      {/* мобила */}
      {!burgerMenu && (
        <Button
          onClick={() => setBurgerMenu(true)}
          size={"icon"}
          className='md:hidden fixed z-40 top-7 right-6 rounded-full p-5'>
          <Menu color='white' />
        </Button>
      )}

      <header
        className={`${
          burgerMenu ? "scale-100" : "scale-0"
        } w-full h-full z-50 absolute top-0 left-0 md:hidden flex flex-col items-center gap-6 py-5 px-4 bg-background-secondary transition-all   
         duration-300 overflow-hidden`}>
        <Button
          onClick={() => setBurgerMenu(false)}
          size={"icon"}
          className='rounded-full p-5 ml-auto mr-1 mt-2'>
          <X color='white' />
        </Button>

        <UserNav setBurgerMenu={setBurgerMenu} setLoginModal={setLoginModal} />
        <Nav setBurgerMenu={setBurgerMenu} />
      </header>
    </>
  );
}

import { navData } from "@/utils/nav";
import Link from "next/link";
import React from "react";
import MainContainer from "../../shared/containers/MainContainer";
import P from "../../shared/text/P";

export default function Footer() {
  return (
    <footer className='bg-background-primary  text-gray-700 py-6 mt-auto border-t border-gray-300 '>
      <MainContainer>
        <div className='w-full flex items-center justify-between'>
          <nav className='flex flex-wrap gap-4 text-sm md:text-base'>
            {navData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='hover:text-blue-500 transition-colors'>
                {item.label}
              </Link>
            ))}
          </nav>

          <P size={"xs"} variant={"secondary"} className='mt-2'>
            &copy; {new Date().getFullYear()} Twister. All rights reserved.
          </P>
        </div>
      </MainContainer>
    </footer>
  );
}

import { navData } from "@/utils/nav";
import React from "react";

export default function Nav() {
  return (
    <nav>
      <ul className='flex flex-col gap-5 text-text-secondary font-medium text-[18px]'>
        {navData.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

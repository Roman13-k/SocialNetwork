import { navData } from "@/utils/nav";
import Image from "next/image";
import React from "react";

export default function Nav({ hover }: { hover: boolean }) {
  return (
    <nav>
      <ul className={`flex flex-col gap-5 font-medium text-[18px] ${hover ? "" : "items-center"}`}>
        {navData.map((item, index) => (
          <li className='flex gap-2 items-center' key={index}>
            <Image src={item.icon} alt='' width={30} height={30} />
            {hover && (
              <a className='text-text-secondary hover:text-accent' href={item.href}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

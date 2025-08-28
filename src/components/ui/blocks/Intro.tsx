import React from "react";
import Image from "next/image";
import { H1 } from "../shared/text/H";
import P from "../shared/text/P";

export default function Intro() {
  return (
    <section className='py-10 text-center flex flex-col items-center gap-4'>
      <Image
        src='/phoenix.svg'
        alt='Twister logo'
        width={120}
        height={120}
        className='rounded-full shadow-md'
      />
      <H1>Welcome to Twister</H1>
      <P variant={"secondary"} size={"lg"} className=' max-w-2xl'>
        Twister is your place for short and sharp thoughts. Post micro-messages, discover trending
        topics, and engage with the community. <br />
        Join the conversation and let your ideas twist around the world!
      </P>
    </section>
  );
}

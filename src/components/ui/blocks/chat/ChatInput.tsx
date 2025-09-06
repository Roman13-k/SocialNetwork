import React, { Dispatch, SetStateAction } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  handleNewMessage: () => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function ChatInput({ handleNewMessage, message, setMessage }: ChatInputProps) {
  return (
    <div className='relative w-full max-w-[768px] mx-auto'>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleNewMessage();
          }
        }}
        className='w-full md:py-3 py-1.5 px-2 md:pr-12 pr-6 border-3 border-accent rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Send a message...'
      />
      <button
        onClick={handleNewMessage}
        type='button'
        className='absolute right-3 top-1/2 -translate-y-1/2 text-accent hover:text-accent/90 cursor-pointer'>
        <Send size={35} />
      </button>
    </div>
  );
}

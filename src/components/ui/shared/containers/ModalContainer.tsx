"use client";
import React, { useEffect } from "react";

interface ModalContainerProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalContainer({ children, onClose }: ModalContainerProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div
      onClick={onClose}
      className='fixed z-50 h-full w-full bg-black/30 flex justify-center items-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-background-modal rounded-lg p-10 flex flex-col justify-center items-center gap-5'>
        {children}
      </div>
    </div>
  );
}

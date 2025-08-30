"use client";
import { useObserver } from "@/hooks/useObserver";
import { useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import React, { useRef } from "react";

type DispatchType = ThunkDispatch<RootState, unknown, UnknownAction>;

interface RenderWithInfinitiDataProps {
  children: React.ReactNode;
  offset: number | null;
  callback: () => Parameters<DispatchType>[0] | undefined;
  loading: boolean;
}

export default function RenderWithInfinityData({
  children,
  offset,
  callback,
  loading,
}: RenderWithInfinitiDataProps) {
  const dispatch = useAppDispatch();
  const divRef = useRef<HTMLDivElement | null>(null);

  const loadMore = () => {
    if (!loading && offset !== null) {
      const action = callback();
      if (action) {
        dispatch(action);
      }
    }
  };

  useObserver(loadMore, loading, divRef);

  return (
    <section className='flex flex-col w-full gap-4 items-center justify-center'>
      {children}
      <div className='block w-full h-4' ref={divRef}></div>
    </section>
  );
}

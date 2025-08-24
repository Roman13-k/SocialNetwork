"use client";
import { makeStore } from "@/store/store";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

export default function Providers({ children }: PropsWithChildren) {
  return <Provider store={makeStore()}>{children}</Provider>;
}

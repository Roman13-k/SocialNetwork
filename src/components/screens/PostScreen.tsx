"use client";
import { useParams } from "next/navigation";
import React from "react";
import MainContainer from "../ui/shared/containers/MainContainer";

export default function PostScreen() {
  const params = useParams();
  const postId = params.id;

  return <MainContainer>Post ID: {postId}</MainContainer>;
}

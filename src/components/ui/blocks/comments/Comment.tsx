import { CommentInterface } from "@/interfaces/comment";
import React from "react";

export default function Comment({ comment }: { comment: CommentInterface }) {
  return <div>{comment.content}</div>;
}

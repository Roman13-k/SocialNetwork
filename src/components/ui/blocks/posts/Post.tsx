import React from "react";

export default function Post({ post }: { post: any }) {
  return <div>{post.content}</div>;
}

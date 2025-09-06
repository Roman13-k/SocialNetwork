import PostScreen from "@/components/screens/PostScreen";
import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("user_id, content")
    .eq("id", id)
    .single();

  return {
    title: `${post?.user_id ?? "Post"} – Twister`,
    description: post?.content?.slice(0, 100) ?? "Post on Twister.",
  };
}

export default function page() {
  return <PostScreen />;
}

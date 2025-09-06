import ProfileScreen from "@/components/screens/ProfileScreen";
import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", id)
    .single();

  return {
    title: `Profile ${profile?.username} – Twister`,
    description: "Profile on Twister.",
    openGraph: {
      images: profile?.avatar_url ? [profile.avatar_url] : [],
    },
  };
}

export default function page() {
  return <ProfileScreen />;
}

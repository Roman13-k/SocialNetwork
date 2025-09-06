import ProfileScreen from "@/components/screens/ProfileScreen";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "My Profile – Twister",
  description: "View your posts, friends, and activity on Twister.",
};

export default function page() {
  return <ProfileScreen />;
}

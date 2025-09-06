import { supabase } from "@/lib/supabaseClient";
import type { MetadataRoute } from "next";

const URL = process.env.NEXT_PUBLIC_HOST_URL;

async function getPosts(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await supabase.from("posts").select("id");

  const routes: MetadataRoute.Sitemap =
    posts?.map((post) => ({
      url: `${URL}/post/${post.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })) ?? [];

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: URL ?? "/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${URL}/chats`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...(await getPosts()),
  ];
}

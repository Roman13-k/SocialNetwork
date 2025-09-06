import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/profile/", "/chats/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_HOST_URL}/sitemap.xml`,
  };
}

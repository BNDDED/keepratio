import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://keepratio.com/sitemap.xml",
    host: "https://keepratio.com",
  };
}

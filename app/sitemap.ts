import type { MetadataRoute } from "next";

const LAST_MODIFIED = "2026-10-17";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://keepratio.com/",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://keepratio.com/privacy/",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://keepratio.com/contact/",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

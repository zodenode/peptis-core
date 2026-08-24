import type { MetadataRoute } from "next";
import { blogPosts, getBlogPost } from "@/lib/peptis-content";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: "2026-08-24", changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/glp-continuity"), lastModified: "2026-08-24", changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: "2026-08-24", changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/editorial-policy"), lastModified: "2026-08-24", changeFrequency: "monthly", priority: 0.6 },
  ];

  const articles: MetadataRoute.Sitemap = blogPosts.map((summary) => {
    const post = getBlogPost(summary.slug);
    return {
      url: absoluteUrl(`/blog/${summary.slug}`),
      lastModified: post?.seo.updatedAt ?? "2026-08-24",
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl(summary.image)],
    };
  });

  return [...corePages, ...articles];
}

import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shikumi-lake.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/courses/fukugyo-ai",
    "/lessons/step1",
    "/lessons/step2",
    "/lessons/step3",
    "/lessons/step4",
    "/lessons/pitfalls",
    "/articles",
    "/articles/fukugyo-ai-start",
    "/community",
    "/privacy",
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : 0.7,
  }));
}

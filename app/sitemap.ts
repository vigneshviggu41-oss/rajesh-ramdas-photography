import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rajeshramdas.com";
  return [
    { url: base, lastModified: new Date() },
    ...projects.map((project) => ({ url: `${base}/stories/${project.slug}`, lastModified: new Date() })),
  ];
}

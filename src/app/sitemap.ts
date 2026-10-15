import type { MetadataRoute } from "next";
import { allIndex, SECTIONS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/methodology/`, lastModified: now, priority: 0.5 },
  ];
  for (const s of SECTIONS) {
    urls.push({ url: `${base}/${s.segment}/`, lastModified: now, priority: 0.7 });
  }
  for (const e of allIndex()) {
    if (e.segment === "home" || e.segment === "methodology") continue;
    urls.push({ url: `${base}/${e.segment}/${e.slug}/`, lastModified: now, priority: 0.6 });
  }
  return urls;
}

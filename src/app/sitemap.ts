import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({ url: `${siteUrl}/${locale}/` }));
}

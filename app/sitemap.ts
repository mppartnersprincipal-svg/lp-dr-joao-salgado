import type { MetadataRoute } from 'next';
import { SITE } from '@/config/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/privacidade`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}

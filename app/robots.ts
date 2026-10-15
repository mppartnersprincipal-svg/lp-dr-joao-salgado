import type { MetadataRoute } from 'next';
import { SITE } from '@/config/content';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/api/'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

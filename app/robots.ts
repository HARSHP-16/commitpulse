import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://commitpulse.vercel.app';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/documentation', '/dashboard/'],
      disallow: ['/api/', '/api/*'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

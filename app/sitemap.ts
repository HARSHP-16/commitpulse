import type { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import { User } from '@/models/User';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://commitpulse.vercel.app';

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/documentation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    if (process.env.MONGODB_URI) {
      await dbConnect();
      const users = await User.find({}).select('username').limit(5000).lean();

      users.forEach((user: { username: string }) => {
        routes.push({
          url: `${siteUrl}/dashboard/${user.username}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        });
      });
    }
  } catch (error) {
    console.error('Failed to generate sitemap for dashboard paths:', error);
  }

  return routes;
}

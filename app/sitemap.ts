import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-deployment-url.vercel.app', // Replace after deployment
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
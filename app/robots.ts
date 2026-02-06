import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Replace with your actual Vercel URL after deployment
    sitemap: 'https://your-deployment-url.vercel.app/sitemap.xml',
  };
}
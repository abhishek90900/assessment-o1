import { Metadata } from 'next';
import { ApiResponse } from '../types/blog';
import BlogClient from './components/BlogClient';

export const metadata: Metadata = {
  title: 'Tech Blog | Insights for Developers',
  description: 'SEO optimized blog with search and filter functionality.',
};

async function getBlogs() {
  const res = await fetch('https://sample-api-black.vercel.app/api/v1/blogs');
  const data: ApiResponse = await res.json();
  return data.blogs.slice(0, 10);
}

export default async function Home() {
  const blogs = await getBlogs();

  // Requirement: Add Article schema for blog posts
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": blogs.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": post.title,
        "image": post.photo_url,
        "datePublished": post.created_at
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <header className="container">
        <nav>
           <h1>Tech Blog</h1>
        </nav>
      </header>
      
      <main className="container">
        <BlogClient initialBlogs={blogs} />
      </main>

      <footer className="container">
        <p>&copy; 2026 Tech Blog</p>
      </footer>
    </>
  );
}
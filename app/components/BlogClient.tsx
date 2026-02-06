'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '../../types/blog';
import Image from 'next/image';

export default function BlogClient({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(initialBlogs.map(b => b.category)))];

  // Combined filtering (Search + Category)
  const filtered = initialBlogs.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.content_text.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || post.category === category;
    return matchesSearch && matchesCat;
  });

  // Close modal with ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedPost(null);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(filtered.map(post => ({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.photo_url,
            "datePublished": post.created_at,
            "author": { "@type": "Person", "name": "Tech Blog Author" }
          })))
        }}
      />

      <div className="controls">
        <input 
          type="search" 
          placeholder="Search articles by title, description or content..." 
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search articles"
        />
        
        <nav className="category-list" aria-label="Category filter">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)} 
              className={`category-btn ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </nav>
        <p className="results-count">{filtered.length} results found</p>
      </div>

      {filtered.length === 0 && <p className="no-results">No articles found matching your criteria.</p>}

      <div className="article-grid">
        {filtered.map((post, index) => (
          <article 
            key={post.id} 
            className="blog-card"
            onClick={() => setSelectedPost(post)}
            tabIndex={0} 
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPost(post)}
          >
            <Image 
              src={post.photo_url} 
              alt={`Cover photo for article: ${post.title}`} 
              width={400} 
              height={250} 
              className="blog-card-image"
              // LCP fix: priority for the first image
              priority={index === 0} 
              loading={index === 0 ? undefined : "lazy"} 
            />
            <div className="card-content">
              <h3>{post.title}</h3> 
              <p>{post.description.substring(0, 100)}...</p>
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}
              </time>
            </div>
          </article>
        ))}
      </div>

      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div 
            className="modal-content" 
            role="dialog" 
            aria-labelledby="modal-title" 
            onClick={e => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setSelectedPost(null)} aria-label="Close modal">&times;</button>
            <Image 
              src={selectedPost.photo_url} 
              alt={selectedPost.title} 
              width={800} 
              height={450} 
              className="modal-image"
              priority
            />
            <h2 id="modal-title" className="modal-title">{selectedPost.title}</h2>
            <div className="modal-body" dangerouslySetInnerHTML={{ __html: selectedPost.content_html }} />
          </div>
        </div>
      )}
    </section>
  );
}
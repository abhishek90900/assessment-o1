'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '../../types/blog';
import Image from 'next/image';
import styles from '../page.module.css';

export default function BlogClient({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', ...Array.from(new Set(initialBlogs.map(b => b.category)))];

  const filtered = initialBlogs.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase()) ||
      post.content_text.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || post.category === category;
    return matchesSearch && matchesCat;
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedPost(null);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <section>
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

      <div className={styles.controls}>
        <input 
          type="search" 
          placeholder="Search articles..." 
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search articles"
        />
        
        <nav className={styles.categoryList} aria-label="Category filter">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)} 
              className={`${styles.categoryBtn} ${category === cat ? styles.active : ''}`}
            >
              {cat}
            </button>
          ))}
        </nav>
        <p className={styles.resultsCount}>{filtered.length} results found</p>
      </div>

      {filtered.length === 0 && <p className={styles.noResults}>No articles found.</p>}

      <div className={styles.articleGrid}>
        {filtered.map((post, index) => (
          <article 
            key={post.id} 
            className={styles.blogCard}
            onClick={() => setSelectedPost(post)}
            tabIndex={0} 
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPost(post)}
          >
            <div className={styles.cardImageWrapper}>
                <Image 
                src={post.photo_url} 
                alt={post.title} 
                width={400} 
                height={250} 
                className={styles.cardImage}
                priority={index === 0} 
                loading={index === 0 ? undefined : "lazy"} 
                />
            </div>
            <div className={styles.cardContent}>
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
        <div className={styles.modalOverlay} onClick={() => setSelectedPost(null)}>
          <div 
            className={styles.modalContent} 
            role="dialog" 
            aria-labelledby="modal-title" 
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => setSelectedPost(null)} aria-label="Close modal">&times;</button>
            <div className={styles.modalImageWrapper}>
                <Image 
                src={selectedPost.photo_url} 
                alt={selectedPost.title} 
                width={800} 
                height={450} 
                className={styles.modalImage}
                priority
                />
            </div>
            <h2 id="modal-title" className={styles.modalTitle}>{selectedPost.title}</h2>
            <div className={styles.modalBody} dangerouslySetInnerHTML={{ __html: selectedPost.content_html }} />
          </div>
        </div>
      )}
    </section>
  );
}
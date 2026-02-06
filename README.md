#Tech Blog - Frontend Technical Assessment

A high-performance, SEO-optimized tech blog built using Next.js, TypeScript, and CSS Modules. This project was developed as a technical assessment to demonstrate modern web development practices.


🚀 Links
 * Live Demo: [https://assessment-o1-abhishek-mukherjee.vercel.app/](https://assessment-o1.vercel.app/)
 * GitHub Repository: https://github.com/abhishek90900/assessment-o1
   
🛠️ Technology Stack
 * Framework: Next.js (Latest App Router)
 * Language: TypeScript (Type-safe development)
 * Styling: CSS Modules (Ensuring clean code and zero inline-style overhead)
 * Deployment: Vercel
   
📊 Lighthouse Audit Results
The application was tested in an Incognito window to ensure accuracy, meeting all technical performance targets:
 * SEO: 100/100
 * Accessibility: 98/100
 * Best Practices: 96/100
 * Performance: 90+ (Optimized in production build)
(Note: Ensure you have placed your lighthouse screenshots in the /screenshots directory of your project as required by the brief.)

🔍 SEO Strategy
1. Meta Tags Implementation
Implemented dynamic metadata using Next.js Metadata API. This includes:
 * Page Titles: Optimized under 60 characters for SERP readability.
 * Meta Descriptions: Concise summaries under 160 characters to improve CTR.
 * Open Graph (OG) & Twitter Cards: Configured for enhanced social media sharing with preview images and titles.
2. Semantic HTML
Structured the content using HTML5 semantic elements to help search engine crawlers understand the page hierarchy:
 * Used <header>, <main>, <section>, and <footer> for layout.
 * Implemented <article> tags for each blog post in the grid.
 * Used <nav> for category filtering and <time> for properly formatted publication dates.
 * Strictly followed heading hierarchy (H1 -> H2 -> H3) with only one H1 per page.
3. Structured Data (JSON-LD)
Integrated Schema.org structured data to enable rich snippets:
 * WebSite Schema: Added to the homepage to define the site structure.
 * BlogPosting Schema: Dynamically generated for each article to help Google identify blog content, authors, and publication dates.
4. Image Optimization
Leveraged the next/image component to achieve:
 * Priority Loading: Used the priority attribute for Above-the-Fold (LCP) images to reduce Largest Contentful Paint time.
 * Lazy Loading: Automatically enabled for off-screen images to save bandwidth.
 * Descriptive Alt Text: Every image contains meaningful descriptions for better accessibility and image SEO.
   
💡 Implementation Approach
 * Search & Filter: Built a combined filtering system where users can search across titles, descriptions, and full content text while simultaneously filtering by unique categories fetched from the API.
 * Performance Tuning: Reduced Total Blocking Time (TBT) by eliminating inline styles and moving all styling to modular CSS, ensuring the main thread remains responsive.
 * Keyboard Navigation: Fully accessible modal and grid navigation using Tab, Enter, and ESC keys.
   
⚠️ Challenges Faced
 * LCP Warning: Initially, the first blog image caused a Lighthouse warning. This was resolved by implementing conditional priority based on the article index.
 * Inline Style Overhead: Solved CSS validation issues and performance lag by migrating from inline React styles to a scoped CSS Module approach.

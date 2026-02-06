import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// SEO Metadata আপডেট করা হয়েছে
export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'), // লোকাল হোস্টের জন্য, লাইভ করার সময় ইউআরএল পাল্টে দেবেন
  title: "Tech Blog | Insights for Modern Developers", 
  description: "Stay ahead with the latest trends in software engineering, AI, and web development through expert-led articles.",
  openGraph: {
    title: "Tech Blog - Innovations and Tech Trends",
    description: "Expert articles on modern software engineering.",
    images: ["/next.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog Insights",
    description: "Latest trends in software development.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tech Blog",
    "url": "https://your-live-link.vercel.app", 
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
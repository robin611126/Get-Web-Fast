import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML supported
  coverImage: string;
  author: string;
  publishedAt: string;
  status: 'draft' | 'published';
  category: string;
  tags: string[];
  readTime: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

const STORAGE_KEY = 'gwf_cms_posts';
const AUTH_KEY = 'gwf_cms_auth';

// --- Initial Data ---
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Why Your Small Business Needs a High-Performance Website",
    slug: "small-business-high-performance-website",
    excerpt: "In 2025, a slow website is a lost customer. Learn why performance is the new currency of the web.",
    content: "<h2>The Speed Imperative</h2><p>Did you know that 53% of mobile users abandon sites that take longer than 3 seconds to load? For a small business, this isn't just a metric; it's lost revenue.</p><h3>SEO Benefits</h3><p>Google has made it clear: Core Web Vitals are a ranking factor. A high-performance site doesn't just please users; it pleases the algorithms that bring you users.</p><blockquote>Speed is not a feature, it's a requirement.</blockquote>",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    author: "Shivam Welfort",
    publishedAt: new Date().toISOString(),
    status: 'published',
    category: "Small Business Growth",
    tags: ["Performance", "Sales", "Growth"],
    readTime: "5 min read",
    seo: {
      metaTitle: "High Performance Websites for Small Business | GWF",
      metaDescription: "Discover how a fast website drives sales and improves SEO ranking for small businesses."
    }
  },
  {
    id: '2',
    title: "The Ultimate Guide to Startup Branding in 2025",
    slug: "startup-branding-guide-2025",
    excerpt: "Branding is more than a logo. It's the story people tell about you when you're not in the room.",
    content: "<h2>Identity First</h2><p>Your brand identity is the visual and verbal expression of your brand. It includes your logo, typography, colors, and voice.</p><ul><li>Consistency is key</li><li>Emotion drives decisions</li><li>Stand out, don't blend in</li></ul>",
    coverImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop",
    author: "Faishal Ahmad",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'published',
    category: "Startup Branding",
    tags: ["Design", "Identity", "Marketing"],
    readTime: "7 min read",
    seo: {
      metaTitle: "Startup Branding Guide 2025",
      metaDescription: "A comprehensive guide to building a brand that lasts in the modern startup ecosystem."
    }
  },
  {
    id: '3',
    title: "React vs. WordPress: What Should You Choose?",
    slug: "react-vs-wordpress-comparison",
    excerpt: "The age-old debate. We break down the pros and cons for modern business needs.",
    content: "<p>WordPress powers 40% of the web, but React powers the modern web app experience. Which one fits your business model?</p><h3>When to use React</h3><p>If you need high interactivity, app-like feel, and total control.</p><h3>When to use WordPress</h3><p>If you need a simple blog or a standard marketing site with a heavy reliance on plugins.</p>",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    author: "Tech Team",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'published',
    category: "Website Development",
    tags: ["Tech", "Comparison", "CMS"],
    readTime: "6 min read",
    seo: {
      metaTitle: "React vs WordPress for Business",
      metaDescription: "Comparing headless tech vs traditional CMS for 2025 business needs."
    }
  },
  {
    id: '4',
    title: "5 UI/UX Trends Defining the Next Decade",
    slug: "ui-ux-trends-next-decade",
    excerpt: "From glassmorphism to spatial design, here is what the future looks like.",
    content: "<p>Design never sleeps. We are seeing a shift towards:</p><ol><li>Immersive 3D elements</li><li>Dark mode as a standard</li><li>Micro-interactions</li></ol>",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    author: "Design Lead",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    status: 'published',
    category: "UI/UX",
    tags: ["Design", "Trends", "Future"],
    readTime: "4 min read",
    seo: {
      metaTitle: "Top UI/UX Trends 2025",
      metaDescription: "Stay ahead of the curve with these emerging design trends."
    }
  },
  {
    id: '5',
    title: "SEO Basics: How to Rank Without Breaking the Bank",
    slug: "seo-basics-ranking-guide",
    excerpt: "You don't need a $5k/month agency to get started with good SEO practices.",
    content: "<p>SEO is about relevance and authority.</p><h2>On-Page Optimization</h2><p>Start with your titles, meta descriptions, and header tags. Make sure your content actually answers the user's intent.</p>",
    coverImage: "https://images.unsplash.com/photo-1571721795195-a2d057279102?q=80&w=2000&auto=format&fit=crop",
    author: "Growth Team",
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    status: 'draft',
    category: "SEO Basics",
    tags: ["Marketing", "Google", "Traffic"],
    readTime: "8 min read",
    seo: {
      metaTitle: "SEO Basics Guide",
      metaDescription: "Simple steps to improve your ranking today."
    }
  }
];

// --- CMS Service ---

export const cms = {
  // Initialize storage if empty
  init: () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
    }
  },

  getAllPosts: (): BlogPost[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getPublishedPosts: (): BlogPost[] => {
    const posts = cms.getAllPosts();
    return posts.filter(p => p.status === 'published').sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  },

  getPostBySlug: (slug: string): BlogPost | undefined => {
    const posts = cms.getAllPosts();
    return posts.find(p => p.slug === slug);
  },

  getPostById: (id: string): BlogPost | undefined => {
    const posts = cms.getAllPosts();
    return posts.find(p => p.id === id);
  },

  savePost: (post: Partial<BlogPost> & { id?: string }): BlogPost => {
    const posts = cms.getAllPosts();
    let newPost: BlogPost;

    if (post.id) {
      // Update
      const index = posts.findIndex(p => p.id === post.id);
      if (index === -1) throw new Error("Post not found");
      newPost = { ...posts[index], ...post } as BlogPost;
      posts[index] = newPost;
    } else {
      // Create
      newPost = {
        id: uuidv4(),
        publishedAt: new Date().toISOString(),
        status: 'draft',
        ...post
      } as BlogPost;
      posts.push(newPost);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return newPost;
  },

  deletePost: (id: string) => {
    const posts = cms.getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // --- Auth (Mock) ---
  login: (email: string, pass: string): boolean => {
    // Hardcoded for demo purposes as requested
    if (email === 'admin@getwebfast.com' && pass === 'password') {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }
};

// Initialize on load
if (typeof window !== 'undefined') {
  cms.init();
}

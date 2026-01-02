import { useParams, Link } from 'react-router-dom';
import { cms, BlogPost } from '../lib/cms';
import { Navbar } from '../components/LandingPage';
import { format } from 'date-fns';
import { Clock, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

import { useState, useEffect } from 'react';
import { SEO } from '../lib/seo';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      cms.getPostBySlug(slug).then(p => {
        setPost(p || null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">Loading article...</div>;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center flex-col">
        <SEO title="404 - Article Not Found" description="The article you are looking for does not exist." />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-slate-400 mb-8">Article not found.</p>
        <Link to="/blog" className="text-blue-400 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`https://www.getwebfast.online/blog/${slug}`}
        type="article"
      />
      <Navbar />

      <article className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-slate-400 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden mb-12 aspect-video border border-white/10">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-blue-400 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags & Share */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 font-medium">Share:</span>
            <div className="flex gap-2">
              <a href={`https://twitter.com/intent/tweet?text=${post.title}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#1DA1F2] hover:text-white transition-colors text-slate-400">
                <Twitter size={18} />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#0077B5] hover:text-white transition-colors text-slate-400">
                <Linkedin size={18} />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white transition-colors text-slate-400">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SinglePost;
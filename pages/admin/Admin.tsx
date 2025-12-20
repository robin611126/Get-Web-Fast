import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import { cms, BlogPost, ServiceItem, ProjectItem, TestimonialItem } from '../../lib/cms';
import {
  LayoutDashboard, Plus, LogOut, Edit, Trash2,
  Save, Eye, ArrowLeft, Image as ImageIcon, Settings,
  Briefcase, Code, MessageCircle, Menu, X
} from 'lucide-react';

// --- Image Uploader Component ---
const ImageUploader = ({ value, onChange, label }: { value: string, onChange: (url: string) => void, label: string }) => {
  const [uploading, setUploading] = useState(false);
  const id = React.useId();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    try {
      const url = await cms.uploadImage(e.target.files[0]);
      onChange(url);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm text-slate-400 mb-2 font-semibold">
        <ImageIcon size={14} /> {label}
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload file"
            className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={id}
          />
          <label
            htmlFor={id}
            className={`px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-xs font-bold cursor-pointer text-white transition-colors flex items-center justify-center whitespace-nowrap ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {uploading ? '...' : 'Upload'}
          </label>
        </div>
      </div>
      {value && <img src={value} className="mt-2 rounded-lg h-32 w-full object-cover border border-white/10" />}
    </div>
  );
};

// --- Login Component ---
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = await cms.login(email, password);
      if (success) {
        onLogin();
      } else {
        setError('Invalid credentials');
      }
    } else {
      const success = await cms.signUp(email, password);
      if (success) {
        alert('Account created! Please sign in.');
        setIsLogin(true);
      } else {
        setError('Signup failed. See console.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0A0A12] border border-white/10 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">{isLogin ? 'CMS Access' : 'Create Admin'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="admin@getwebfast.com"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-slate-400 hover:text-white underline"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Posts Manager (formerly Dashboard) ---
const PostsManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await cms.getAllPosts();
    setPosts(data);
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await cms.deletePost(id);
      loadPosts();
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Posts</h1>
        <button
          onClick={() => navigate('/admin/editor/new')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-[#0F0E1F] border border-white/10 p-4 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-800 rounded-lg overflow-hidden hidden sm:block">
                <img src={post.coverImage} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{post.title}</h3>
                <div className="flex gap-2 text-xs text-slate-400 mt-1">
                  <span className={`px-2 py-0.5 rounded-full ${post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {post.status.toUpperCase()}
                  </span>
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/admin/editor/${post.id}`)} className="p-2 hover:bg-white/10 rounded-lg text-slate-300">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-white/5 rounded-xl border border-white/10">
            No posts found. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
};

// --- Post Editor ---
const PostEditor = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    status: 'draft',
    coverImage: '',
    category: '',
    tags: [],
    readTime: '5 min read',
    excerpt: '',
    author: 'Admin',
    seo: { metaTitle: '', metaDescription: '' }
  });

  useEffect(() => {
    const loadPost = async () => {
      if (id && id !== 'new') {
        const existing = await cms.getPostById(id);
        if (existing) {
          setPost(existing);
        } else {
          console.warn(`Post with ID ${id} not found.`);
        }
      }
      setLoading(false);
    }
    loadPost();
  }, [id]);

  const handleSave = async () => {
    if (!post.title) return alert('Title is required');

    try {
      await cms.savePost({ ...post, id: id === 'new' ? undefined : id });
      navigate('/admin');
    } catch (e) {
      console.error("Failed to save post:", e);
      alert("Failed to save post. Please try again.");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading editor...</div>;

  return (
    <div className="flex flex-col h-screen bg-[#030014]">
      {/* Editor Toolbar */}
      <div className="h-16 border-b border-white/10 bg-[#0A0A12] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <span className="text-white font-bold">{id === 'new' ? 'Create Post' : 'Edit Post'}</span>
        </div>
        <div className="flex gap-3">
          <select
            value={post.status}
            onChange={(e) => setPost({ ...post, status: e.target.value as any })}
            className="bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm font-bold transition-colors">
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 border-r border-white/10 order-1">
          <div className="max-w-3xl mx-auto space-y-6">
            <input
              type="text"
              placeholder="Post Title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })}
              className="w-full bg-transparent text-3xl md:text-4xl font-bold text-white placeholder-slate-600 outline-none"
            />

            <div className="prose prose-invert max-w-none">
              <label className="block text-xs uppercase tracking-wide text-slate-500 font-bold mb-2">Content (HTML)</label>
              <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                placeholder="<p>Start writing your masterpiece...</p>"
                className="w-full h-[50vh] lg:h-[60vh] bg-white/5 rounded-xl p-4 text-slate-300 font-mono text-sm outline-none border border-white/10 focus:border-blue-500/50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="w-full lg:w-80 bg-[#0A0A12] overflow-y-auto p-6 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 order-2 h-auto max-h-[40vh] lg:max-h-full lg:h-full">

          {/* Cover Image */}
          <ImageUploader
            label="Cover Image"
            value={post.coverImage || ''}
            onChange={(url) => setPost({ ...post, coverImage: url })}
          />

          {/* Metadata */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Excerpt</label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Author</label>
                <input
                  type="text"
                  value={post.author}
                  onChange={(e) => setPost({ ...post, author: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Publish Date</label>
                <input
                  type="datetime-local"
                  value={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''}
                  onChange={(e) => setPost({ ...post, publishedAt: new Date(e.target.value).toISOString() })}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={post.category}
                  onChange={(e) => setPost({ ...post, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Read Time</label>
                <input
                  type="text"
                  value={post.readTime}
                  onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={post.tags?.join(', ')}
                onChange={(e) => setPost({ ...post, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Settings size={14} /> SEO Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Meta Title</label>
                <input
                  type="text"
                  value={post.seo?.metaTitle}
                  onChange={(e) => setPost({ ...post, seo: { ...post.seo, metaTitle: e.target.value } as any })}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  value={post.seo?.metaDescription}
                  onChange={(e) => setPost({ ...post, seo: { ...post.seo, metaDescription: e.target.value } as any })}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


// --- Services Manager ---
const ServicesManager = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const data = await cms.getAllServices();
    setServices(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this service?')) {
      await cms.deleteService(id);
      loadServices();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Services</h1>
        <button onClick={() => navigate('/admin/services/new')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus size={18} /> New Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s => (
          <div key={s.id} className="bg-[#0F0E1F] border border-white/10 p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                {s.is_premium && <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded">Premium</span>}
              </div>
              <p className="text-slate-400 text-sm mb-4">{s.description}</p>
              <div className="text-2xl font-bold text-white mb-4">{s.price}</div>
            </div>
            <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-white/5">
              <button onClick={() => navigate(`/admin/services/${s.id}`)} className="p-2 hover:bg-white/10 rounded-lg text-slate-300">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceEditor = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<Partial<ServiceItem>>({
    title: '', price: '', description: '', features: [], time: '', best_for: '',
    is_premium: false, icon_name: 'Rocket',
    discount_percent: 0, original_price: '', tags: [], coupon_code: ''
  });

  useEffect(() => {
    if (id && id !== 'new') {
      cms.getAllServices().then(services => {
        const found = services.find(s => s.id === id);
        if (found) setService(found);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await cms.saveService({ ...service, id: id === 'new' ? undefined : id });
      navigate('/admin/services');
    } catch (e: any) {
      console.error(e);
      alert('Error saving service: ' + (e.message || e.error_description || 'Unknown error'));
    }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#030014]">
      <div className="h-16 border-b border-white/10 bg-[#0A0A12] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/services" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <span className="text-white font-bold">{id === 'new' ? 'New Service' : 'Edit Service'}</span>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2"><Save size={16} /> Save</button>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Service Title</label>
                <input type="text" placeholder="e.g. Business Website" value={service.title} onChange={e => setService({ ...service, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Final Price</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹2,999"
                    value={service.price}
                    onChange={e => {
                      const val = e.target.value;
                      const newPrice = val && !val.startsWith('₹') && !isNaN(parseInt(val[0])) ? '₹' + val : val;

                      const finalVal = parseFloat(newPrice.replace(/[^0-9.]/g, '') || '0');
                      const origVal = parseFloat(service.original_price?.replace(/[^0-9.]/g, '') || '0');
                      let newDiscount = service.discount_percent;

                      if (origVal > finalVal && finalVal > 0) {
                        newDiscount = Math.round(((origVal - finalVal) / origVal) * 100);
                      }

                      setService({ ...service, price: newPrice, discount_percent: newDiscount });
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Original Price</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹5,999"
                    value={service.original_price}
                    onChange={e => {
                      const val = e.target.value;
                      const newOrig = val && !val.startsWith('₹') && !isNaN(parseInt(val[0])) ? '₹' + val : val;

                      const finalVal = parseFloat(service.price?.replace(/[^0-9.]/g, '') || '0');
                      const origVal = parseFloat(newOrig.replace(/[^0-9.]/g, '') || '0');
                      let newDiscount = service.discount_percent;

                      if (origVal > finalVal && finalVal > 0) {
                        newDiscount = Math.round(((origVal - finalVal) / origVal) * 100);
                      }

                      setService({ ...service, original_price: newOrig, discount_percent: newDiscount });
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Short Description</label>
                <textarea placeholder="Briefly describe the service..." rows={4} value={service.description} onChange={e => setService({ ...service, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Features (One per line)</label>
                <textarea rows={8} value={service.features?.join('\n')} onChange={e => setService({ ...service, features: e.target.value.split('\n') })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none resize-none font-mono text-sm" placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3" />
              </div>
            </div>
          </div>

          {/* Details & Customization */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Settings size={18} /> Configuration</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Delivery Time</label>
                <input type="text" placeholder="e.g. 3-5 Days" value={service.time} onChange={e => setService({ ...service, time: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Best For</label>
                <input type="text" placeholder="e.g. Startups, Bloggers" value={service.best_for} onChange={e => setService({ ...service, best_for: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Coupon Code</label>
                <input type="text" placeholder="e.g. WELCOME20" value={service.coupon_code} onChange={e => setService({ ...service, coupon_code: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Discount (%)</label>
                <input type="number" placeholder="e.g. 20" value={service.discount_percent} onChange={e => setService({ ...service, discount_percent: parseInt(e.target.value) || 0 })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Tags (Comma separated)</label>
                <input type="text" placeholder="Most Popular, Value for Money" value={service.tags?.join(', ')} onChange={e => setService({ ...service, tags: e.target.value.split(',').map(t => t.trim()) })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              <div className="flex-1">
                <label className="block text-sm text-slate-400 mb-2">Icon</label>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                    <Briefcase size={24} />
                    {/* Note: Dynamic icon preview requires dynamic import or mapping helper, keeping simple for now */}
                  </div>
                  <select value={service.icon_name} onChange={e => setService({ ...service, icon_name: e.target.value })} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none">
                    {['Rocket', 'Briefcase', 'ShoppingBag', 'Users', 'Code', 'Smartphone', 'Globe', 'Lock', 'Zap', 'Star'].map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input type="checkbox" id="premium" checked={service.is_premium} onChange={e => setService({ ...service, is_premium: e.target.checked })} className="peer sr-only" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
                <label htmlFor="premium" className="text-sm font-medium text-slate-300 cursor-pointer select-none">Mark as Premium Service</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Projects Manager ---
const ProjectsManager = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);
  const load = async () => { const data = await cms.getAllProjects(); setProjects(data); };
  const handleDelete = async (id: string) => { if (confirm('Delete?')) { await cms.deleteProject(id); load(); } };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <button onClick={() => navigate('/admin/projects/new')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"><Plus size={18} /> New Project</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-[#0F0E1F] border border-white/10 rounded-xl overflow-hidden group">
            <div className="h-48 overflow-hidden relative">
              <img src={p.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => navigate(`/admin/projects/${p.id}`)} className="p-2 bg-white/10 rounded-full text-white"><Edit size={18} /></button>
                <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/20 rounded-full text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold">{p.name}</h3>
              <p className="text-slate-400 text-sm">{p.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectEditor = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Partial<ProjectItem>>({
    name: '', category: '', description: '', image: '', bg_class: 'bg-slate-800'
  });

  useEffect(() => {
    if (id && id !== 'new') {
      cms.getAllProjects().then(projs => {
        const found = projs.find(p => p.id === id);
        if (found) setProject(found);
        setLoading(false);
      });
    } else { setLoading(false); }
  }, [id]);

  const handleSave = async () => {
    try {
      await cms.saveProject({ ...project, id: id === 'new' ? undefined : id });
      navigate('/admin/projects');
    } catch (e) { alert('Error'); }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#030014]">
      <div className="h-16 border-b border-white/10 bg-[#0A0A12] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <span className="text-white font-bold">{id === 'new' ? 'New Project' : 'Edit Project'}</span>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2"><Save size={16} /> Save</button>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Project Name</label>
                <input type="text" placeholder="Project Name" value={project.name} onChange={e => setProject({ ...project, name: e.target.value, slug: project.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Slug</label>
                <input type="text" placeholder="slug" value={project.slug} onChange={e => setProject({ ...project, slug: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Category</label>
                <input type="text" placeholder="Category" value={project.category} onChange={e => setProject({ ...project, category: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Short Description</label>
                <textarea placeholder="Description" rows={3} value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Client Name</label>
                <input type="text" placeholder="Client Name" value={project.client_name} onChange={e => setProject({ ...project, client_name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Live URL</label>
                <input type="text" placeholder="https://..." value={project.live_url} onChange={e => setProject({ ...project, live_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <ImageUploader
                  label="Cover Image"
                  value={project.image || ''}
                  onChange={(url) => setProject({ ...project, image: url })}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Background Class</label>
                <input type="text" placeholder="bg-slate-800" value={project.bg_class} onChange={e => setProject({ ...project, bg_class: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
            <h3 className="text-white font-bold text-lg">Case Study Details</h3>

            <div>
              <label className="block text-sm text-slate-400 mb-1">The Challenge</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="What was the problem?" value={project.challenge} onChange={e => setProject({ ...project, challenge: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">The Solution</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="How did we solve it?" value={project.solution} onChange={e => setProject({ ...project, solution: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">The Results</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" placeholder="What was the outcome?" value={project.results} onChange={e => setProject({ ...project, results: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Tech Stack (comma separated)</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" value={project.tech_stack?.join(', ')} onChange={e => setProject({ ...project, tech_stack: e.target.value.split(',').map(s => s.trim()) })} />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Gallery Images (comma separated URLs)</label>
              <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" value={project.gallery_images?.join(', ')} onChange={e => setProject({ ...project, gallery_images: e.target.value.split(',').map(s => s.trim()) })} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Testimonials Manager ---
const TestimonialsManager = () => {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);
  const load = async () => { const data = await cms.getAllTestimonials(); setItems(data); };
  const handleDelete = async (id: string) => { if (confirm('Delete?')) { await cms.deleteTestimonial(id); load(); } };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Testimonials</h1>
        <button onClick={() => navigate('/admin/testimonials/new')} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"><Plus size={18} /> New Testimonial</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-[#0F0E1F] border border-white/10 p-6 rounded-xl flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm line-clamp-3">"{item.text}"</p>
            <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-white/5">
              <button onClick={() => navigate(`/admin/testimonials/${item.id}`)} className="p-2 hover:bg-white/10 rounded-lg text-slate-300"><Edit size={18} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialEditor = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Partial<TestimonialItem>>({
    name: '', role: '', text: '', image: '', rating: 5
  });

  useEffect(() => {
    if (id && id !== 'new') {
      cms.getAllTestimonials().then(items => {
        const found = items.find(i => i.id === id);
        if (found) setItem(found);
        setLoading(false);
      });
    } else { setLoading(false); }
  }, [id]);

  const handleSave = async () => {
    try {
      await cms.saveTestimonial({ ...item, id: id === 'new' ? undefined : id });
      navigate('/admin/testimonials');
    } catch (e) { alert('Error'); }
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="h-screen flex flex-col bg-[#030014]">
      <div className="h-16 border-b border-white/10 bg-[#0A0A12] flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/testimonials" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
          <span className="text-white font-bold">{id === 'new' ? 'New Testimonial' : 'Edit Testimonial'}</span>
        </div>
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2"><Save size={16} /> Save</button>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <input type="text" placeholder="Client Name" value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <input type="text" placeholder="Role / Company" value={item.role} onChange={e => setItem({ ...item, role: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <textarea placeholder="Testimonial Text" rows={4} value={item.text} onChange={e => setItem({ ...item, text: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
          <ImageUploader
            label="Avatar Image"
            value={item.image || ''}
            onChange={(url) => setItem({ ...item, image: url })}
          />

          <div>
            <label className="text-slate-400 text-sm mb-1 block">Rating (1-5)</label>
            <input type="number" min="1" max="5" value={item.rating} onChange={e => setItem({ ...item, rating: parseInt(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Components ---
const SidebarItem = ({ to, icon: Icon, label, onClick }: any) => (
  <Link to={to} onClick={onClick} className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors">
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

// --- Main Admin Layout ---
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cms.isAuthenticated().then(auth => {
      setIsAuthenticated(auth);
      setCheckingAuth(false);
    }).catch(e => {
      console.error("Auth check failed", e);
      setCheckingAuth(false);
    });
  }, []);

  const handleLogout = async () => {
    await cms.logout();
    setIsAuthenticated(false);
  };

  if (checkingAuth) return <div className="h-screen bg-[#030014] flex items-center justify-center text-white">Checking auth...</div>;

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#030014] text-white font-sans overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0A0A12] border-b border-white/10 z-50 flex items-center justify-between px-4">
        <div className="font-bold text-lg">GWF Admin</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0A0A12] border-r border-white/10 transform transition-transform duration-300 ease-in-out pt-20 md:pt-6
        md:translate-x-0 md:static md:w-64
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="px-6 mb-8 flex items-center gap-3 hidden md:flex">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">GWF</div>
              <span className="font-bold text-lg">CMS</span>
            </div>
            <nav className="space-y-1 px-3">
              <SidebarItem to="/admin" icon={LayoutDashboard} label="Posts" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/admin/services" icon={Briefcase} label="Services" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/admin/projects" icon={Code} label="Projects" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/admin/testimonials" icon={MessageCircle} label="Testimonials" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/" icon={Eye} label="View Live Site" onClick={() => setIsMobileMenuOpen(false)} />
            </nav>
          </div>
          <div className="px-3 pb-6">
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg w-full transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0 relative w-full">
        {/* Overlay for mobile when sidebar is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <Routes>
          <Route path="/" element={<PostsManager />} />
          <Route path="/services" element={<ServicesManager />} />
          <Route path="/services/:id" element={<ServiceEditorWithParams />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/projects/:id" element={<ProjectEditorWithParams />} />
          <Route path="/testimonials" element={<TestimonialsManager />} />
          <Route path="/testimonials/:id" element={<TestimonialEditorWithParams />} />
          <Route path="/editor/:id" element={<PostEditorWithParams />} />
        </Routes>
      </main>
    </div>
  );
};

const PostEditorWithParams = () => {
  const { id } = useParams();
  return <PostEditor id={id} />;
}
const ServiceEditorWithParams = () => {
  const { id } = useParams();
  return <ServiceEditor id={id} />;
}
const ProjectEditorWithParams = () => {
  const { id } = useParams();
  return <ProjectEditor id={id} />;
}
const TestimonialEditorWithParams = () => {
  const { id } = useParams();
  return <TestimonialEditor id={id} />;
}

export default Admin;
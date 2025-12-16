import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import { cms, BlogPost } from '../../lib/cms';
import { 
  LayoutDashboard, Plus, LogOut, Edit, Trash2, 
  Save, Eye, ArrowLeft, Image as ImageIcon, Settings
} from 'lucide-react';

// --- Login Component ---
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cms.login(email, password)) {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0A0A12] border border-white/10 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">CMS Access</h2>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
const Dashboard = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(cms.getAllPosts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      cms.deletePost(id);
      setPosts(cms.getAllPosts());
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button 
          onClick={() => navigate('/admin/editor/new')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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

// --- Editor Component (CMS Core) ---
const Editor = ({ id }: { id?: string }) => {
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
    if (id && id !== 'new') {
      const existing = cms.getPostById(id);
      if (existing) {
        setPost(existing);
      } else {
        // Fallback if ID is invalid, though routing should prevent this mostly
        console.warn(`Post with ID ${id} not found.`);
      }
    }
    setLoading(false);
  }, [id]);

  const handleSave = () => {
    if (!post.title) return alert('Title is required');
    
    try {
        cms.savePost({ ...post, id: id === 'new' ? undefined : id });
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
            onChange={(e) => setPost({...post, status: e.target.value as any})}
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

      <div className="flex flex-1 overflow-hidden">
        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto p-8 border-r border-white/10">
          <div className="max-w-3xl mx-auto space-y-6">
            <input 
              type="text" 
              placeholder="Post Title" 
              value={post.title}
              onChange={(e) => setPost({...post, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')})}
              className="w-full bg-transparent text-4xl font-bold text-white placeholder-slate-600 outline-none"
            />
            
            <div className="prose prose-invert max-w-none">
              <label className="block text-xs uppercase tracking-wide text-slate-500 font-bold mb-2">Content (HTML)</label>
              <textarea 
                value={post.content}
                onChange={(e) => setPost({...post, content: e.target.value})}
                placeholder="<p>Start writing your masterpiece...</p>"
                className="w-full h-[60vh] bg-white/5 rounded-xl p-4 text-slate-300 font-mono text-sm outline-none border border-white/10 focus:border-blue-500/50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="w-80 bg-[#0A0A12] overflow-y-auto p-6 space-y-6">
          
          {/* Cover Image */}
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-400 mb-2 font-semibold">
              <ImageIcon size={14} /> Cover Image URL
            </label>
            <input 
              type="text"
              value={post.coverImage}
              onChange={(e) => setPost({...post, coverImage: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            {post.coverImage && <img src={post.coverImage} className="mt-2 rounded-lg h-24 w-full object-cover opacity-50" />}
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Slug</label>
              <input 
                type="text"
                value={post.slug}
                onChange={(e) => setPost({...post, slug: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Excerpt</label>
              <textarea 
                value={post.excerpt}
                onChange={(e) => setPost({...post, excerpt: e.target.value})}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Category</label>
                <input 
                  type="text"
                  value={post.category}
                  onChange={(e) => setPost({...post, category: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Read Time</label>
                <input 
                  type="text"
                  value={post.readTime}
                  onChange={(e) => setPost({...post, readTime: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
             <div>
              <label className="block text-sm text-slate-400 mb-1">Tags (comma separated)</label>
              <input 
                type="text"
                value={post.tags?.join(', ')}
                onChange={(e) => setPost({...post, tags: e.target.value.split(',').map(t => t.trim())})}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Settings size={14}/> SEO Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Meta Title</label>
                <input 
                  type="text"
                  value={post.seo?.metaTitle}
                  onChange={(e) => setPost({...post, seo: {...post.seo, metaTitle: e.target.value} as any})}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Meta Description</label>
                <textarea 
                  rows={2}
                  value={post.seo?.metaDescription}
                  onChange={(e) => setPost({...post, seo: {...post.seo, metaDescription: e.target.value} as any})}
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

// --- Main Admin Layout ---
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(cms.isAuthenticated());
  const navigate = useNavigate();

  const handleLogout = () => {
    cms.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-[#030014] text-white font-sans">
      {/* Admin Sidebar */}
      <aside className="w-16 md:w-64 bg-[#0A0A12] border-r border-white/10 flex flex-col justify-between py-6">
        <div>
          <div className="px-6 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">GWF</div>
            <span className="hidden md:block font-bold text-lg">CMS</span>
          </div>
          <nav className="space-y-1 px-3">
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors">
              <LayoutDashboard size={20} />
              <span className="hidden md:block">Posts</span>
            </Link>
            <Link to="/blog" target="_blank" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors">
              <Eye size={20} />
              <span className="hidden md:block">View Live Site</span>
            </Link>
          </nav>
        </div>
        <div className="px-3">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg w-full transition-colors">
            <LogOut size={20} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editor/:id" element={<EditorWithParams />} />
        </Routes>
      </main>
    </div>
  );
};

const EditorWithParams = () => {
  const { id } = useParams();
  return <Editor id={id} />;
}

export default Admin;
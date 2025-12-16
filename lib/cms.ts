import { supabase } from './supabase';

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

// Helper to map DB result to BlogPost
const mapPost = (data: any): BlogPost => ({
  id: data.id,
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt,
  content: data.content,
  coverImage: data.cover_image,
  author: data.author,
  publishedAt: data.published_at,
  status: data.status,
  category: data.category,
  tags: data.tags || [],
  readTime: data.read_time,
  seo: {
    metaTitle: data.seo_meta_title || '',
    metaDescription: data.seo_meta_description || '',
  }
});

// Helper to map BlogPost to DB payload
const mapToPayload = (post: Partial<BlogPost>) => ({
  // id is handled by DB defaults if new, or passed if updating
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.content,
  cover_image: post.coverImage,
  author: post.author,
  published_at: post.publishedAt,
  status: post.status,
  category: post.category,
  tags: post.tags,
  read_time: post.readTime,
  seo_meta_title: post.seo?.metaTitle,
  seo_meta_description: post.seo?.metaDescription,
});

export const cms = {

  getAllPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
    return (data || []).map(mapPost);
  },

  getPublishedPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching published posts:', error);
      return [];
    }
    return (data || []).map(mapPost);
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return undefined;
    return mapPost(data);
  },

  getPostById: async (id: string): Promise<BlogPost | undefined> => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return undefined;
    return mapPost(data);
  },

  savePost: async (post: Partial<BlogPost> & { id?: string }): Promise<BlogPost> => {
    const payload = mapToPayload(post);

    if (post.id) {
      // Update
      const { data, error } = await supabase
        .from('posts')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', post.id)
        .select()
        .single();

      if (error) throw error;
      return mapPost(data);
    } else {
      // Create
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...payload, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;
      return mapPost(data);
    }
  },

  deletePost: async (id: string) => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // --- Auth (Using Supabase Auth) ---
  login: async (email: string, pass: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error || !data.user) {
      console.error('Login failed:', error);
      return false;
    }
    return true;
  },

  signUp: async (email: string, pass: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error || !data.user) {
      console.error('Signup failed:', error);
      return false;
    }
    return true;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  isAuthenticated: async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },

  // Helper to get current user session
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
};

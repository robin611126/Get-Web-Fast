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

export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  time: string;
  best_for: string;
  is_premium: boolean;
  discount_percent: number;
  original_price: string;
  tags: string[];
  coupon_code: string;
  icon_name: string; // Store icon name as string
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  bg_class: string;
  slug: string;
  client_name: string;
  challenge: string;
  solution: string;
  results: string;
  tech_stack: string[];
  live_url: string;
  gallery_images: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
  rating: number;
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
      // Ensure we don't overwrite published_at if it's not intended, but mapToPayload includes it.
      // If the user clears the date in the UI, we might want to respect that too.
      // The issue is likely that mapToPayload maps 'publishedAt' to 'published_at', and the UI sets 'publishedAt'.
      // If the UI sends 'publishedAt', mapToPayload handles it.
      // The previous code was: .update({ ...payload, updated_at: new Date().toISOString() })
      // This looks correct, assuming payload has the new date.

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
      // For new posts, if published_at is not set, we might want to default to now, OR leave it null if it's a draft.
      // But typically we set it to now if not provided.
      const finalPayload = {
        ...payload,
        published_at: payload.published_at || new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([finalPayload])
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

  // --- Services ---
  getAllServices: async (): Promise<ServiceItem[]> => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }
    return data || [];
  },

  saveService: async (service: Partial<ServiceItem> & { id?: string }): Promise<ServiceItem> => {
    // Remove id from payload if it's undefined or empty string to let DB generate it
    const { id, ...payload } = service;

    if (id && id !== 'new') {
      const { data, error } = await supabase
        .from('services')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('services')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  deleteService: async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // --- Projects ---
  getAllProjects: async (): Promise<ProjectItem[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data || [];
  },

  getProjectBySlug: async (slug: string): Promise<ProjectItem | undefined> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return undefined;
    return data;
  },

  saveProject: async (project: Partial<ProjectItem> & { id?: string }): Promise<ProjectItem> => {
    const { id, ...payload } = project;

    if (id && id !== 'new') {
      const { data, error } = await supabase
        .from('projects')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('projects')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  deleteProject: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  // --- Testimonials ---
  getAllTestimonials: async (): Promise<TestimonialItem[]> => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
    return data || [];
  },

  saveTestimonial: async (item: Partial<TestimonialItem> & { id?: string }): Promise<TestimonialItem> => {
    const { id, ...payload } = item;
    if (id && id !== 'new') {
      const { data, error } = await supabase
        .from('testimonials')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('testimonials')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  deleteTestimonial: async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
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

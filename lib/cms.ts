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
  timeline: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  image: string;
  rating: number;
}

export interface ScrollingBannerItem {
  id: string;
  text: string;
  direction: 'left' | 'right';
  speed: number;
  is_active: boolean;
  order_index: number;
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
    // Check for cover image
    const { data: post } = await supabase
      .from('posts')
      .select('cover_image') // Note: DB column is cover_image
      .eq('id', id)
      .single();

    if (post && post.cover_image) {
      const parts = post.cover_image.split('/uploads/');
      if (parts.length > 1) {
        await supabase.storage.from('uploads').remove([parts[1]]);
      }
    }

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
    // 1. Get the project to find the image URL
    const { data: project } = await supabase
      .from('projects')
      .select('image, gallery_images')
      .eq('id', id)
      .single();

    if (project) {
      // Helper to extract file path from public URL
      const getPath = (url: string) => {
        if (!url) return null;
        // Assumes URL format: .../storage/v1/object/public/uploads/filename.ext
        // or .../storage/v1/object/public/bucketName/filename.ext
        const parts = url.split('/public/');
        if (parts.length > 1) {
          // The part after 'public/' generally includes the bucket name part in getPublicUrl logic depending on config,
          // but usually the storage API needs 'bucket/path'.
          // If using standard supabase getPublicUrl:
          // url is: https://<project>.supabase.co/storage/v1/object/public/uploads/<filename>
          // So split by 'uploads/' might be safer if we know the bucket.

          // Let's assume bucket is 'uploads' as per our uploadImage logic.
          const pathParts = url.split('/uploads/');
          if (pathParts.length > 1) return pathParts[1];
        }
        return null;
      };

      const imagePath = getPath(project.image);
      if (imagePath) {
        await supabase.storage.from('uploads').remove([imagePath]);
      }

      // Also cleanup gallery images if needed
      if (project.gallery_images && project.gallery_images.length > 0) {
        const paths = project.gallery_images.map((getUrl: string) => getPath(getUrl)).filter((p: string | null) => p !== null) as string[];
        if (paths.length > 0) {
          await supabase.storage.from('uploads').remove(paths);
        }
      }
    }

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
    // Check for image
    const { data: item } = await supabase
      .from('testimonials')
      .select('image')
      .eq('id', id)
      .single();

    if (item && item.image) {
      const parts = item.image.split('/uploads/');
      if (parts.length > 1) {
        await supabase.storage.from('uploads').remove([parts[1]]);
      }
    }

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
  },

  // --- Storage ---
  uploadImage: async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Try 'uploads' bucket first, then 'public'
    let bucketName = 'uploads';

    let { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      // If bucket doesn't exist or other error, try 'public' default bucket if it exists, or just error out
      // For now, let's assume 'uploads' is the target. Creating a bucket via API requires admin key usually.
      console.error('Error uploading to "uploads":', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}. Ensure a public bucket named "uploads" exists in Supabase.`);
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
  },

  // --- Scrolling Banners ---
  getAllScrollingBanners: async (): Promise<any[]> => {
    const { data, error } = await supabase
      .from('scrolling_banners')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching scrolling banners:', error);
      return [];
    }
    return data || [];
  },

  saveScrollingBanner: async (item: any): Promise<any> => {
    const { id, ...payload } = item;
    if (id && id !== 'new') {
      const { data, error } = await supabase
        .from('scrolling_banners')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('scrolling_banners')
        .insert([payload])
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  deleteScrollingBanner: async (id: string) => {
    const { error, count } = await supabase
      .from('scrolling_banners')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) {
      console.error("Supabase delete error:", error);
      throw error;
    }

    if (count === 0) {
      console.warn("No rows deleted. Check RLS policies or ID.");
      throw new Error("Deletion failed. Access denied or item not found.");
    }
  }
};

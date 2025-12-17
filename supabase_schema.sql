-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT, -- Stores HTML content
    cover_image TEXT, -- URL to the image
    author TEXT,
    published_at TIMESTAMPTZ,
    status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    category TEXT,
    tags TEXT[], -- Array of strings
    read_time TEXT,
    seo_meta_title TEXT,
    seo_meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view published posts" ON public.posts
    FOR SELECT
    USING (status = 'published');

CREATE POLICY "Authenticated users can manage posts" ON public.posts
    FOR ALL
    USING (auth.role() = 'authenticated');


-- 2. Services Table (for dynamic service offerings)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    price TEXT,
    description TEXT,
    features TEXT[],
    time TEXT,
    best_for TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    discount_percent INTEGER DEFAULT 0,
    original_price TEXT,
    tags TEXT[],
    coupon_code TEXT,
    icon_name TEXT, -- Store the icon component name as string
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view services" ON public.services
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage services" ON public.services
    FOR ALL
    USING (auth.role() = 'authenticated');


-- 3. Projects/Portfolio Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    bg_class TEXT, -- e.g. "bg-gradient-to-br..."
    slug TEXT UNIQUE,
    client_name TEXT,
    challenge TEXT,
    solution TEXT,
    results TEXT,
    tech_stack TEXT[],
    live_url TEXT,
    gallery_images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view projects" ON public.projects
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage projects" ON public.projects
    FOR ALL
    USING (auth.role() = 'authenticated');


-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    text TEXT NOT NULL,
    image TEXT,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view testimonials" ON public.testimonials
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage testimonials" ON public.testimonials
    FOR ALL
    USING (auth.role() = 'authenticated');

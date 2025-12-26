-- 1. Ensure the projects table exists
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null unique
);

-- 2. Ensure all required columns exist (Safe Migration)
do $$
begin
  -- Add columns if they don't exist
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'category') then
    alter table public.projects add column category text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'description') then
    alter table public.projects add column description text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'challenge') then
    alter table public.projects add column challenge text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'solution') then
    alter table public.projects add column solution text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'results') then
    alter table public.projects add column results text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'client_name') then
    alter table public.projects add column client_name text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'tech_stack') then
    alter table public.projects add column tech_stack text[];
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'live_url') then
    alter table public.projects add column live_url text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'image') then
    alter table public.projects add column image text;
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'gallery_images') then
    alter table public.projects add column gallery_images text[];
  end if;
  if not exists (select 1 from information_schema.columns where table_name = 'projects' and column_name = 'bg_class') then
    alter table public.projects add column bg_class text;
  end if;
end $$;

-- 3. Enable RLS (Idempotent)
alter table public.projects enable row level security;

-- 4. Re-create Policies (Drop first to avoid errors)
drop policy if exists "Enable read access for all users" on public.projects;
create policy "Enable read access for all users" on public.projects for select using (true);

drop policy if exists "Enable insert for authenticated users only" on public.projects;
create policy "Enable insert for authenticated users only" on public.projects for insert with check (auth.role() = 'authenticated');

drop policy if exists "Enable update for authenticated users only" on public.projects;
create policy "Enable update for authenticated users only" on public.projects for update using (auth.role() = 'authenticated');

drop policy if exists "Enable delete for authenticated users only" on public.projects;
create policy "Enable delete for authenticated users only" on public.projects for delete using (auth.role() = 'authenticated');

-- 5. Clear existing data to prevent duplicates
truncate table public.projects;

-- 6. Insert Content (Removed 'role' and 'is_featured' to match schema and UI usage)
insert into public.projects (name, slug, category, description, challenge, solution, results, client_name, tech_stack, live_url, image, bg_class, gallery_images)
values
(
  'Clever',
  'clever-saas',
  'SaaS',
  'A high-conversion landing page designed for modern SaaS companies looking to showcase their features with clarity and style.',
  '**The Challenge**\n\nIn the crowded SaaS market, "Clever" needed a landing page that didn''t just look good but converted cold traffic into signups. The primary issue with their previous design was a lack of clear hierarchy—users were landing on the page and leaving within seconds because they couldn''t immediately understand *what* the product did.\n\nKey pain points:\n- High bounce rate (over 70%)\n- Confusing navigation\n- Lack of social proof placement\n- Slow load times on mobile devices',
  '**The Solution**\n\nWe moved to a "benefit-first" design philosophy. Instead of listing features, we led with the value proposition. We utilized a dark, sleek aesthetic to suggest premium quality and tech-savviness, using the "Inter" typeface for clean readability.\n\nStrategic decisions:\n1. **Hero Section Redesign**: We implemented a dynamic headline with a clear subtext and a single, high-contrast CTA button.\n2. **Visual Hierarchy**: Used subtle glassmorphism effects to containerize key information without cluttering the UI.\n3. **Performance First**: Built on Vite and React to ensure instant page loads, crucial for keeping bounce rates low.\n4. **Trust Signals**: Integrated a "Logos" section immediately below the fold to establish authority.',
  '**The Results**\n\nPost-launch analytics showed a dramatic improvement in user engagement.\n\n- **40% Increase** in sign-up conversion rate.\n- **Reduced Bounce Rate** from 70% to 45%.\n- **Mobile Performance** score jumped to 98/100 on Lighthouse.\n\nThe client successfully used this new landing page to raise their Seed round, citing the professional presentation as a key factor in investor confidence.',
  'Clever Inc.',
  ARRAY['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
  'https://clever-demo.com',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
  'bg-slate-900',
  ARRAY[
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
  ]
),
(
  'Genius',
  'genius-app',
  'Productivity',
  'A minimal, distraction-free interface for a productivity tool that helps creative professionals focus.',
  '**The Challenge**\n\nGenius is an AI-powered writing assistant. They approached us with a beta product that had powerful features but a cluttered, overwhelming interface. Users were getting lost in settings and toolbars instead of writing. The goal was to strip away the noise and create a "Zen-like" mode for their user base.',
  '**The Solution**\n\nWe adopted a radical "Invisible UI" approach. Controls appear only when needed (on hover or focus) and fade away when the user is typing. We chose a monochromatic color palette with subtle cues of indigo to guide the eye.\n\n- **Focus Mode**: A default state where the entire interface disappears, leaving only the cursor and text.\n- **Keyboard First**: Designed the entire UX around keyboard shortcuts, allowing power users to never touch the mouse.\n- **Dark Mode Optimization**: Since writers often work at night, we crafted a specific high-contrast dark mode that reduces eye strain.',
  '**The Results**\n\nUser retention for the "Daily Active Writer" metric doubled within two weeks of the redesign.\n\n- **2x Retention**: Users spent twice as long in the app per session.\n- **Positive Feedback**: "Finally, a tool that lets me think" became a common sentiment on Twitter/X.\n- **award**: The design was featured on specialized UI/UX aggregators for its bold simplicity.',
  'Genius AI',
  ARRAY['Next.js', 'Typescript', 'Shadcn UI', 'Postgres'],
  'https://genius-app.com',
  'https://images.unsplash.com/photo-1481487484168-9b930d9b71e5?q=80&w=2617&auto=format&fit=crop',
  'bg-zinc-900',
  ARRAY[
    'https://images.unsplash.com/photo-1481487484168-9b930d9b71e5?q=80&w=2617&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop'
  ]
),
(
  'Sap',
  'sap-analytics',
  'Enterprise',
  'A comprehensive analytics dashboard for enterprise data visualization, making complex datasets digestible.',
  '**The Challenge**\n\nEnterprise software is notoriously ugly and hard to use. Sap wanted to break this cycle. They had massive amounts of data—sales, forecasting, inventory—that needed to be displayed in real-time. The challenge was performance (rendering thousands of data points) and legibility (making it understandable).',
  '**The Solution**\n\nWe built a modular grid system layout. Each "widget" on the dashboard works independently but shares a cohesive design language.\n\n1. **Data Visualization**: We used D3.js wrapped in React components to create performant, interactive charts.\n2. **Information Architecture**: Implemented a "drill-down" interaction model. Users see a summary first, and can click to expand any metric into a detailed view.\n3. **Themeable UI**: Built the entire system on CSS variables, allowing enterprise clients to white-label the dashboard with their own brand colors instantly.',
  '**The Results**\n\nSap signed 3 major enterprise contracts within a month of releasing the new dashboard.\n\n- **Zero Latency**: Even with 10k+ rows of data, the UI remains responsive at 60fps.\n- **Reduced Training Time**: Because the UI is intuitive, client onboarding time dropped by 60%.',
  'Sap Systems',
  ARRAY['React', 'D3.js', 'Node.js', 'Redis'],
  'https://sap-system.com',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
  'bg-stone-900',
  ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop'
  ]
),
(
  'Waitlisty',
  'waitlisty-launch',
  'Growth',
  'A viral pre-launch waitlist page designed to maximize referrals and build hype before product release.',
  '**The Challenge**\n\nEvery startup wants a massive email list before launch. Waitlisty needed a template that was more than just an email input. They needed a gamified loop where users are rewarded for referring friends. The challenge was to make this loop feel seamless and not spammy.',
  '**The Solution**\n\nWe designed a "Queue" interface. When a user signs up, they get a position in line (e.g., #4502). \n\n- **Gamification**: "Refer 5 friends to jump the queue." We visualized this with a progress bar and a live counter.\n- **Social Sharing**: One-click share buttons effectively pre-populated tweets with engaging copy.\n- **Visual Delight**: We used a particle background effect to give the page a sense of "aliveness" without distracting from the main CTA.',
  '**The Results**\n\nUsed by over 50 startups, this template has collected over 1M combined emails.\n\n- **Viral Coefficient**: Achieved a k-factor of 1.2 (every user brings in 1.2 new users on average).\n- **High Conversion**: 42% visitor-to-signup rate on cold traffic.',
  'Waitlisty',
  ARRAY['React', 'Supabase', 'Framer Motion'],
  'https://waitlisty.com',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop',
  'bg-indigo-950',
  ARRAY[
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670&auto=format&fit=crop'
  ]
),
(
  'LaunchPad',
  'launchpad-kit',
  'Marketing',
  'The ultimate asset kit for launching products on Product Hunt. Stand out in the daily feed.',
  '**The Challenge**\n\nLaunching on Product Hunt is a 24-hour sprint. You need assets for social media, the PH thumbnail, the gallery, and the first comment. Many founders scramble to make these last minute. We wanted to create a cohesive "brand in a box" for launches.',
  '**The Solution**\n\nA unified design language applied across multiple asset formats. We created Figma templates and React components that share variables.\n\n- **Consistent Branding**: Change a color in one place, and it updates the banner, the og:image, and the landing page hero.\n- **Animation**: Included Lottie files for the distinctive "cat" logo to grab attention in the feed.',
  '**The Results**\n\nProducts using LaunchPad have consistently trended in the Top 5 Product of the Day.\n\n- **Higher CTR**: Thumbnails optimized with our contrast guidelines saw a 15% higher click-through rate.',
  'Indie Makers',
  ARRAY['Figma', 'React', 'After Effects'],
  'https://ph-launchpad.com',
  'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop',
  'bg-slate-900',
  ARRAY[
    'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2670&auto=format&fit=crop'
  ]
);

-- Drop existing policies to avoid conflicts
drop policy if exists "Enable read access for all users" on public.scrolling_banners;
drop policy if exists "Enable insert for authenticated users only" on public.scrolling_banners;
drop policy if exists "Enable update for authenticated users only" on public.scrolling_banners;
drop policy if exists "Enable delete for authenticated users only" on public.scrolling_banners;

-- Create the scrolling_banners table (if not exists)
create table if not exists public.scrolling_banners (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  text text not null,
  direction text check (direction in ('left', 'right')) default 'left',
  speed integer default 30, -- Duration in seconds for one full loop
  is_active boolean default true,
  order_index integer default 0
);

-- Enable Row Level Security (RLS)
alter table public.scrolling_banners enable row level security;

-- Re-create policies
-- Allow read access to everyone
create policy "Enable read access for all users" on public.scrolling_banners
  for select using (true);

-- Allow insert/update/delete only for authenticated users (admins)
create policy "Enable insert for authenticated users only" on public.scrolling_banners
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.scrolling_banners
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.scrolling_banners
  for delete using (auth.role() = 'authenticated');

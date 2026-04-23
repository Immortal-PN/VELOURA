-- Veloura Luxury Supabase Schema

-- 1. Profiles Table (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric not null,
  category text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Orders Table
create table public.orders (
  id text primary key, -- e.g. VL123456
  user_id uuid references public.profiles(id) on delete set null,
  total numeric not null,
  status text not null default 'Pending Verification',
  shipping_name text,
  shipping_phone text,
  shipping_address text,
  items jsonb not null, -- Stores array of cart items
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) Policies
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" on public.profiles for select using ( auth.uid() = id );
create policy "Users can update own profile" on public.profiles for update using ( auth.uid() = id );

-- Products: Everyone can view products, only admins can modify (assuming a role system later)
create policy "Products are viewable by everyone" on public.products for select using ( true );

-- Orders: Users can view their own orders and insert new ones
create policy "Users can view own orders" on public.orders for select using ( auth.uid() = user_id );
create policy "Users can insert own orders" on public.orders for insert with check ( auth.uid() = user_id );

-- Note: Admin policies for products/orders should be added based on your specific admin authentication method.

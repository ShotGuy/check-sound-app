-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  role text check (role in ('user', 'vendor', 'admin')) default 'user',
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. CATEGORIES
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  icon_slug text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for categories
alter table public.categories enable row level security;

create policy "Categories are viewable by everyone."
  on categories for select
  using ( true );

-- Insert default categories
insert into categories (name, icon_slug) values
  ('Sound System', 'speaker'),
  ('Lighting', 'lightbulb'),
  ('Mixers', 'sliders');

-- 3. PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  vendor_id uuid references public.profiles(id) not null,
  category_id uuid references public.categories(id),
  name text not null,
  description text,
  price_per_day numeric not null,
  image_url text,
  stock integer default 1,
  specifications jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for products
alter table public.products enable row level security;

create policy "Products are viewable by everyone."
  on products for select
  using ( true );

create policy "Vendors can insert their own products."
  on products for insert
  with check ( auth.uid() = vendor_id );

create policy "Vendors can update their own products."
  on products for update
  using ( auth.uid() = vendor_id );

-- 4. BOOKINGS
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  start_date date not null,
  end_date date not null,
  total_price numeric not null,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'completed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS for bookings
alter table public.bookings enable row level security;

create policy "Users can view their own bookings."
  on bookings for select
  using ( auth.uid() = user_id );

create policy "Vendors can view bookings for their products."
  on bookings for select
  using ( exists (
    select 1 from products
    where products.id = bookings.product_id
    and products.vendor_id = auth.uid()
  ));

create policy "Users can create bookings."
  on bookings for insert
  with check ( auth.uid() = user_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

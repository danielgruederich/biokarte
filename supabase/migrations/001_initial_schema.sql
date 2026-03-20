-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text not null default '',
  bio text default '',
  avatar_url text,
  template_id text not null default 'dark-komi',
  status text not null default 'online' check (status in ('online', 'offline')),
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now()
);

-- Reserved slugs
create table public.reserved_slugs (
  slug text primary key
);
insert into public.reserved_slugs (slug) values
  ('admin'), ('api'), ('settings'), ('auth'), ('onboarding'),
  ('edit'), ('dashboard'), ('login'), ('register'), ('callback');

-- Username validation: lowercase, alphanumeric + hyphens, 3-30 chars
alter table public.profiles add constraint username_format
  check (username ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$');

-- Username not in reserved slugs
create or replace function public.check_username_not_reserved()
returns trigger as $$
begin
  if exists (select 1 from public.reserved_slugs where slug = new.username) then
    raise exception 'Username is reserved';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger check_username_reserved
  before insert or update on public.profiles
  for each row execute function public.check_username_not_reserved();

-- Social Links
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete cascade not null,
  platform text not null,
  username text not null,
  url text not null,
  position integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

-- Content Blocks
create table public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete cascade not null,
  type text not null check (type in ('link', 'social_link', 'text', 'section_title', 'embed')),
  position integer not null default 0,
  is_visible boolean not null default true,
  data jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- Analytics Events
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles on delete cascade not null,
  event_type text not null check (event_type in ('view', 'click')),
  target_id text,
  target_type text,
  referrer text,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_analytics_profile_id on public.analytics_events(profile_id);
create index idx_analytics_created_at on public.analytics_events(created_at);
create index idx_content_blocks_user_id on public.content_blocks(user_id, position);
create index idx_social_links_user_id on public.social_links(user_id, position);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.social_links enable row level security;
alter table public.content_blocks enable row level security;
alter table public.analytics_events enable row level security;

-- Profiles: anyone can read, owners can update/insert
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Social Links: anyone can read, owners can CRUD
create policy "Social links are viewable by everyone"
  on public.social_links for select using (true);

create policy "Users can insert own social links"
  on public.social_links for insert with check (auth.uid() = user_id);

create policy "Users can update own social links"
  on public.social_links for update using (auth.uid() = user_id);

create policy "Users can delete own social links"
  on public.social_links for delete using (auth.uid() = user_id);

-- Content Blocks: visible ones readable by all, owners can CRUD
create policy "Visible content blocks are viewable by everyone"
  on public.content_blocks for select using (is_visible = true or auth.uid() = user_id);

create policy "Users can insert own content blocks"
  on public.content_blocks for insert with check (auth.uid() = user_id);

create policy "Users can update own content blocks"
  on public.content_blocks for update using (auth.uid() = user_id);

create policy "Users can delete own content blocks"
  on public.content_blocks for delete using (auth.uid() = user_id);

-- Analytics: anyone can insert, owners can read
create policy "Anyone can insert analytics events"
  on public.analytics_events for insert with check (true);

create policy "Users can read own analytics"
  on public.analytics_events for select using (auth.uid() = profile_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', replace(split_part(new.email, '@', 1), '.', '-')),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

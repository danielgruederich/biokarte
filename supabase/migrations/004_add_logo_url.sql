-- Add optional logo/wordmark URL to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS logo_url text;

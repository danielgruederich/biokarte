-- Run this AFTER creating the user daniel@fuerte.digital via the auth UI or signUp
-- This sets the role to admin for the user with that email

-- Step 1: Add role column (if not already done by 002)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

-- Step 2: Set admin role for daniel@fuerte.digital
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'daniel@fuerte.digital' LIMIT 1
);

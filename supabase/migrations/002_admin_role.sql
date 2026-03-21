-- Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';

-- Add check constraint for valid roles
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin'));

-- Admin can read all profiles (override existing SELECT policy)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Admin can update any profile
CREATE POLICY "Admins can update any profile" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can delete any profile
CREATE POLICY "Admins can delete any profile" ON profiles
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can read all analytics
CREATE POLICY "Admins can read all analytics" ON analytics_events
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can read all content blocks (including drafts)
DROP POLICY IF EXISTS "Content blocks viewable by owner or if visible" ON content_blocks;
CREATE POLICY "Content blocks viewable by owner or if visible or admin" ON content_blocks
  FOR SELECT USING (
    is_visible = true
    OR auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can delete any content block
CREATE POLICY "Admins can delete any content block" ON content_blocks
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin can read all social links
DROP POLICY IF EXISTS "Social links are viewable by everyone" ON social_links;
CREATE POLICY "Social links viewable by everyone or admin" ON social_links
  FOR SELECT USING (true);

-- Admin can delete any social link
CREATE POLICY "Admins can delete any social link" ON social_links
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

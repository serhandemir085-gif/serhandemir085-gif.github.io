-- Portfolio Database Schema
-- This script creates all necessary tables for the portfolio website

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Images table - stores all images used in the site
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  alt_text VARCHAR(255),
  category VARCHAR(50) DEFAULT 'project', -- project, hero, about
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table - stores all portfolio projects/applications
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  features TEXT[], -- Array of features
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'draft', -- published, draft
  thumbnail_image_id UUID REFERENCES images(id) ON DELETE SET NULL,
  demo_url TEXT,
  purchase_url TEXT,
  github_url TEXT,
  price VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project images table - multiple images per project
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Technologies table - programming languages, frameworks, tools
CREATE TABLE IF NOT EXISTS technologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) UNIQUE NOT NULL,
  icon_url TEXT,
  color VARCHAR(7) DEFAULT '#3b82f6', -- hex color
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project technologies junction table
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- Links table - social media, external links
CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(50), -- icon name
  category VARCHAR(50), -- social, external, resource
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table - global site configuration
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  type VARCHAR(50), -- text, number, boolean, json
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About sections table - modular about page content
CREATE TABLE IF NOT EXISTS about_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  type VARCHAR(50), -- bio, skills, experience, education
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  level INTEGER, -- 1-100 proficiency level
  category VARCHAR(100),
  icon_url TEXT,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'unread', -- unread, read, replied, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Analytics table - track page views and interactions
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(255),
  event_type VARCHAR(100), -- page_view, project_view, download, click
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address VARCHAR(45),
  country VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_images_category ON images(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_image_id ON project_images(image_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_project_id ON analytics(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_sections_updated_at
  BEFORE UPDATE ON about_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
  ('site_title', 'serhan885 | CodeHub Enterprise Solutions', 'text'),
  ('site_description', 'Python, Node.js ve AI altyapıları ile dijital süreçlerinizi otomatize edin', 'text'),
  ('hero_title', 'OTOMASYON ÇÖZÜMLERI', 'text'),
  ('hero_subtitle', 'Python, Node.js ve AI altyapıları ile dijital süreçlerinizi hızlandırın', 'text'),
  ('email', 'contact@serhan885.com', 'text'),
  ('github_url', 'https://github.com/serhan885', 'text'),
  ('store_url', 'https://www.itemsatis.com/p/CodeHub', 'text'),
  ('show_analytics', 'true', 'boolean'),
  ('projects_per_page', '12', 'number'),
  ('maintenance_mode', 'false', 'boolean')
ON CONFLICT (key) DO NOTHING;

-- Insert some default technologies
INSERT INTO technologies (name, color) VALUES
  ('Python', '#3776AB'),
  ('JavaScript', '#F7DF1E'),
  ('TypeScript', '#3178C6'),
  ('Node.js', '#339933'),
  ('React', '#61DAFB'),
  ('Next.js', '#000000'),
  ('Discord.js', '#5865F2'),
  ('PostgreSQL', '#4169E1'),
  ('MongoDB', '#47A248'),
  ('Docker', '#2496ED'),
  ('Git', '#F05032'),
  ('Selenium', '#43B02A'),
  ('AI/ML', '#FF6F00')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view images"
  ON images FOR SELECT
  USING (true);

CREATE POLICY "Public can view published projects"
  ON projects FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view project images"
  ON project_images FOR SELECT
  USING (true);

CREATE POLICY "Public can view technologies"
  ON technologies FOR SELECT
  USING (true);

CREATE POLICY "Public can view project technologies"
  ON project_technologies FOR SELECT
  USING (true);

CREATE POLICY "Public can view visible links"
  ON links FOR SELECT
  USING (visible = true);

CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public can view visible about sections"
  ON about_sections FOR SELECT
  USING (visible = true);

CREATE POLICY "Public can view visible skills"
  ON skills FOR SELECT
  USING (visible = true);

CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can insert analytics"
  ON analytics FOR INSERT
  WITH CHECK (true);

-- Admin policies (authenticated users have full access)
CREATE POLICY "Authenticated users can do everything on images"
  ON images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on projects"
  ON projects FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on project_images"
  ON project_images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on technologies"
  ON technologies FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on project_technologies"
  ON project_technologies FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on links"
  ON links FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on site_settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on about_sections"
  ON about_sections FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can do everything on skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view and manage contact_messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view analytics"
  ON analytics FOR SELECT
  USING (auth.role() = 'authenticated');

import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/portfolio/navbar'
import Hero from '@/components/portfolio/hero'
import Stats from '@/components/portfolio/stats'
import Projects from '@/components/portfolio/projects'
import Footer from '@/components/portfolio/footer'

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: projects },
    { data: technologies },
    { count: projectCount },
  ] = await Promise.all([
    supabase
      .from('projects')
      .select(`
        *,
        project_technologies (
          technologies (*)
        ),
        images:thumbnail_image_id (*)
      `)
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(12),
    supabase.from('technologies').select('*').order('name'),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'published'),
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="noise-overlay" />
      <div className="gradient-sphere" />
      
      <Navbar />
      <Hero />
      <Stats projectCount={projectCount || 0} />
      <Projects projects={projects || []} technologies={technologies || []} />
      <Footer />
    </div>
  )
}

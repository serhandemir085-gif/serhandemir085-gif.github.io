'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Github, Star } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type Project = {
  id: string
  title: string
  slug: string
  description: string
  long_description?: string
  demo_url?: string
  purchase_url?: string
  github_url?: string
  price?: string
  featured: boolean
  project_technologies?: { technologies: { name: string; color: string } }[]
  images?: { url: string; alt_text: string }
  features?: string[]
}

type Technology = {
  id: string
  name: string
  color: string
}

export default function Projects({ projects, technologies }: { projects: Project[]; technologies: Technology[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.project_technologies?.some(pt => pt.technologies.name === filter))

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            GELİŞTİRİLEN <span className="text-primary">SİSTEMLER</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            İhtiyaca özel, yüksek performanslı ve ölçeklenebilir yazılımlar
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tümü
          </Button>
          {technologies.slice(0, 6).map((tech) => (
            <Button
              key={tech.id}
              variant={filter === tech.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(tech.name)}
            >
              {tech.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Öne Çıkan
                  </Badge>
                </div>
              )}
              
              {project.images?.url && (
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={project.images.url}
                    alt={project.images.alt_text || project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {project.project_technologies?.slice(0, 4).map((pt, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {pt.technologies.name}
                    </Badge>
                  ))}
                  {(project.project_technologies?.length || 0) > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{(project.project_technologies?.length || 0) - 4}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="gap-2">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedProject(project)}
                >
                  Detaylar
                </Button>
                {project.purchase_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.purchase_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Bu kategoride proje bulunamadı</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              {selectedProject.images?.url && (
                <div className="relative h-64 -mx-6 -mt-6 mb-4 overflow-hidden bg-muted">
                  <img
                    src={selectedProject.images.url}
                    alt={selectedProject.images.alt_text || selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {selectedProject.long_description && (
                  <div>
                    <h3 className="font-semibold mb-2">Detaylı Açıklama</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.long_description}
                    </p>
                  </div>
                )}

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Özellikler</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Teknolojiler</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.project_technologies?.map((pt, i) => (
                      <Badge key={i} variant="secondary">
                        {pt.technologies.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedProject.price && (
                  <div>
                    <h3 className="font-semibold mb-2">Fiyat</h3>
                    <p className="text-2xl font-bold text-primary">{selectedProject.price}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  {selectedProject.purchase_url && (
                    <Button asChild className="flex-1">
                      <a href={selectedProject.purchase_url} target="_blank" rel="noopener noreferrer">
                        Satın Al / İncele
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {selectedProject.demo_url && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.demo_url} target="_blank" rel="noopener noreferrer">
                        Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.github_url && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

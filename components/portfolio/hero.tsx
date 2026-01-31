'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ArrowRight } from 'lucide-react'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const words = ['hızlandırın.', 'otomatize edin.', 'optimize edin.']
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentWord = words[wordIndex]
    
    if (displayText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setDisplayText('')
        setWordIndex((prev) => (prev + 1) % words.length)
      }, 2000)
    }
    
    return () => clearTimeout(timeout)
  }, [displayText, wordIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2" />
              v2.0 SYSTEM ONLINE
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                OTOMASYON
                <br />
                <span className="text-primary">ÇÖZÜMLERI</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Python, Node.js ve AI altyapıları ile dijital süreçlerinizi{' '}
                <span className="text-primary font-semibold">{displayText}</span>
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="#projects">
                  Projeleri İncele
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/serhan885" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="p-6 font-mono text-sm">
                <pre className="text-muted-foreground">
                  <code>
                    <span className="text-purple-400">class</span>{' '}
                    <span className="text-blue-400">CodeHub</span>:
                    {'\n'}
                    {'    '}
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-yellow-400">__init__</span>
                    (<span className="text-orange-400">self</span>):
                    {'\n'}
                    {'        '}
                    <span className="text-orange-400">self</span>.developer = 
                    <span className="text-green-400">"serhan885"</span>
                    {'\n'}
                    {'        '}
                    <span className="text-orange-400">self</span>.skills = [
                    {'\n'}
                    {'            '}
                    <span className="text-green-400">"Python"</span>,{'\n'}
                    {'            '}
                    <span className="text-green-400">"Node.js"</span>,{'\n'}
                    {'            '}
                    <span className="text-green-400">"AI"</span>
                    {'\n'}
                    {'        '}]
                    {'\n\n'}
                    {'    '}
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-yellow-400">create_future</span>
                    (<span className="text-orange-400">self</span>):
                    {'\n'}
                    {'        '}
                    <span className="text-purple-400">return</span>{' '}
                    <span className="text-green-400">"Automation Started..."</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

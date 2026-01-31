'use client'

import { useEffect, useState, useRef } from 'react'
import { Code, Users, Coffee } from 'lucide-react'

const stats = [
  { icon: Code, label: 'Aktif Proje', value: 25, suffix: '+' },
  { icon: Users, label: 'Mutlu Müşteri', value: 140, suffix: '+' },
  { icon: Coffee, label: 'Satır Kod', value: 5000, suffix: '+' },
]

export default function Stats({ projectCount }: { projectCount: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // Update first stat with actual project count
  const updatedStats = [...stats]
  if (projectCount > 0) {
    updatedStats[0] = { ...updatedStats[0], value: projectCount }
  }

  return (
    <section ref={ref} className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {updatedStats.map((stat, index) => (
            <StatCard key={index} {...stat} isVisible={isVisible} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  isVisible,
  delay,
}: {
  icon: any
  label: string
  value: number
  suffix: string
  isVisible: boolean
  delay: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const timeout = setTimeout(() => {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isVisible, value, delay])

  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <div className="p-4 bg-primary/10 rounded-full">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-4xl font-bold">
        {count}
        {suffix}
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
}

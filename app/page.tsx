'use client'

import Image from 'next/image'
import { CoverPageContent } from '@/components/cover-page-content'
import { useAuth } from '@/lib/auth-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CoverPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  if (user) {
    return null // or a loading spinner
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="https://github.com/Simurgh1/SmartCity/blob/main/Smart-city.jpg?raw=true"
        alt="Smart City Landscape"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <CoverPageContent />
    </div>
  )
}


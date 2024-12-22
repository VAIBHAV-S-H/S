'use client'

import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function NotificationSystem() {
  const { toast } = useToast()

  useEffect(() => {
    // Simulating real-time notifications
    const interval = setInterval(() => {
      const notifications = [
        { title: 'Traffic Alert', description: 'Heavy traffic on Main Street' },
        { title: 'Air Quality Warning', description: 'Air quality index has reached unhealthy levels' },
        { title: 'Public Transport Update', description: 'Blue Line experiencing delays' },
        { title: 'New Event', description: 'Music festival announced for next month' },
      ]

      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]

      toast({
        title: randomNotification.title,
        description: randomNotification.description,
      })
    }, 60000) // Show a notification every minute

    return () => clearInterval(interval)
  }, [toast])

  return null
}


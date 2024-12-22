'use client'

import { useState, useEffect } from 'react'

export function useUserLocation() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)
      },
      (error) => {
        setError(`Error: ${error.message}`)
      }
    )
  }, [])

  return { location, error }
}


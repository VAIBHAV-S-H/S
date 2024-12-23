'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  center: [number, number]
  zoom: number
  markers?: Array<{ position: [number, number]; popup: string }>
}

export default function MapComponent({ center, zoom, markers = [] }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView(center, zoom)
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map)

      mapRef.current = map
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, zoom])

  // Update map view when center or zoom changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom, {
        animate: true
      })
    }
  }, [center, zoom])

  return <div id="map" className="h-[400px] w-full rounded-lg" />
}


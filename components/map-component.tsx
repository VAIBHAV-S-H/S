'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  center: [number, number]
  zoom: number
  markers?: Array<{ position: [number, number]; popup: string }>
}

export default function MapComponent({ center, zoom, markers = [] }: MapComponentProps) {
  useEffect(() => {
    const map = L.map('map').setView(center, zoom)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map)

    markers.forEach(marker => {
      L.marker(marker.position)
        .addTo(map)
        .bindPopup(marker.popup)
    })

    return () => {
      map.remove()
    }
  }, [center, zoom, markers])

  return <div id="map" className="h-[400px] w-full rounded-lg" />
}


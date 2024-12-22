'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AirQualityChartProps {
  location: GeolocationCoordinates | null
}

export default function AirQualityChart({ location }: AirQualityChartProps) {
  // In a real application, you would fetch data based on the location
  const data = [
    { time: '00:00', aqi: 50 },
    { time: '04:00', aqi: 45 },
    { time: '08:00', aqi: 60 },
    { time: '12:00', aqi: 75 },
    { time: '16:00', aqi: 70 },
    { time: '20:00', aqi: 55 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}


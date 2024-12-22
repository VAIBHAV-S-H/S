'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wind } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import MapComponent from '@/components/map-component'
import { useUserLocation } from '@/components/use-user-location'

const airQualityData = [
  { time: '00:00', aqi: 50 },
  { time: '04:00', aqi: 45 },
  { time: '08:00', aqi: 60 },
  { time: '12:00', aqi: 75 },
  { time: '16:00', aqi: 70 },
  { time: '20:00', aqi: 55 },
]

const pollutants = [
  { name: 'PM2.5', level: 12, unit: 'µg/m³' },
  { name: 'PM10', level: 20, unit: 'µg/m³' },
  { name: 'O3', level: 60, unit: 'ppb' },
  { name: 'NO2', level: 15, unit: 'ppb' },
  { name: 'SO2', level: 5, unit: 'ppb' },
  { name: 'CO', level: 0.8, unit: 'ppm' },
]

function getAQICategory(aqi: number) {
  if (aqi <= 50) return { label: 'Good', color: 'bg-green-500' }
  if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-500' }
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500' }
  if (aqi <= 200) return { label: 'Unhealthy', color: 'bg-red-500' }
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'bg-purple-500' }
  return { label: 'Hazardous', color: 'bg-rose-900' }
}

export default function AirQualityPage() {
  const { location } = useUserLocation()
  const currentAQI = airQualityData[airQualityData.length - 1].aqi
  const aqiCategory = getAQICategory(currentAQI)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Air Quality Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Map</CardTitle>
            <CardDescription>Current air quality conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <MapComponent 
                center={location ? [location.latitude, location.longitude] : [51.505, -0.09]} 
                zoom={13}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Index (AQI)</CardTitle>
            <CardDescription>24-hour AQI trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">{currentAQI}</span>
                <Badge className={`ml-2 ${aqiCategory.color}`}>{aqiCategory.label}</Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={airQualityData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pollutant Levels</CardTitle>
            <CardDescription>Current levels of major air pollutants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pollutants.map((pollutant, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <Wind className="h-6 w-6 mr-2" />
                    <span>{pollutant.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {pollutant.level} {pollutant.unit}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


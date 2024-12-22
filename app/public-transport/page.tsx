'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bus, Train, Bike } from 'lucide-react'
import MapComponent from '@/components/map-component'
import { useUserLocation } from '@/components/use-user-location'

const transportModes = [
  { name: 'Metro', icon: Train },
  { name: 'Bus', icon: Bus },
  { name: 'Bike Share', icon: Bike },
]

const transportStatus = [
  { id: 1, mode: 'Metro', line: 'Purple Line', status: 'On Time' },
  { id: 2, mode: 'Metro', line: 'Green Line', status: 'Delayed' },
  { id: 3, mode: 'Bus', line: 'Red Line', status: 'On Time' },
  { id: 4, mode: 'Bus', line: 'Blue Line', status: 'Cancelled' },
  { id: 5, mode: 'Bike Share', line: 'Downtown Area', status: 'Available' },
  { id: 6, mode: 'Bike Share', line: 'University Area', status: 'Limited' },
]

const getBadgeVariant = (status: string) => {
  switch (status) {
    case 'On Time':
      return 'default';
    case 'Delayed':
      return 'secondary';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function PublicTransportPage() {
  const { location } = useUserLocation()
  const [selectedMode, setSelectedMode] = useState<string>('all')

  const filteredStatus = selectedMode === 'all'
    ? transportStatus
    : transportStatus.filter(item => item.mode === selectedMode)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Bangalore Metro Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transport Map</CardTitle>
            <CardDescription>Bangalore metro routes and stations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <MapComponent 
                center={location ? [location.latitude, location.longitude] : [12.9716, 77.5946]} 
                zoom={13}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transport Modes</CardTitle>
            <CardDescription>Available public transport options in Bangalore</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {transportModes.map((mode, index) => (
                <div key={index} className="flex items-center justify-center p-4 border rounded-lg">
                  <mode.icon className="h-6 w-6 mr-2" />
                  <span>{mode.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transport Status</CardTitle>
            <CardDescription>Current status of Bangalore metro and buses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select onValueChange={setSelectedMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by transport mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Metro">Metro</SelectItem>
                  <SelectItem value="Bus">Bus</SelectItem>
                  <SelectItem value="Bike Share">Bike Share</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStatus.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    {item.mode === 'Metro' && <Train className="h-6 w-6 mr-2" />}
                    {item.mode === 'Bus' && <Bus className="h-6 w-6 mr-2" />}
                    {item.mode === 'Bike Share' && <Bike className="h-6 w-6 mr-2" />}
                    <span>{item.line}</span>
                  </div>
                  <Badge variant={getBadgeVariant(item.status)}>
                    {item.status}
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

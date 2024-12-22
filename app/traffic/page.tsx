'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Car } from 'lucide-react'
import MapComponent from '@/components/map-component'
import { useUserLocation } from '@/components/use-user-location'

const trafficUpdates = [
  { id: 1, title: 'Main Street Closure', description: 'Main Street closed due to construction. Expected to reopen at 5 PM.', severity: 'high' },
  { id: 2, title: 'Highway Accident', description: 'Multi-vehicle accident on Highway 101. Expect delays of up to 30 minutes.', severity: 'medium' },
  { id: 3, title: 'Downtown Congestion', description: 'Heavy traffic in the downtown area due to ongoing events.', severity: 'low' },
]

const trafficLevels = [
  { road: 'Main Street', level: 'Heavy' },
  { road: 'Broadway', level: 'Moderate' },
  { road: '5th Avenue', level: 'Light' },
  { road: 'Park Road', level: 'Heavy' },
  { road: 'River Street', level: 'Light' },
]

export default function TrafficPage() {
  const { location } = useUserLocation()
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')

  const filteredUpdates = selectedSeverity === 'all'
    ? trafficUpdates
    : trafficUpdates.filter(update => update.severity === selectedSeverity)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Traffic Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Map</CardTitle>
            <CardDescription>Real-time traffic conditions</CardDescription>
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
            <CardTitle>Traffic Updates</CardTitle>
            <CardDescription>Latest traffic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {filteredUpdates.map((update) => (
                <Alert key={update.id} variant={update.severity === 'high' ? 'destructive' : 'default'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{update.title}</AlertTitle>
                  <AlertDescription>{update.description}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Traffic Levels</CardTitle>
            <CardDescription>Traffic conditions on major roads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trafficLevels.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <Car className="h-6 w-6 mr-2" />
                    <span>{item.road}</span>
                  </div>
                  <Badge variant={item.level === 'Heavy' ? 'destructive' : item.level === 'Moderate' ? 'default' : 'secondary'}>
                    {item.level}
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


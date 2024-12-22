'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarDays, MapPin, Users } from 'lucide-react'
import MapComponent from '@/components/map-component'
import { useUserLocation } from '@/components/use-user-location'

const events = [
  { id: 1, name: 'City Festival', date: '2023-07-15', location: 'Central Park', category: 'Festival', attendees: 5000 },
  { id: 2, name: 'Farmers Market', date: '2023-07-16', location: 'Main Square', category: 'Market', attendees: 1000 },
  { id: 3, name: 'Tech Conference', date: '2023-07-20', location: 'Convention Center', category: 'Conference', attendees: 2000 },
  { id: 4, name: 'Art Exhibition', date: '2023-07-22', location: 'City Gallery', category: 'Art', attendees: 500 },
  { id: 5, name: 'Food Truck Rally', date: '2023-07-25', location: 'Riverside Park', category: 'Food', attendees: 3000 },
  { id: 6, name: 'Charity Run', date: '2023-07-30', location: 'City Streets', category: 'Sports', attendees: 1500 },
]

export default function EventsPage() {
  const { location } = useUserLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredEvents = events.filter(event => 
    (selectedCategory === 'all' || event.category === selectedCategory) &&
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Local Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Map</CardTitle>
            <CardDescription>Locations of upcoming events</CardDescription>
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
            <CardTitle>Event Search</CardTitle>
            <CardDescription>Find events by name or category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Festival">Festival</SelectItem>
                  <SelectItem value="Market">Market</SelectItem>
                  <SelectItem value="Conference">Conference</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>List of local events in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg space-y-2">
                  <h3 className="font-semibold">{event.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} attendees</span>
                  </div>
                  <Badge>{event.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


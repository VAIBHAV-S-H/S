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
  { id: 1, name: 'Bangalore Music Festival', date: '2023-08-15', location: 'Cubbon Park', category: 'Festival', attendees: 7000 },
  { id: 2, name: 'Bangalore Farmers Market', date: '2023-08-16', location: 'Indiranagar', category: 'Market', attendees: 1200 },
  { id: 3, name: 'Bangalore Tech Summit', date: '2023-08-20', location: 'Bangalore International Exhibition Centre', category: 'Conference', attendees: 2500 },
  { id: 4, name: 'Bangalore Art Fair', date: '2023-08-22', location: 'National Gallery of Modern Art', category: 'Art', attendees: 800 },
  { id: 5, name: 'Bangalore Food Truck Festival', date: '2023-08-25', location: 'MG Road', category: 'Food', attendees: 4000 },
  { id: 6, name: 'Bangalore Charity Run', date: '2023-08-30', location: 'Cubbon Park', category: 'Sports', attendees: 2000 },
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


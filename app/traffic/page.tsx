'use client'
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, Car } from 'lucide-react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import { useUserLocation } from '@/components/use-user-location'

type TrafficIncident = {
  id: string
  title: string
  description: string
  severity: string
  type: string
  coordinates?: [number, number]
}

interface TrafficFlow {
  road: string;
  level: 'Heavy' | 'Moderate' | 'Light';
  currentSpeed?: number;
  freeFlowSpeed?: number;
}

const TOMTOM_API_KEY = 'OOGQ6D5aOrt57WK9I1YxBg7lxrTjSWpr'
const TOMTOM_API_BASE = 'https://api.tomtom.com/traffic'

export default function TrafficPage() {
  const { location } = useUserLocation()
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [trafficIncidents, setTrafficIncidents] = useState<TrafficIncident[]>([])
  const [trafficFlow, setTrafficFlow] = useState<TrafficFlow[]>([])
  const mapElement = useRef(null)

  useEffect(() => {
    const fetchTrafficData = async () => {
      if (location) {
        try {
          // Fetch traffic incidents
          const incidentsResponse = await fetch(
            `https://api.tomtom.com/traffic/services/5/incidents/s3/${location.latitude},${location.longitude}/10/json?key=${TOMTOM_API_KEY}&language=en-GB`
          )

          if (!incidentsResponse.ok) {
            console.error('Failed to fetch incidents:', incidentsResponse.statusText)
            return;
          }
          
          const incidentsData = await incidentsResponse.json()
          
          // Transform incidents data
          const formattedIncidents = (incidentsData.incidents || []).map((incident: any) => ({
            id: incident.id,
            title: incident.type,
            description: incident.description,
            severity: incident.magnitudeOfDelay <= 2 ? 'low' : 
                     incident.magnitudeOfDelay <= 4 ? 'medium' : 'high'
          }))
          
          setTrafficIncidents(formattedIncidents)

          // Fetch traffic flow
          const flowResponse = await fetch(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_API_KEY}&point=${location.latitude},${location.longitude}`
          )
          const flowData = await flowResponse.json()
          
          // Transform flow data
          const formattedFlow: TrafficFlow[] = [{
            road: flowData.flowSegmentData?.roadName || 'Unknown Road',
            level: (flowData.flowSegmentData?.currentSpeed < flowData.flowSegmentData?.freeFlowSpeed * 0.5 
              ? 'Heavy' 
              : flowData.flowSegmentData?.currentSpeed < flowData.flowSegmentData?.freeFlowSpeed * 0.8 
              ? 'Moderate' 
              : 'Light') as 'Heavy' | 'Moderate' | 'Light',
            currentSpeed: flowData.flowSegmentData?.currentSpeed
          }]
          
          setTrafficFlow(formattedFlow)
        } catch (error) {
          console.error('Error fetching traffic data:', error)
        }
      }
    }

    fetchTrafficData()
    // Refresh data every 5 minutes
    const interval = setInterval(fetchTrafficData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [location])

  useEffect(() => {
    if (!mapElement.current || !location) return

    const map = tt.map({
      key: TOMTOM_API_KEY,
      container: mapElement.current,
      center: [location.longitude, location.latitude],
      zoom: 13,
      stylesVisibility: {
        trafficFlow: true,
        trafficIncidents: true
      }
    })

    // Add traffic flow layer
    map.on('load', () => {
      map.addLayer({
        'id': 'traffic-flow',
        'type': 'line',
        'source': {
          'type': 'vector',
          'url': `https://api.tomtom.com/traffic/map/4/tile/flow/relative/{z}/{x}/{y}.pbf?key=${TOMTOM_API_KEY}`
        },
        'source-layer': 'flow',
        'paint': {
          'line-width': 2,
          'line-color': [
            'match',
            ['get', 'traffic_level'],
            'heavy', '#ff0000',
            'moderate', '#ffff00',
            'light', '#00ff00',
            '#808080'
          ]
        }
      });

      // Add traffic incidents
      trafficIncidents.forEach(incident => {
        if (incident.coordinates) {
          const [lng, lat] = incident.coordinates
          new tt.Marker()
            .setLngLat([lng, lat])
            .setPopup(new tt.Popup().setHTML(`
              <h3>${incident.title}</h3>
              <p>${incident.description}</p>
            `))
            .addTo(map)
        }
      })
    })

    return () => map.remove()
  }, [location, trafficIncidents])

  const filteredUpdates = selectedSeverity === 'all'
    ? trafficIncidents
    : trafficIncidents.filter(incident => incident.severity === selectedSeverity)

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
            <div className="h-[400px]" ref={mapElement}>
              {/* TomTom map will be rendered here */}
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
              {filteredUpdates.length > 0 ? (
                filteredUpdates.map((update) => (
                  <Alert key={update.id} variant={update.severity === 'high' ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{update.title}</AlertTitle>
                    <AlertDescription>{update.description}</AlertDescription>
                  </Alert>
                ))
              ) : (
                <p>No traffic updates available.</p>
              )}
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
              {trafficFlow.length > 0 ? (
                trafficFlow.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <Car className="h-6 w-6 mr-2" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.road}</span>
                        {item.currentSpeed && (
                          <span className="text-sm text-muted-foreground">
                            Current: {Math.round(item.currentSpeed)} km/h
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant={item.level === 'Heavy' ? 'destructive' : item.level === 'Moderate' ? 'default' : 'secondary'}>
                      {item.level}
                    </Badge>
                  </div>
                ))
              ) : (
                <p>No current traffic levels available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function determineSeverity(category: string): string {
  if (category?.includes('accident') || category?.includes('closure')) return 'high'
  if (category?.includes('slow') || category?.includes('queue')) return 'medium'
  return 'low'
}


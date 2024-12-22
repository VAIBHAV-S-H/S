import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const trafficUpdates = [
  { id: 1, title: 'Main Street Closure', description: 'Main Street closed due to construction. Expected to reopen at 5 PM.' },
  { id: 2, title: 'Highway Accident', description: 'Multi-vehicle accident on Highway 101. Expect delays of up to 30 minutes.' },
]

export default function TrafficUpdates() {
  return (
    <div className="space-y-4">
      {trafficUpdates.map((update) => (
        <Alert key={update.id} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{update.title}</AlertTitle>
          <AlertDescription>{update.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}


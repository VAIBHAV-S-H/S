import { CalendarDays } from 'lucide-react'

const events = [
  { id: 1, name: 'City Festival', date: '2023-07-15', location: 'Central Park' },
  { id: 2, name: 'Farmers Market', date: '2023-07-16', location: 'Main Square' },
  { id: 3, name: 'Tech Conference', date: '2023-07-20', location: 'Convention Center' },
]

export default function LocalEvents() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-center space-x-4">
          <CalendarDays className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="font-semibold">{event.name}</h3>
            <p className="text-sm text-gray-500">{event.date} at {event.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


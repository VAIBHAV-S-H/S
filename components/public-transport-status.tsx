import { Badge } from '@/components/ui/badge'

const transportStatus = [
  { id: 1, line: 'Red Line', status: 'On Time' },
  { id: 2, line: 'Blue Line', status: 'Delayed' },
  { id: 3, line: 'Green Line', status: 'On Time' },
]

export default function PublicTransportStatus() {
  return (
    <div className="space-y-2">
      {transportStatus.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <span>{item.line}</span>
          <Badge variant={item.status === 'On Time' ? 'default' : 'destructive'}>
            {item.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}


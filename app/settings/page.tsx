'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

export default function SettingsPage() {
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    toast("Settings updated", {
      description: "Your preferences have been saved successfully."
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="traffic-alerts">Traffic Alerts</Label>
                <Switch id="traffic-alerts" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="air-quality">Air Quality Updates</Label>
                <Switch id="air-quality" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="public-transport">Public Transport Delays</Label>
                <Switch id="public-transport" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="events">Local Event Reminders</Label>
                <Switch id="events" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Map View</Label>
                <Select defaultValue="traffic">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default map view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="air-quality">Air Quality</SelectItem>
                    <SelectItem value="public-transport">Public Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Update Frequency</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue placeholder="Select update frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Every minute</SelectItem>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  )
}


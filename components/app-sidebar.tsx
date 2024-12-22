import { Home, Map, Wind, Bus, Calendar, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

export function AppSidebar() {
  const { user } = useAuth()

  const navItems = [
    { icon: Home, label: 'Overview', href: '/' },
    { icon: Map, label: 'Traffic', href: '/traffic' },
    { icon: Wind, label: 'Air Quality', href: '/air-quality' },
    { icon: Bus, label: 'Public Transport', href: '/public-transport' },
    { icon: Calendar, label: 'Local Events', href: '/events' },
  ]

  // Add Settings nav item for all users
  navItems.push({ icon: Settings, label: 'Settings', href: user ? '/settings' : '/auth' })

  return (
    <Sidebar className="h-screen">
      <SidebarHeader className="flex items-center justify-center py-4 bg-primary">
        <h1 className="text-2xl font-bold text-primary-foreground">Smart City</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


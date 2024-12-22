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
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function AppSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

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
      <SidebarHeader className="flex items-center py-4 bg-primary pl-4">
        <Image 
          src="https://raw.githubusercontent.com/Simurgh1/SmartCity/main/smartspgere-logo.png?raw=true"
          alt="Smart Sphere Logo"
          width={70}
          height={70}
        />
        <h1 className="text-2xl font-bold text-primary-foreground ml-3">Smart Sphere</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center w-full p-2 rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href && "bg-accent text-accent-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
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


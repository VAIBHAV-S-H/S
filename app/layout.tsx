import { Inter } from 'next/font/google'
import { Toaster } from "sonner"
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SmartSphere - Smart City Dashboard',
  description: 'Discover a city designed for sustainability, connectivity, and convenience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel='stylesheet' 
          type='text/css'
          href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.1/maps/maps.css'
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


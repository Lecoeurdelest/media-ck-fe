import { SettingsPanel } from '@components/SettingsPanel'
import { Sidebar } from '@components/Sidebar'
import { SystemLogs } from '@components/SystemLogs'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import ScrollTop from '../components/ui/scroll-top'

export const Route = createFileRoute('/_main')({
  component: RouteComponent
})

function RouteComponent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  return (
    <div className='size-full flex bg-white'>
      {/* Left Sidebar */}
      <Sidebar onSettingsClick={() => setIsSettingsOpen(true)} />

      {/* Main Content Area */}
      <Outlet />

      {/* Settings Modal */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* System Logs - Always visible */}
      <SystemLogs />
      <ScrollTop window={() => window} />
    </div>
  )
}

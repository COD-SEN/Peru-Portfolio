"use client"

import { useState, useEffect } from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Volume2, Wifi, Battery } from "lucide-react"

interface TaskbarWindow {
  id: string
  title: string
  icon: LucideIcon
  isActive: boolean
  isMinimized: boolean
}

interface TaskbarProps {
  openWindows: TaskbarWindow[]
  onWindowClick: (id: string) => void
  onStartMenuToggle?: () => void
}

export function Taskbar({ openWindows, onWindowClick, onStartMenuToggle }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  const iconColorMap: Record<string, string> = {
    "About Me": "text-blue-500",
    Projects: "text-violet-500",
    Resume: "text-emerald-500",
    "Social Profiles": "text-pink-500",
    Interests: "text-red-500",
    "Tech Ambitions": "text-amber-500",
    "Contact Me": "text-teal-500",
    Settings: "text-slate-500",
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 sm:h-14 win11-taskbar flex items-center justify-center px-2 z-50">
      <div className="flex items-center gap-0.5 sm:gap-1 win11-glass rounded-xl px-1.5 sm:px-2 py-1">
        {/* Windows Start button */}
        <Button
          onClick={onStartMenuToggle}
          className="h-9 w-9 sm:h-10 sm:w-10 p-0 bg-transparent hover:bg-white/25 active:bg-white/40 rounded-lg transition-all flex items-center justify-center"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#F25022" />
            <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#7FBA00" />
            <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#00A4EF" />
            <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#FFB900" />
          </svg>
        </Button>

        <div className="w-px h-5 sm:h-6 bg-gray-300 mx-0.5 sm:mx-1" />

        {/* Open windows */}
        {openWindows.map((window) => {
          const Icon = window.icon
          const iconColor = iconColorMap[window.title] || "text-gray-800"
          return (
            <Button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-9 px-2 sm:h-10 sm:px-3 flex items-center gap-1.5 rounded-lg text-sm font-medium transition-all ${
                window.isActive && !window.isMinimized
                  ? "bg-white/40 backdrop-blur-sm shadow-sm border border-white/20"
                  : "bg-transparent hover:bg-white/20 active:bg-white/30"
              }`}
            >
              <Icon className={`w-4 h-4 ${iconColor}`} />
              <span className="hidden sm:inline text-xs text-gray-700 max-w-[80px] truncate font-semibold">
                {window.title}
              </span>
            </Button>
          )
        })}
      </div>

      {/* System tray */}
      <div className="absolute right-2 sm:right-4 flex items-center gap-2 sm:gap-3 win11-glass rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-2">
        <div className="hidden sm:flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-700" />
          <Wifi className="w-4 h-4 text-gray-700" />
          <Battery className="w-4 h-4 text-gray-700" />
        </div>
        <div className="hidden sm:block w-px h-6 bg-gray-300" />
        <div className="text-right">
          <div className="text-[10px] sm:text-xs font-semibold text-gray-800">
            {formatTime(currentTime)}
          </div>
          <div className="text-[9px] sm:text-[10px] text-gray-600">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </div>
  )
}

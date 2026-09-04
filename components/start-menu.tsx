"use client"

import { useState } from "react"
import { User, FolderOpen, FileText, Share2, Heart, Target, Mail, Settings, ChevronRight, Clock } from "lucide-react"
import { Window } from "@/components/window"
import { ProfileContent } from "@/components/windows/profile-content"
import { ProjectsContent } from "@/components/windows/projects-content"
import { ResumeContent } from "@/components/windows/resume-content"
import { SocialsContent } from "@/components/windows/socials-content"
import { InterestsContent } from "@/components/windows/interests-content"
import { AmbitionsContent } from "@/components/windows/ambitions-content"
import { ContactContent } from "@/components/windows/contact-content"
import { SettingsPanel } from "@/components/settings-panel"

export function StartMenu() {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState<string | null>("/images/screenshot-202026-01-01-20234810.png?v=" + Date.now())

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id])
    }
    setMinimizedWindows(minimizedWindows.filter((w) => w !== id))
    setActiveWindow(id)
  }

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w !== id))
    setMinimizedWindows(minimizedWindows.filter((w) => w !== id))
    if (activeWindow === id) {
      setActiveWindow(openWindows[openWindows.length - 2] || null)
    }
  }

  const minimizeWindow = (id: string) => {
    if (!minimizedWindows.includes(id)) {
      setMinimizedWindows([...minimizedWindows, id])
    }
    if (activeWindow === id) {
      setActiveWindow(null)
    }
  }

  const windows = [
    { id: "profile", title: "About Me", icon: User, content: ProfileContent },
    { id: "projects", title: "My Projects", icon: FolderOpen, content: ProjectsContent },
    { id: "resume", title: "My Resume", icon: FileText, content: ResumeContent },
    { id: "socials", title: "Social Profiles", icon: Share2, content: SocialsContent },
    { id: "interests", title: "Interests", icon: Heart, content: InterestsContent },
    { id: "ambitions", title: "Tech Ambitions", icon: Target, content: AmbitionsContent },
    { id: "contact", title: "Contact Me", icon: Mail, content: ContactContent },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Start Menu */}
      <div className="absolute left-0 bottom-12 w-[420px] flex shadow-2xl rounded-tr-lg rounded-tl-lg overflow-hidden border-2 border-[#0054E3]">
        {/* Left Column */}
        <div className="w-[200px] bg-gradient-to-b from-[#245EDC] to-[#3A6FE8] flex flex-col">
          {/* User Profile */}
          <div className="px-4 py-3 flex items-center gap-3 border-b border-white/20">
            <div className="w-12 h-12 rounded bg-white/90 flex items-center justify-center">
              <User className="w-8 h-8 text-[#245EDC]" />
            </div>
            <div className="text-white font-bold text-lg">BRIAN</div>
          </div>

          {/* Left Menu Items */}
          <div className="flex-1 py-2">
            <button
              onClick={() => openWindow("projects")}
              className="w-full px-4 py-2 flex items-center gap-3 text-white hover:bg-[#3A6FE8] transition-colors"
            >
              <FolderOpen className="w-6 h-6" />
              <div>
                <div className="font-semibold text-left">My Projects</div>
                <div className="text-xs text-white/80">View my work</div>
              </div>
            </button>
            <button
              onClick={() => openWindow("contact")}
              className="w-full px-4 py-2 flex items-center gap-3 text-white hover:bg-[#3A6FE8] transition-colors"
            >
              <Mail className="w-6 h-6" />
              <div>
                <div className="font-semibold text-left">Contact Me</div>
                <div className="text-xs text-white/80">Send me a message</div>
              </div>
            </button>
            <button
              onClick={() => openWindow("profile")}
              className="w-full px-4 py-2 flex items-center gap-3 text-white hover:bg-[#3A6FE8] transition-colors"
            >
              <User className="w-6 h-6" />
              <div className="font-semibold text-left">About Me</div>
            </button>
            <button
              onClick={() => openWindow("interests")}
              className="w-full px-4 py-2 flex items-center gap-3 text-white hover:bg-[#3A6FE8] transition-colors"
            >
              <Heart className="w-6 h-6" />
              <div className="font-semibold text-left">Interests</div>
            </button>
            <button
              onClick={() => openWindow("ambitions")}
              className="w-full px-4 py-2 flex items-center gap-3 text-white hover:bg-[#3A6FE8] transition-colors"
            >
              <Target className="w-6 h-6" />
              <div className="font-semibold text-left">Education Practice</div>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="w-full px-4 py-2 flex items-center gap-3 text-white hover:bg-[#3A6FE8] transition-colors"
            >
              <Settings className="w-6 h-6" />
              <div className="font-semibold text-left">Music Player</div>
            </button>
          </div>

          {/* All Programs Button */}
          <div className="border-t border-white/20">
            <button className="w-full px-4 py-3 flex items-center gap-2 text-white hover:bg-[#3A6FE8] transition-colors font-bold">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
              All Programs
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-[#D3E5FA] flex flex-col">
          <div className="flex-1 py-2 px-1">
            <button
              onClick={() => openWindow("socials")}
              className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded"
            >
              <Share2 className="w-5 h-5" />
              <div className="font-semibold text-sm">Instagram</div>
            </button>
            <button
              onClick={() => openWindow("socials")}
              className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded"
            >
              <Share2 className="w-5 h-5" />
              <div className="font-semibold text-sm">Github</div>
            </button>
            <button
              onClick={() => openWindow("socials")}
              className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded"
            >
              <Share2 className="w-5 h-5" />
              <div className="font-semibold text-sm">LinkedIn</div>
            </button>
            <div className="my-1 h-px bg-gray-300" />
            <button className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <div className="font-semibold text-sm">Recently Used</div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="my-1 h-px bg-gray-300" />
            <button
              onClick={() => setShowSettings(true)}
              className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded"
            >
              <Settings className="w-5 h-5" />
              <div className="font-semibold text-sm">Command Prompt</div>
            </button>
            <button
              onClick={() => openWindow("projects")}
              className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded"
            >
              <FolderOpen className="w-5 h-5" />
              <div className="font-semibold text-sm">Image Viewer</div>
            </button>
            <button
              onClick={() => openWindow("resume")}
              className="w-full px-3 py-2 flex items-center gap-3 text-gray-800 hover:bg-[#3168D5] hover:text-white transition-colors rounded"
            >
              <FileText className="w-5 h-5" />
              <div className="font-semibold text-sm">My Resume</div>
            </button>
          </div>

          {/* Bottom Buttons */}
          <div className="border-t border-gray-300 bg-[#5492F7] flex">
            <button className="flex-1 px-3 py-3 flex items-center justify-center gap-2 text-white hover:bg-[#3168D5] transition-colors font-bold text-sm border-r border-white/30">
              <div className="w-5 h-5 bg-white/20 rounded" />
              Log Off
            </button>
            <button className="flex-1 px-3 py-3 flex items-center justify-center gap-2 text-white hover:bg-[#3168D5] transition-colors font-bold text-sm">
              <div className="w-5 h-5 bg-white/20 rounded" />
              Shut Down
            </button>
          </div>
        </div>
      </div>

      {/* Windows XP Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-[#245EDC] to-[#1A4FBD] border-t-2 border-[#2E5FD9] flex items-center px-2 shadow-lg">
        {/* Start Button */}
        <button className="h-9 px-4 bg-gradient-to-b from-[#52B152] to-[#2D8D2D] rounded-md shadow-md flex items-center gap-2 font-bold text-white text-sm hover:brightness-110 transition-all border border-[#2D8D2D]">
          <div className="w-6 h-6 bg-white/20 rounded" />
          start
        </button>

        {/* Quick Launch & Open Windows */}
        <div className="flex-1 flex items-center gap-1 ml-2">
          {openWindows.map((id) => {
            const window = windows.find((w) => w.id === id)
            const Icon = window?.icon || User
            const isActive = activeWindow === id
            const isMinimized = minimizedWindows.includes(id)

            return (
              <button
                key={id}
                onClick={() => {
                  if (minimizedWindows.includes(id)) {
                    setMinimizedWindows(minimizedWindows.filter((w) => w !== id))
                  }
                  setActiveWindow(id)
                }}
                className={`h-8 px-3 flex items-center gap-2 text-white text-xs font-semibold rounded transition-all ${
                  isActive && !isMinimized
                    ? "bg-[#1A4FBD] shadow-inner border border-[#0F3A8D]"
                    : "bg-[#3168D5] hover:bg-[#2757C5] shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="max-w-[120px] truncate">{window?.title}</span>
              </button>
            )
          })}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 px-3 bg-[#0F8FDD] rounded h-8">
          <div className="w-4 h-4 bg-white/20 rounded" />
          <div className="w-4 h-4 bg-white/20 rounded" />
          <div className="text-white text-xs font-semibold">11:47 PM</div>
        </div>
      </div>

      {/* Windows */}
      {windows.map((window) => {
        const isOpen = openWindows.includes(window.id)
        const isActive = activeWindow === window.id
        const isMinimized = minimizedWindows.includes(window.id)
        const Content = window.content

        return isOpen && !isMinimized ? (
          <Window
            key={window.id}
            title={window.title}
            isActive={isActive}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => setActiveWindow(window.id)}
          >
            <Content />
          </Window>
        ) : null
      })}

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onUpdate={() => {}} />}
    </div>
  )
}

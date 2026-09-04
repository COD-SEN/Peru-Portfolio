"use client"

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react"
import { DesktopIcon } from "@/components/desktop-icon"
import { Window } from "@/components/window"
import { WindowSkeleton } from "@/components/window-skeleton"

// Lazy load window content components for better performance
const ProfileContent = lazy(() => import("@/components/windows/profile-content").then(m => ({ default: m.ProfileContent })))
const ProjectsContent = lazy(() => import("@/components/windows/projects-content").then(m => ({ default: m.ProjectsContent })))
const ResumeContent = lazy(() => import("@/components/windows/resume-content").then(m => ({ default: m.ResumeContent })))
const SocialsContent = lazy(() => import("@/components/windows/socials-content").then(m => ({ default: m.SocialsContent })))
const InterestsContent = lazy(() => import("@/components/windows/interests-content").then(m => ({ default: m.InterestsContent })))
const AmbitionsContent = lazy(() => import("@/components/windows/ambitions-content").then(m => ({ default: m.AmbitionsContent })))
const ContactContent = lazy(() => import("@/components/windows/contact-content").then(m => ({ default: m.ContactContent })))
const DocumentsContent = lazy(() => import("@/components/windows/documents-content").then(m => ({ default: m.DocumentsContent })))
import { Taskbar } from "@/components/taskbar"
import { SettingsPanel } from "@/components/settings-panel"
import { PasswordDialog } from "@/components/password-dialog"
import { getSettings } from "@/lib/storage"
import {
  User,
  FolderOpen,
  FileText,
  Share2,
  Heart,
  Target,
  Mail,
  Settings,
  RotateCcw,
  LogOut,
} from "lucide-react"

interface DesktopViewProps {
  onRestart: () => void
  onLogout: () => void
}

export function DesktopView({ onRestart, onLogout }: DesktopViewProps) {
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [desktopBackground, setDesktopBackground] = useState<string | null>(null)
  const startMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const settings = getSettings()
    if (settings.desktopBackground) {
      setDesktopBackground(settings.desktopBackground)
    } else {
      setDesktopBackground("/brian-desktop-background.png")
    }
  }, [])

  // Close start menu on any outside click
  useEffect(() => {
    if (!showStartMenu) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(e.target as Node)
      ) {
        setShowStartMenu(false)
      }
    }

    // Use a slight timeout so the toggle click itself doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showStartMenu])

  const openWindow = useCallback(
    (id: string) => {
      setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]))
      setMinimizedWindows((prev) => prev.filter((w) => w !== id))
      setActiveWindow(id)
    },
    [],
  )

  const closeWindow = useCallback(
    (id: string) => {
      setOpenWindows((prev) => prev.filter((w) => w !== id))
      setMinimizedWindows((prev) => prev.filter((w) => w !== id))
      setActiveWindow((prev) =>
        prev === id ? null : prev,
      )
    },
    [],
  )

  const minimizeWindow = useCallback(
    (id: string) => {
      setMinimizedWindows((prev) =>
        prev.includes(id) ? prev : [...prev, id],
      )
      setActiveWindow((prev) => (prev === id ? null : prev))
    },
    [],
  )

  const handleSettingsUpdate = () => {
    const settings = getSettings()
    if (settings.desktopBackground) {
      setDesktopBackground(settings.desktopBackground)
    } else {
      setDesktopBackground("/brian-desktop-background.png")
    }
  }

  const handleSettingsClick = () => {
    setShowPasswordDialog(true)
  }

  const handlePasswordSuccess = () => {
    setShowPasswordDialog(false)
    setShowSettings(true)
  }

  const windows = [
    { id: "profile", title: "About Me", icon: User, content: ProfileContent },
    { id: "projects", title: "Projects", icon: FolderOpen, content: ProjectsContent },
    { id: "resume", title: "Resume", icon: FileText, content: ResumeContent },
    { id: "socials", title: "Social Profiles", icon: Share2, content: SocialsContent },
    { id: "interests", title: "Interests", icon: Heart, content: InterestsContent },
    { id: "ambitions", title: "Education Practice", icon: Target, content: AmbitionsContent },
    { id: "documents", title: "Documents", icon: FolderOpen, content: DocumentsContent },
    { id: "contact", title: "Contact Me", icon: Mail, content: ContactContent },
  ]

  const startMenuGradients = [
    "from-rose-400 to-rose-600",
    "from-violet-400 to-purple-600",
    "from-cyan-300 to-blue-500",
    "from-pink-400 to-rose-500",
    "from-amber-300 to-orange-500",
    "from-purple-300 to-purple-500",
    "from-fuchsia-400 to-pink-600",
    "from-teal-300 to-emerald-500",
  ]

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: desktopBackground
            ? `url('${desktopBackground}')`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
          backgroundSize: desktopBackground ? "cover" : "400% 400%",
          animation: desktopBackground ? "none" : "gradient-shift 15s ease infinite",
        }}
      />

      {/* Desktop icons -- responsive wrapping grid that fits on screen */}
      <div className="absolute top-14 sm:top-2 left-0 right-0 bottom-14 overflow-y-auto p-2 sm:p-4 md:p-5">
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-2 gap-1 sm:gap-2 w-fit">
          {windows.map((window) => (
            <DesktopIcon
              key={window.id}
              icon={window.icon}
              label={window.title}
              onClick={() => openWindow(window.id)}
            />
          ))}
          <DesktopIcon icon={Settings} label="Settings" onClick={handleSettingsClick} />
        </div>
      </div>

      {/* Windows -- responsive sizing */}
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
            <Suspense fallback={<WindowSkeleton />}>
              <Content />
            </Suspense>
          </Window>
        ) : null
      })}

      {/* Start menu with 10 icons (7 windows + settings + restart + logout) */}
      {showStartMenu && (
        <div
          ref={startMenuRef}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[92vw] max-w-[620px] win11-glass rounded-2xl shadow-2xl overflow-hidden z-[100] border border-white/20 animate-[slide-up_0.2s_ease-out]"
        >
          <div className="p-4 sm:p-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Pinned</p>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 sm:gap-3">
              {/* 7 window icons */}
              {windows.map((window, i) => (
                <button
                  key={window.id}
                  onClick={() => {
                    openWindow(window.id)
                    setShowStartMenu(false)
                  }}
                  className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl hover:bg-white/30 active:bg-white/40 transition-all group"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${startMenuGradients[i]} shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all`}
                  >
                    <window.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.8} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-800 text-center leading-tight">
                    {window.title}
                  </span>
                </button>
              ))}

              {/* Settings */}
              <button
                onClick={() => {
                  setShowPasswordDialog(true)
                  setShowStartMenu(false)
                }}
                className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl hover:bg-white/30 active:bg-white/40 transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-500 to-gray-700 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-800 text-center leading-tight">
                  Settings
                </span>
              </button>

              {/* Restart */}
              <button
                onClick={() => {
                  setShowStartMenu(false)
                  onRestart()
                }}
                className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl hover:bg-white/30 active:bg-white/40 transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform">
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-800 text-center leading-tight">
                  Restart
                </span>
              </button>

              {/* Log Out */}
              <button
                onClick={() => {
                  setShowStartMenu(false)
                  onLogout()
                }}
                className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl hover:bg-white/30 active:bg-white/40 transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-red-700 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all">
                  <LogOut className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-800 text-center leading-tight">
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((id) => {
          const window = windows.find((w) => w.id === id)
          return {
            id,
            title: window?.title || "",
            icon: window?.icon || User,
            isActive: activeWindow === id,
            isMinimized: minimizedWindows.includes(id),
          }
        })}
        onWindowClick={(id) => {
          if (minimizedWindows.includes(id)) {
            setMinimizedWindows(minimizedWindows.filter((w) => w !== id))
          }
          setActiveWindow(id)
        }}
        onStartMenuToggle={() => setShowStartMenu(!showStartMenu)}
      />

      {showPasswordDialog && (
        <PasswordDialog
          onClose={() => setShowPasswordDialog(false)}
          onSuccess={handlePasswordSuccess}
        />
      )}

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} onUpdate={handleSettingsUpdate} />
      )}
    </div>
  )
}

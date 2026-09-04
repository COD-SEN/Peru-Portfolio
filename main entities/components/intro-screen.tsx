"use client"

import { useEffect, useState } from "react"
import { getSettings } from "@/lib/storage"

interface IntroScreenProps {
  onEnter: () => void
}

export function IntroScreen({ onEnter }: IntroScreenProps) {
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [userName, setUserName] = useState("MARIE")
  const [userTitle, setUserTitle] = useState("Data Analyst")

  useEffect(() => {
    const settings = getSettings()
    if (settings.userAvatar) setUserAvatar(settings.userAvatar)
    if (settings.userName) setUserName(settings.userName)
    if (settings.userTitle) setUserTitle(settings.userTitle)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Welcome text at top */}
      <div className="text-center z-10 mb-6 md:mb-10 animate-[slide-up_0.6s_ease-out]">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tight text-balance">
          Welcome
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/80 mt-2 font-medium">
          To Your Digital Workspace
        </p>
      </div>

      {/* Content container */}
      <div className="flex flex-col items-center gap-4 md:gap-6 z-10 animate-[slide-up_0.8s_ease-out_0.1s_backwards]">
        {/* Clickable avatar only */}
        <button
          onClick={onEnter}
          className="group relative transition-transform duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
          aria-label="Enter portfolio"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60 blur-2xl group-hover:opacity-100 transition-opacity duration-300" />

          {/* Avatar container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-1.5 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/tech-avatar-icon.png"
                  alt="Portfolio avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Pulse ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping pointer-events-none"
            style={{ animationDuration: "2.5s" }}
          />
        </button>

        {/* User info - non-clickable */}
        <div className="text-center">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
            {userName}
          </h2>
          <p className="text-xs sm:text-lg md:text-xl text-white/90 drop-shadow font-medium mt-1">
            {userTitle}
          </p>
        </div>

        {/* Instruction text - non-clickable */}
        <span className="text-sm font-semibold text-white/80 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2">
          Click the avatar to enter
        </span>
      </div>

      {/* Bottom info */}
      <div className="text-center z-10 mt-8 md:mt-12 animate-[slide-up_0.8s_ease-out_0.3s_backwards]">
        <p className="text-white/70 text-xs sm:text-sm drop-shadow">
          Your personalized Windows 11 portfolio experience
        </p>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { getSettings } from "@/lib/storage"

const LOADING_MESSAGES = [
  { at: 0, text: "Initializing system..." },
  { at: 8, text: "Loading core modules..." },
  { at: 18, text: "Loading system resources..." },
  { at: 30, text: "Starting Windows services..." },
  { at: 45, text: "Preparing user environment..." },
  { at: 60, text: "Loading personal settings..." },
  { at: 75, text: "Configuring desktop..." },
  { at: 88, text: "Almost ready..." },
  { at: 96, text: "Welcome!" },
]

export function LoadingScreen() {
  const [percent, setPercent] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [loadingText, setLoadingText] = useState("Initializing system...")

  useEffect(() => {
    const settings = getSettings()
    if (settings.loadingBackground) {
      setBackgroundImage(settings.loadingBackground)
    } else {
      setBackgroundImage("/loading-bg-data-analytics.png")
    }
  }, [])

  // Smoothly count from 0 to 100 over ~7 seconds
  useEffect(() => {
    const totalDuration = 7000
    const intervalMs = 70 // update roughly every 70ms => ~100 steps
    let elapsed = 0

    const timer = setInterval(() => {
      elapsed += intervalMs
      const progress = Math.min(100, Math.round((elapsed / totalDuration) * 100))
      setPercent(progress)

      // Pick the right loading message based on current percentage
      for (let i = LOADING_MESSAGES.length - 1; i >= 0; i--) {
        if (progress >= LOADING_MESSAGES[i].at) {
          setLoadingText(LOADING_MESSAGES[i].text)
          break
        }
      }

      if (progress >= 100) {
        clearInterval(timer)
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-purple-950 to-pink-950"
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && <div className="absolute inset-0 bg-black/60" />}

      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center space-y-8 px-4">
          {/* Animated rings behind the text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 border-4 border-blue-500/30 rounded-full animate-ping"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 border-4 border-purple-500/30 rounded-full animate-ping"
                style={{ animationDuration: "2s", animationDelay: "0.5s" }}
              />
              <div
                className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-4 border-pink-500/30 rounded-full animate-ping"
                style={{ animationDuration: "1.5s", animationDelay: "1s" }}
              />
            </div>

            {/* Main name with gradient and glow */}
            <h1 className="relative text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter gradient-text drop-shadow-2xl animate-float-in">
              MARIE
            </h1>

            {/* Glowing underline */}
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 w-40 sm:w-64 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse shadow-lg shadow-purple-500/50" />
          </div>

          <p
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 animate-float-in tracking-wide"
            style={{ animationDelay: "0.2s" }}
          >
            Data Science Portfolio
          </p>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-2 h-2 bg-blue-400 rounded-full top-1/4 left-1/4 animate-bounce"
              style={{ animationDuration: "3s" }}
            />
            <div
              className="absolute w-3 h-3 bg-purple-400 rounded-full top-1/3 right-1/4 animate-bounce"
              style={{ animationDuration: "2s", animationDelay: "0.5s" }}
            />
            <div
              className="absolute w-2 h-2 bg-pink-400 rounded-full bottom-1/3 left-1/3 animate-bounce"
              style={{ animationDuration: "2.5s", animationDelay: "1s" }}
            />
            <div
              className="absolute w-3 h-3 bg-teal-400 rounded-full bottom-1/4 right-1/3 animate-bounce"
              style={{ animationDuration: "3.5s", animationDelay: "0.3s" }}
            />
          </div>
        </div>
      </div>

      <div className="mb-16 sm:mb-24 space-y-4 sm:space-y-6 relative z-10 w-full max-w-md px-6 sm:px-8 animate-[slide-up_0.6s_ease-out]">
        <div className="flex items-center justify-between text-white/80 text-sm font-semibold">
          <span className="animate-pulse">{loadingText}</span>
          <span className="tabular-nums font-bold text-white text-lg">{percent}%</span>
        </div>

        {/* Modern progress bar with percentage */}
        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 shadow-lg shadow-purple-500/20">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150 ease-linear shadow-lg shadow-purple-500/40"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 loading-shimmer" />
          </div>
        </div>

        <p className="text-center text-white/60 text-xs tracking-wider uppercase font-medium">Please wait...</p>
      </div>
    </div>
  )
}

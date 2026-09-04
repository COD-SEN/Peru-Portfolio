"use client"

import { useState, useEffect, useCallback } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { IntroScreen } from "@/components/intro-screen"
import { DesktopView } from "@/components/desktop-view"

type Phase = "loading" | "intro" | "desktop"

export function MainPortfolio() {
  const [phase, setPhase] = useState<Phase>("loading")
  const [restartKey, setRestartKey] = useState(0)

  useEffect(() => {
    if (phase === "loading") {
      const timer = setTimeout(() => {
        setPhase("intro")
      }, 7500)
      return () => clearTimeout(timer)
    }
  }, [phase, restartKey])

  const handleRestart = useCallback(() => {
    setRestartKey((k) => k + 1)
    setPhase("loading")
  }, [])

  const handleLogout = useCallback(() => {
    setPhase("intro")
  }, [])

  if (phase === "loading") {
    return <LoadingScreen key={restartKey} />
  }

  if (phase === "intro") {
    return <IntroScreen onEnter={() => setPhase("desktop")} />
  }

  return <DesktopView onRestart={handleRestart} onLogout={handleLogout} />
}

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Minus, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WindowProps {
  title: string
  isActive: boolean
  onClose: () => void
  onMinimize?: () => void
  onFocus: () => void
  children: React.ReactNode
}

export function Window({ title, isActive, onFocus, onClose, onMinimize, children }: WindowProps) {
  const [position, setPosition] = useState({ x: 60, y: 30 })
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const previousPosition = useRef({ x: 60, y: 30 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isMaximized) return
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    onFocus()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        })
      }
    }
    const handleMouseUp = () => setIsDragging(false)
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // Click-outside-to-close: close when clicking the backdrop (not the window itself)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore to previous position
      setPosition(previousPosition.current)
      setIsMaximized(false)
    } else {
      // Save current position and maximize
      previousPosition.current = position
      setIsMaximized(true)
    }
  }

  // Mobile: fullscreen overlay with backdrop click-outside
  if (isMobile) {
    return (
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-2 top-2 bottom-2 flex flex-col bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
            <h3 className="text-gray-800 font-semibold text-sm">{title}</h3>
            <div className="flex items-center gap-2">
              {onMinimize && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-gray-200/80 text-gray-700 p-0 rounded-lg"
                  onClick={onMinimize}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-red-500/80 hover:text-white text-gray-700 p-0 rounded-lg"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 animate-[slide-up_0.3s_ease-out]">{children}</div>
        </div>
      </div>
    )
  }

  // Desktop: draggable window with backdrop click-outside
  return (
    <div
      ref={backdropRef}
      className="fixed inset-0"
      style={{ zIndex: isActive ? 60 : 50 }}
      onClick={handleBackdropClick}
    >
      <div
        ref={windowRef}
        className={`absolute transition-all duration-200 ${isMaximized ? "inset-0 w-full h-full max-w-none m-0" : "w-full max-w-3xl"}`}
        style={isMaximized ? { left: 0, top: 0 } : { left: position.x, top: position.y }}
        onClick={(e) => {
          e.stopPropagation()
          onFocus()
        }}
      >
        <div
          className={`win11-window transition-all duration-200 h-full flex flex-col ${
            isActive ? "shadow-2xl scale-100 opacity-100" : "shadow-lg scale-[0.97] opacity-85"
          }`}
        >
          <div
            className={`win11-window-title flex items-center justify-between px-4 py-3 cursor-move ${
              isActive ? "" : "opacity-80"
            }`}
            onMouseDown={handleMouseDown}
          >
            <h3 className="text-gray-800 font-semibold text-sm">{title}</h3>
            <div className="flex items-center gap-2">
              {onMinimize && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-9 h-9 hover:bg-gray-200/80 text-gray-700 p-0 rounded-lg transition-colors"
                  onClick={onMinimize}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 hover:bg-gray-200/80 text-gray-700 p-0 rounded-lg transition-colors"
                onClick={handleMaximize}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                <Square className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 hover:bg-red-500/80 hover:text-white text-gray-700 p-0 rounded-lg transition-colors"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className={`${isMaximized ? "flex-1 overflow-y-auto" : "max-h-[70vh] overflow-y-auto"} overscroll-contain bg-white/50 animate-[slide-up_0.3s_ease-out] p-6`}>{children}</div>
        </div>
      </div>
    </div>
  )
}

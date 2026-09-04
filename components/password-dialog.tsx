"use client"

import { useState } from "react"
import { X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PasswordDialogProps {
  onClose: () => void
  onSuccess: () => void
}

export function PasswordDialog({ onClose, onSuccess }: PasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const CORRECT_PASSWORD = "Brian123"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (password === CORRECT_PASSWORD) {
      setIsLoading(false)
      onSuccess()
    } else {
      setError("Incorrect password. Try again.")
      setPassword("")
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[99999] p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0055E5] to-[#003C9C] text-white px-6 py-4 flex items-center justify-between rounded-t-lg">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Password Required</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-gray-700 text-sm">
            Please enter the password to access the settings.
          </p>

          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="Enter password"
              autoFocus
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#0055E5] hover:bg-[#003C9C]"
              disabled={isLoading || !password}
            >
              {isLoading ? "Verifying..." : "Unlock"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

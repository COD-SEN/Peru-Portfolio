"use client"

import { useState, useRef } from "react"
import { X, Upload, ImageIcon, User, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadImage, saveSettings, getSettings, type PortfolioSettings } from "@/lib/storage"

interface SettingsPanelProps {
  onClose: () => void
  onUpdate: () => void
}

export function SettingsPanel({ onClose, onUpdate }: SettingsPanelProps) {
  const [settings, setSettings] = useState<PortfolioSettings>(getSettings())
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string | null>(null)

  const loadingBgRef = useRef<HTMLInputElement>(null)
  const userAvatarRef = useRef<HTMLInputElement>(null)
  const desktopBgRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File, key: keyof PortfolioSettings) => {
    try {
      setUploading(key)
      const url = await uploadImage(file, `portfolio/${key}-${Date.now()}-${file.name}`)
      const newSettings = { ...settings, [key]: url }
      setSettings(newSettings)
      await saveSettings(newSettings)
      setUploading(null)
      setUploadStatus(`${key} uploaded successfully`)
    } catch (error) {
      console.error("Upload failed:", error)
      setUploading(null)
      setUploadStatus("Upload failed. Please choose another image.")
    }
  }

  const handleInputChange = async (key: keyof PortfolioSettings, value: string) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    await saveSettings(newSettings)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0055E5] to-[#003C9C] text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Portfolio Customization</h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {uploadStatus && <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">{uploadStatus}</p>}
          {/* Loading Screen Background */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <ImageIcon className="w-5 h-5" />
              Loading Screen Background
            </Label>
            <div className="flex gap-2">
              <Button
                onClick={() => loadingBgRef.current?.click()}
                disabled={uploading === "loadingBackground"}
                variant="outline"
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading === "loadingBackground" ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                ref={loadingBgRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file, "loadingBackground")
                }}
              />
            </div>
            {settings.loadingBackground && (
              <div className="relative w-full h-24 rounded border overflow-hidden">
                <img
                  src={settings.loadingBackground || "/placeholder.svg"}
                  alt="Loading background"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <User className="w-5 h-5" />
              User Avatar
            </Label>
            <div className="flex gap-2">
              <Button
                onClick={() => userAvatarRef.current?.click()}
                disabled={uploading === "userAvatar"}
                variant="outline"
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading === "userAvatar" ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                ref={userAvatarRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file, "userAvatar")
                }}
              />
            </div>
            {settings.userAvatar && (
              <div className="relative w-24 h-24 rounded-full border overflow-hidden mx-auto">
                <img
                  src={settings.userAvatar || "/placeholder.svg"}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                value={settings.userName || ""}
                onChange={(e) => handleInputChange("userName", e.target.value)}
                placeholder="BRIAN"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userTitle">User Title</Label>
              <Input
                id="userTitle"
                value={settings.userTitle || ""}
                onChange={(e) => handleInputChange("userTitle", e.target.value)}
                placeholder="Special Needs Education"
              />
            </div>
          </div>

          {/* Desktop Background */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Monitor className="w-5 h-5" />
              Desktop Background
            </Label>
            <div className="flex gap-2">
              <Button
                onClick={() => desktopBgRef.current?.click()}
                disabled={uploading === "desktopBackground"}
                variant="outline"
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading === "desktopBackground" ? "Uploading..." : "Upload Image"}
              </Button>
              <input
                ref={desktopBgRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file, "desktopBackground")
                }}
              />
            </div>
            {settings.desktopBackground && (
              <div className="relative w-full h-32 rounded border overflow-hidden">
                <img
                  src={settings.desktopBackground || "/placeholder.svg"}
                  alt="Desktop background"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onUpdate()
              onClose()
            }}
            className="bg-[#0055E5] hover:bg-[#003C9C]"
          >
            Save & Apply
          </Button>
        </div>
      </div>
    </div>
  )
}

export interface PortfolioSettings {
  loadingBackground?: string
  userAvatar?: string
  userName?: string
  userTitle?: string
  desktopBackground?: string
  socialProfiles?: SocialProfile[]
}

export interface SocialProfile {
  id: string
  platform: string
  url: string
  username?: string
}

const SETTINGS_KEY = "portfolio-settings"

export async function saveSettings(settings: PortfolioSettings): Promise<void> {
  if (typeof window === "undefined") return

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))

  try {
    await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        display_name: settings.userName || "Portfolio Owner",
        headline: settings.userTitle || "Creative Developer",
        avatar_url: settings.userAvatar || null,
        background_url: settings.desktopBackground || settings.loadingBackground || null,
        is_published: true,
      }),
    })
  } catch {
    // Browser-local settings remain available if the CMS session is offline.
  }
}

export function getSettings(): PortfolioSettings {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioSettings
      if (parsed.userName?.toUpperCase().includes("MARIE") || parsed.userTitle?.toLowerCase().includes("data analyst")) {
        return { ...parsed, userName: "BRIAN", userTitle: "Special Needs Education", userAvatar: undefined }
      }
      return parsed
    }
  }
  return {
    userName: "BRIAN",
    userTitle: "Special Needs Education",
  }
}

export function getSocialProfiles(): SocialProfile[] {
  const settings = getSettings()
  return settings.socialProfiles || []
}

export async function saveSocialProfile(profile: SocialProfile): Promise<void> {
  const settings = getSettings()
  const profiles = settings.socialProfiles || []
  const existingIndex = profiles.findIndex((p) => p.id === profile.id)

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile
  } else {
    profiles.push(profile)
  }

  await saveSettings({ ...settings, socialProfiles: profiles })
}

export async function deleteSocialProfile(id: string): Promise<void> {
  const settings = getSettings()
  const profiles = (settings.socialProfiles || []).filter((p) => p.id !== id)
  await saveSettings({ ...settings, socialProfiles: profiles })
}

export async function uploadImage(file: File, _path: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Upload failed")
  }

  const data = await response.json()
  return data.url
}

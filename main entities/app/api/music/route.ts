import { NextResponse } from "next/server"

// Resolve an Audius track stream URL via their public API
async function getAudiusStreamUrl(trackId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://discoveryprovider.audius.co/v1/tracks/${trackId}/stream?app_name=portfolio`,
      { redirect: "manual" },
    )
    // Audius responds with a 302 redirect to the actual CDN mp3 URL
    const location = res.headers.get("location")
    if (location) return location
    // If no redirect, the URL itself is streamable
    if (res.ok) return `https://discoveryprovider.audius.co/v1/tracks/${trackId}/stream?app_name=portfolio`
    return null
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackId = searchParams.get("track")

  if (!trackId) {
    return NextResponse.json({ error: "Missing track parameter" }, { status: 400 })
  }

  const streamUrl = await getAudiusStreamUrl(trackId)
  if (!streamUrl) {
    return NextResponse.json({ error: "Could not resolve stream" }, { status: 404 })
  }

  return NextResponse.json({ url: streamUrl })
}

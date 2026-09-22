import { NextResponse, NextRequest } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const path = await params
    const pathStr = path.path.join("/")
    
    // Get Supabase URL from environment
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (!supabaseUrl) {
      console.error("[v0] NEXT_PUBLIC_SUPABASE_URL not set")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    
    // Decode the path and reconstruct the full Supabase URL
    const decodedPath = decodeURIComponent(pathStr)
    const url = `${supabaseUrl}/storage/v1/object/public/${decodedPath}`
    
    console.log("[v0] Proxying audio from:", url)
    
    // Fetch from Supabase with proper headers
    const response = await fetch(url, {
      headers: {
        "Range": request.headers.get("Range") || "",
      },
    })
    
    if (!response.ok) {
      console.log("[v0] Supabase returned:", response.status)
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    const buffer = await response.arrayBuffer()
    
    return new NextResponse(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Range",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": response.headers.get("Content-Length") || buffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("[v0] Audio proxy error:", error)
    return NextResponse.json({ error: "Failed to proxy audio" }, { status: 500 })
  }
}

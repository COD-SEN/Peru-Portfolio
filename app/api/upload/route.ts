import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const MAX_FILE_SIZE = 100 * 1024 * 1024
const allowedTypes = new Set([
  "image/jpeg", "image/png", "image/webp", "image/svg+xml",
  "video/mp4", "video/webm", "video/quicktime",
  "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/plain",
])

function safeName(name: string) {
  return name.normalize("NFKC").replace(/[^a-zA-Z0-9._-]/g, "-").slice(-180) || "upload"
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 })

    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return NextResponse.json({ error: "Invalid multipart upload" }, { status: 400 })
    }
    const file = formData.get("file")
    if (!(file instanceof File) || file.size === 0) return NextResponse.json({ error: "No file provided" }, { status: 400 })
    if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "File is too large (maximum 100 MB)" }, { status: 413 })
    if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Unsupported file type" }, { status: 415 })

    const blob = await put(`portfolio/${user.id}/${crypto.randomUUID()}-${safeName(file.name)}`, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url, filename: file.name, size: file.size, type: file.type })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

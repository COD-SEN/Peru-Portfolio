import { NextRequest, NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import path from "node:path"

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  const root = path.resolve(process.cwd(), "public/documents")
  const relative = segments.map((segment) => decodeURIComponent(segment)).join("/")
  const filePath = path.resolve(root, relative)
  if (!filePath.startsWith(`${root}${path.sep}`)) return new NextResponse("Not found", { status: 404 })

  try {
    const file = await readFile(filePath)
    const extension = path.extname(filePath).toLowerCase()
    return new NextResponse(file, {
      headers: {
        "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
        "Content-Disposition": `inline; filename="${path.basename(filePath).replace(/["\\\r\n]/g, "_")}"`,
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}

export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { readFile } from "node:fs/promises"
import path from "node:path"

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params
  let relativePath: string

  try {
    relativePath = segments.map((segment) => decodeURIComponent(segment)).join("/")
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }

  const documentsRoot = path.resolve(process.cwd(), "public/documents")
  const filePath = path.resolve(documentsRoot, relativePath)

  if (!filePath.startsWith(`${documentsRoot}${path.sep}`)) {
    return new NextResponse("Not found", { status: 404 })
  }

  try {
    const file = await readFile(filePath)
    const extension = path.extname(filePath).toLowerCase()
    const filename = path.basename(filePath).replace(/["\\\r\n]/g, "_")
    const disposition = [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"].includes(extension) ? "attachment" : "inline"
    return new NextResponse(file, {
      headers: {
        "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
        "Content-Disposition": `${disposition}; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}

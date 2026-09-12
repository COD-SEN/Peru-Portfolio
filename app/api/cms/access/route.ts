import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const password = typeof body?.password === "string" ? body.password : ""
  const expectedPassword = process.env.PORTFOLIO_CMS_PASSWORD

  if (!expectedPassword) {
    return NextResponse.json({ error: "CMS access is not configured" }, { status: 503 })
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "Incorrect password. Try again." }, { status: 401 })
  }

  return NextResponse.json({ ok: true })
}

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

function unauthorized() {
  return NextResponse.json({ error: "Authentication required" }, { status: 401 })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return unauthorized()

  const { data, error } = await supabase.from("portfolio_settings").select("*").eq("user_id", user.id).maybeSingle()
  if (error) return NextResponse.json({ error: "Unable to load settings" }, { status: 500 })
  return NextResponse.json({ settings: data })
}

export async function PUT(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return unauthorized()

  const body = await request.json()
  const allowed = {
    display_name: String(body.display_name ?? "").slice(0, 120),
    headline: String(body.headline ?? "").slice(0, 160),
    bio: String(body.bio ?? "").slice(0, 5000),
    location: String(body.location ?? "").slice(0, 160),
    email: String(body.email ?? "").slice(0, 254),
    phone: String(body.phone ?? "").slice(0, 80),
    avatar_url: body.avatar_url ? String(body.avatar_url) : null,
    background_url: body.background_url ? String(body.background_url) : null,
    theme: ["light", "dark", "system"].includes(body.theme) ? body.theme : "light",
    accent_color: /^#[0-9a-f]{6}$/i.test(String(body.accent_color ?? "")) ? body.accent_color : "#2563eb",
    is_published: Boolean(body.is_published),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("portfolio_settings").upsert({ user_id: user.id, ...allowed }).select().single()
  if (error) return NextResponse.json({ error: "Unable to save settings" }, { status: 500 })
  return NextResponse.json({ settings: data })
}

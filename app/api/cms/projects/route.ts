import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("portfolio_projects").select("id,title,description,url,image_url,technologies,sort_order,is_published").eq("is_published", true).order("sort_order")
  if (error) return NextResponse.json({ error: "Unable to load projects" }, { status: 500 })
  return NextResponse.json({ projects: data ?? [] })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  const body = await request.json()
  const title = String(body.title ?? "").trim().slice(0, 160)
  if (!title) return NextResponse.json({ error: "A project title is required" }, { status: 400 })
  const { data, error } = await supabase.from("portfolio_projects").insert({
    user_id: user.id,
    title,
    description: String(body.description ?? "").slice(0, 5000),
    url: body.url ? String(body.url).slice(0, 1000) : null,
    image_url: body.image_url ? String(body.image_url).slice(0, 2000) : null,
    technologies: Array.isArray(body.technologies) ? body.technologies.map(String).slice(0, 20) : [],
    sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
    is_published: body.is_published !== false,
  }).select().single()
  if (error) return NextResponse.json({ error: "Unable to create project" }, { status: 500 })
  return NextResponse.json({ project: data }, { status: 201 })
}

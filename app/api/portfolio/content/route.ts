import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const [settings, projects, sections, skills, experience, documents, media] = await Promise.all([
    supabase.from("portfolio_settings").select("display_name,headline,bio,location,email,phone,avatar_url,background_url,loading_background_url,theme,accent_color").eq("is_published", true).maybeSingle(),
    supabase.from("portfolio_projects").select("id,title,description,url,image_url,technologies,sort_order").eq("is_published", true).order("sort_order", { ascending: true }),
    supabase.from("portfolio_sections").select("id,section_key,title,content,sort_order").eq("is_visible", true).order("sort_order", { ascending: true }),
    supabase.from("portfolio_skills").select("id,name,category,level,sort_order").eq("is_visible", true).order("sort_order", { ascending: true }),
    supabase.from("portfolio_experience").select("id,company,role,start_date,end_date,description,sort_order").eq("is_visible", true).order("sort_order", { ascending: true }),
    supabase.from("portfolio_documents").select("id,name,description,file_url,file_type,file_size,category,sort_order").eq("is_public", true).order("sort_order", { ascending: true }),
    supabase.from("portfolio_media").select("id,name,description,file_url,file_type,file_size,alt_text,sort_order").eq("visibility", "public").order("sort_order", { ascending: true }),
  ])
  const results = [settings, projects, sections, skills, experience, documents, media]
  const error = results.find((result) => result.error)?.error
  if (error) {
    console.error("[v0] Portfolio content query failed", error)
    return NextResponse.json({ settings: null, projects: [], sections: [], skills: [], experience: [], documents: [], media: [], degraded: true }, { status: 200, headers: { "Cache-Control": "no-store" } })
  }
  return NextResponse.json({ settings: settings.data, projects: projects.data ?? [], sections: sections.data ?? [], skills: skills.data ?? [], experience: experience.data ?? [], documents: documents.data ?? [], media: media.data ?? [] }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } })
}

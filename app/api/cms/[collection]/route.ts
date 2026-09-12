import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { collectionTables, isCmsCollection, sanitizeCmsPayload, isValidCmsPayload, type CmsCollection } from "@/lib/cms"

async function getContext() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}

function tableFor(collection: string) {
  return isCmsCollection(collection) ? collectionTables[collection] : null
}

export async function GET(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  const table = tableFor(collection)
  if (!table) return NextResponse.json({ error: "Unknown collection" }, { status: 404 })
  const { supabase, user } = await getContext()
  const url = new URL(request.url)
  const manage = url.searchParams.get("manage") === "true"
  let query = supabase.from(table).select("*")
  if (!["documents", "media"].includes(collection)) query = query.order("sort_order", { ascending: true, nullsFirst: false })
  else query = query.order("created_at", { ascending: false })
  if (!manage || !user) {
    const visibility = collection === "projects" ? "is_published" : collection === "documents" ? "is_public" : collection === "media" ? null : "is_visible"
    if (visibility) query = query.eq(visibility, true)
  } else {
    query = query.eq("user_id", user.id)
  }
  const { data, error } = await query
  if (error) return NextResponse.json({ error: "Unable to load content" }, { status: 500 })
  return NextResponse.json({ items: data ?? [] })
}

export async function POST(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  const typedCollection = collection as CmsCollection
  const table = tableFor(collection)
  if (!table) return NextResponse.json({ error: "Unknown collection" }, { status: 404 })
  const { supabase, user } = await getContext()
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
  const payload = sanitizeCmsPayload(typedCollection, body)
  if (!isValidCmsPayload(typedCollection, payload)) return NextResponse.json({ error: "Please complete the required fields" }, { status: 400 })
  const { data, error } = await supabase.from(table).insert({ user_id: user.id, ...payload }).select().single()
  if (error) return NextResponse.json({ error: "Unable to create content" }, { status: 500 })
  return NextResponse.json({ item: data }, { status: 201 })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  const typedCollection = collection as CmsCollection
  const table = tableFor(collection)
  if (!table) return NextResponse.json({ error: "Unknown collection" }, { status: 404 })
  const { supabase, user } = await getContext()
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  const body = await request.json() as Record<string, unknown>
  const id = String(body.id ?? "")
  if (!id) return NextResponse.json({ error: "Record id is required" }, { status: 400 })
  const payload = sanitizeCmsPayload(typedCollection, body)
  const { data, error } = await supabase.from(table).update(payload).eq("id", id).eq("user_id", user.id).select().single()
  if (error) return NextResponse.json({ error: "Unable to update content" }, { status: 500 })
  return NextResponse.json({ item: data })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  const table = tableFor(collection)
  if (!table) return NextResponse.json({ error: "Unknown collection" }, { status: 404 })
  const { supabase, user } = await getContext()
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  const id = new URL(request.url).searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Record id is required" }, { status: 400 })
  const { error } = await supabase.from(table).delete().eq("id", id).eq("user_id", user.id)
  if (error) return NextResponse.json({ error: "Unable to delete content" }, { status: 500 })
  return NextResponse.json({ ok: true })
}

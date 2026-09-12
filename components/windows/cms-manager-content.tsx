"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Plus, RefreshCw, Trash2, Save, Upload, Eye, EyeOff } from "lucide-react"
import { collectionLabels, cmsCollections, type CmsCollection, type CmsRecord } from "@/lib/cms"

type Field = { key: string; label: string; type?: "text" | "textarea" | "number" | "url" | "file"; placeholder?: string }

const fields: Record<CmsCollection, Field[]> = {
  projects: [
    { key: "title", label: "Title" }, { key: "description", label: "Description", type: "textarea" },
    { key: "technologies", label: "Technologies", placeholder: "React, TypeScript" }, { key: "url", label: "Project URL", type: "url" }, { key: "image_url", label: "Cover image URL", type: "url" },
  ],
  sections: [{ key: "section_key", label: "Section key", placeholder: "about" }, { key: "title", label: "Title" }, { key: "content", label: "Content", type: "textarea" }],
  skills: [{ key: "name", label: "Skill name" }, { key: "category", label: "Category" }, { key: "level", label: "Proficiency", type: "number" }],
  experience: [{ key: "company", label: "Company" }, { key: "role", label: "Role" }, { key: "start_date", label: "Start date" }, { key: "end_date", label: "End date" }, { key: "description", label: "Description", type: "textarea" }],
  documents: [{ key: "name", label: "Document name" }, { key: "description", label: "Description", type: "textarea" }, { key: "file_url", label: "File URL", type: "url" }, { key: "file_type", label: "MIME type" }, { key: "category", label: "Category" }, { key: "sort_order", label: "Order", type: "number" }],
  media: [{ key: "name", label: "Media name" }, { key: "description", label: "Description", type: "textarea" }, { key: "file_url", label: "File URL", type: "url" }, { key: "file_type", label: "MIME type" }, { key: "alt_text", label: "Alt text" }, { key: "sort_order", label: "Order", type: "number" }],
}

function visibilityKey(collection: CmsCollection) {
  return collection === "projects" ? "is_published" : collection === "documents" ? "is_public" : collection === "media" ? "visibility" : "is_visible"
}

export function CmsManagerContent() {
  const [collection, setCollection] = useState<CmsCollection>("projects")
  const [items, setItems] = useState<CmsRecord[]>([])
  const [draft, setDraft] = useState<CmsRecord>({})
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    setBusy(true)
    const response = await fetch(`/api/cms/${collection}?manage=true`)
    const payload = await response.json().catch(() => ({}))
    setItems(response.ok ? payload.items ?? [] : [])
    setBusy(false)
  }, [collection])

  useEffect(() => { void load() }, [load])

  const currentFields = useMemo(() => fields[collection], [collection])
  const visibility = visibilityKey(collection)

  function resetDraft() { setDraft({}); setEditingId(null); setMessage(null) }

  function edit(item: CmsRecord) {
    setEditingId(String(item.id))
    setDraft({ ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(", ") : item.technologies })
  }

  async function save() {
    setBusy(true); setMessage(null)
    const payload = { ...draft, ...(draft.technologies !== undefined ? { technologies: String(draft.technologies).split(",").map((value) => value.trim()).filter(Boolean) } : {}) }
    const response = await fetch(`/api/cms/${collection}`, { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload) })
    setBusy(false)
    if (!response.ok) { const result = await response.json().catch(() => ({})); setMessage(result.error || "Unable to save"); return }
    setMessage("Saved"); resetDraft(); await load()
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return
    setBusy(true)
    await fetch(`/api/cms/${collection}?id=${encodeURIComponent(id)}`, { method: "DELETE" })
    await load(); setBusy(false); setMessage("Deleted")
  }

  async function handleUpload(file: File) {
    setBusy(true); setMessage(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch("/api/upload", { method: "POST", body: formData })
      const uploaded = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(uploaded.error || "Upload failed")
      const url = uploaded.url as string
      setDraft((current) => ({ ...current, file_url: url, file_type: file.type || "application/octet-stream", file_size: file.size, name: current.name || file.name }))
      setMessage("Uploaded. Save the record to keep it in the CMS.")
    } catch { setMessage("Upload failed. Choose a smaller supported file.") } finally { setBusy(false) }
  }

  return <div className="flex h-full min-h-0 flex-col gap-4 p-4 text-slate-900">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="text-lg font-bold">Portfolio CMS</h2><p className="text-xs text-slate-500">Manage published content and media from one workspace.</p></div>
      <button onClick={() => void load()} className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50" aria-label="Refresh"><RefreshCw className="h-4 w-4" /></button>
    </div>
    <div className="flex gap-1 overflow-x-auto border-b border-slate-200 pb-2">
      {cmsCollections.map((value) => <button key={value} onClick={() => { setCollection(value); resetDraft() }} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold ${collection === value ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>{collectionLabels[value]}</button>)}
    </div>
    {message && <p role="status" className="rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-800">{message}</p>}
    <div className="grid min-h-0 flex-1 gap-4 overflow-hidden md:grid-cols-[minmax(0,1fr)_260px]">
      <div className="min-h-0 space-y-2 overflow-y-auto pr-1">
        {busy && !items.length ? <p className="text-sm text-slate-500">Loading {collectionLabels[collection].toLowerCase()}…</p> : items.length ? items.map((item) => <div key={String(item.id)} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm"><div className="min-w-0"><p className="truncate text-sm font-semibold">{String(item.title || item.name || item.role || "Untitled")}</p><p className="truncate text-xs text-slate-500">{String(item.description || item.company || item.category || "")}</p></div><div className="flex shrink-0 gap-1"><button onClick={() => edit(item)} className="rounded-md border px-2 py-1 text-xs">Edit</button><button onClick={() => void remove(String(item.id))} className="rounded-md p-1.5 text-red-600 hover:bg-red-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button></div></div>) : <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No {collectionLabels[collection].toLowerCase()} yet.</div>}
      </div>
      <div className="min-h-0 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">{editingId ? "Edit item" : "New item"}</h3>{editingId && <button onClick={resetDraft} className="text-xs text-slate-500">Cancel</button>}</div><div className="space-y-3">{currentFields.map((field) => <label key={field.key} className="block text-xs font-semibold text-slate-700">{field.label}{field.type === "textarea" ? <textarea value={String(draft[field.key] ?? "")} onChange={(event) => setDraft({ ...draft, [field.key]: event.target.value })} placeholder={field.placeholder} rows={3} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 font-normal" /> : <input type={field.type || "text"} value={String(draft[field.key] ?? "")} onChange={(event) => setDraft({ ...draft, [field.key]: field.type === "number" ? Number(event.target.value) : event.target.value })} placeholder={field.placeholder} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-2 py-1.5 font-normal" />}</label>)}{(collection === "documents" || collection === "media") && <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-blue-300 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"><Upload className="h-4 w-4" />Upload file<input type="file" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void handleUpload(file) }} /></label>}{visibility && <label className="flex items-center gap-2 text-xs font-semibold"><input type="checkbox" checked={draft[visibility] !== false} onChange={(event) => setDraft({ ...draft, [visibility]: event.target.checked })} />{draft[visibility] !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />} Visible publicly</label>}<button disabled={busy} onClick={() => void save()} className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" />Save item</button><button onClick={() => { setDraft({}); setEditingId(null) }} className="flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold"><Plus className="h-4 w-4" />Clear form</button></div></div>
    </div>
  </div>
}

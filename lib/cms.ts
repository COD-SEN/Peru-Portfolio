export type CmsCollection = "projects" | "sections" | "skills" | "experience" | "documents" | "media"

export const cmsCollections = ["projects", "sections", "skills", "experience", "documents", "media"] as const

export const collectionLabels: Record<CmsCollection, string> = {
  projects: "Projects",
  sections: "Sections",
  skills: "Skills",
  experience: "Experience",
  documents: "Documents",
  media: "Media",
}

export function isCmsCollection(value: string): value is CmsCollection {
  return cmsCollections.includes(value as CmsCollection)
}

export const collectionTables: Record<CmsCollection, string> = {
  projects: "portfolio_projects",
  sections: "portfolio_sections",
  skills: "portfolio_skills",
  experience: "portfolio_experience",
  documents: "portfolio_documents",
  media: "portfolio_media",
}

export type CmsRecord = Record<string, unknown> & { id?: string }

export function sanitizeCmsPayload(collection: CmsCollection, body: Record<string, unknown>) {
  if (collection === "projects") {
    return {
      title: String(body.title ?? "").trim().slice(0, 160),
      description: String(body.description ?? "").slice(0, 5000),
      url: body.url ? String(body.url).slice(0, 1000) : null,
      image_url: body.image_url ? String(body.image_url).slice(0, 2000) : null,
      technologies: Array.isArray(body.technologies) ? body.technologies.map(String).slice(0, 20) : [],
      sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
      is_published: body.is_published !== false,
    }
  }
  if (collection === "sections") {
    return {
      section_key: String(body.section_key ?? "custom").trim().slice(0, 80),
      title: String(body.title ?? "Untitled section").slice(0, 160),
      content: String(body.content ?? "").slice(0, 10000),
      sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
      is_visible: body.is_visible !== false,
    }
  }
  if (collection === "skills") {
    return {
      name: String(body.name ?? "").trim().slice(0, 120),
      category: String(body.category ?? "Tools").slice(0, 80),
      level: Math.max(0, Math.min(100, Number(body.level) || 0)),
      sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
      is_visible: body.is_visible !== false,
    }
  }
  if (collection === "experience") {
    return {
      company: String(body.company ?? "").trim().slice(0, 160),
      role: String(body.role ?? "").trim().slice(0, 160),
      start_date: String(body.start_date ?? "").slice(0, 40),
      end_date: body.end_date ? String(body.end_date).slice(0, 40) : null,
      description: String(body.description ?? "").slice(0, 5000),
      sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
      is_visible: body.is_visible !== false,
    }
  }
  if (collection === "documents") {
    return {
      name: String(body.name ?? "").trim().slice(0, 200),
      file_url: String(body.file_url ?? "").slice(0, 2000),
      file_type: String(body.file_type ?? "application/octet-stream").slice(0, 160),
      file_size: Math.max(0, Number(body.file_size) || 0),
      category: String(body.category ?? "Documents").slice(0, 80),
      description: String(body.description ?? "").slice(0, 2000),
      sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
      is_public: body.is_public !== false,
    }
  }
  return {
    name: String(body.name ?? "").trim().slice(0, 200),
    file_url: String(body.file_url ?? "").slice(0, 2000),
    file_type: String(body.file_type ?? "application/octet-stream").slice(0, 160),
    file_size: Math.max(0, Number(body.file_size) || 0),
    alt_text: String(body.alt_text ?? "").slice(0, 300),
    description: String(body.description ?? "").slice(0, 2000),
    visibility: ["public", "private"].includes(String(body.visibility)) ? String(body.visibility) : "public",
    sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
  }
}

export function isValidCmsPayload(collection: CmsCollection, payload: Record<string, unknown>) {
  if (collection === "projects" || collection === "skills") return Boolean(payload.title || payload.name)
  if (collection === "experience") return Boolean(payload.company && payload.role)
  if (collection === "documents" || collection === "media") return Boolean(payload.name && payload.file_url)
  return Boolean(payload.title)
}

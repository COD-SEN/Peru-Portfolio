"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Download, ExternalLink, FileImage, FileText, FileSpreadsheet, Presentation, X } from "lucide-react"

type DocumentType = "pdf" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "txt" | "csv" | "image" | "file"
type DocumentRecord = { name: string; file: string; type: DocumentType; category: string; description?: string }

const documents: DocumentRecord[] = [
  { name: "Brian KCPE Certificate", file: "/documents/PERU%20DOCS/Brian%20KCPE%20cert.pdf", type: "pdf", category: "Education" },
  { name: "Brian Peru CV", file: "/documents/PERU%20DOCS/Brian_Peru_CV_docc.docx", type: "docx", category: "Career" },
  { name: "Njathaini Recommendation Letter", file: "/documents/PERU%20DOCS/Njathaini%202recomm.letter.docx", type: "docx", category: "References" },
  { name: "Police Clearance Certificate", file: "/documents/PERU%20DOCS/PCC-V6SBWLNWJ-POLICE%20CLEARANCE%20CERTIFICATE%20WK%20(1).pdf", type: "pdf", category: "Verification" },
  { name: "Peru Resume", file: "/documents/PERU%20DOCS/Peru%20resume.21.docx", type: "docx", category: "Career" },
  { name: "Peru KCSE Certificate", file: "/documents/PERU%20DOCS/Peru%2CKCSE%20Cert.pdf", type: "pdf", category: "Education" },
  { name: "Brian portrait", file: "/brian-portrait.jpeg", type: "image", category: "Profile" },
  { name: "Brian classroom profile", file: "/brian-classroom.jpeg", type: "image", category: "Profile" },
  { name: "Brian services flyer", file: "/brian-flyer.jpeg", type: "image", category: "Profile" },
]

const officeTypes = new Set<DocumentType>(["doc", "docx", "xls", "xlsx", "ppt", "pptx"])
const formatLabels: Record<DocumentType, string> = { pdf: "PDF", doc: "DOC", docx: "DOCX", xls: "XLS", xlsx: "XLSX", ppt: "PPT", pptx: "PPTX", txt: "TXT", csv: "CSV", image: "Image", file: "File" }

function documentUrl(document: DocumentRecord) {
  return document.type === "image" ? document.file : `/api${document.file}`
}

function filenameFor(document: DocumentRecord) {
  return decodeURIComponent(document.file.split("/").pop() || document.name)
}

function iconFor(type: DocumentType) {
  if (type === "image") return FileImage
  if (type === "xls" || type === "xlsx") return FileSpreadsheet
  if (type === "ppt" || type === "pptx") return Presentation
  return FileText
}

function formatSize(document: DocumentRecord) {
  if (document.type === "image") return "Image file"
  return "Original file"
}

export function DocumentsContent() {
  const [selected, setSelected] = useState<DocumentRecord | null>(null)
  const [filter, setFilter] = useState("All")
  const categories = useMemo(() => ["All", ...new Set(documents.map((document) => document.category))], [])
  const visibleDocuments = documents.filter((document) => filter === "All" || document.category === filter)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Brian Peru / archive</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Documents</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">A private filing cabinet for education records, career documents, references, and scanned archive pages.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{documents.length} files</span>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2" role="tablist" aria-label="Document categories">
        {categories.map((category) => (
          <button key={category} type="button" role="tab" aria-selected={filter === category} onClick={() => setFilter(category)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${filter === category ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
            {category}
          </button>
        ))}
      </div>

      {visibleDocuments.length ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visibleDocuments.map((document) => {
          const Icon = iconFor(document.type)
          return <article key={document.file} className="flex min-h-32 gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
            <button type="button" onClick={() => setSelected(document)} className="group flex min-w-0 flex-1 gap-3 text-left" aria-label={`Open ${document.name}`}>
              <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                {document.type === "image" ? <Image src={document.file} alt={document.name} fill sizes="80px" className="object-cover transition-transform group-hover:scale-105" /> : <Icon className="size-8 text-slate-500" aria-hidden="true" />}
                <span className="absolute bottom-1 left-1 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{formatLabels[document.type]}</span>
              </div>
              <span className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <span><span className="block truncate text-sm font-bold text-slate-800">{document.name}</span><span className="mt-1 block text-xs text-slate-500">{document.category} · {formatSize(document)}</span></span>
                <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900">Open preview →</span>
              </span>
            </button>
            <a href={documentUrl(document)} download={filenameFor(document)} className="flex h-9 shrink-0 items-center gap-1 self-end rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label={`Download ${document.name}`}><Download className="size-3.5" aria-hidden="true" /><span className="hidden md:inline">Download</span></a>
          </article>
        })}
      </div> : <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><FileText className="mx-auto size-10 text-slate-400" aria-hidden="true" /><h3 className="mt-3 font-bold text-slate-900">No documents available</h3><p className="mt-1 text-sm text-slate-500">There are no documents in this category.</p></div>}

      {selected ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={selected.name}>
        <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6"><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">{selected.name}</p><p className="mt-1 text-xs text-slate-500">{formatLabels[selected.type]} · {selected.category} · Original file</p></div><button type="button" onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400" aria-label="Close document viewer"><X className="size-5" /></button></div>
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-slate-100 p-3 sm:p-6">
            {selected.type === "image" ? <Image src={selected.file} alt={selected.name} width={1400} height={1000} className="max-h-[65vh] w-auto object-contain shadow-lg" /> : selected.type === "pdf" || selected.type === "txt" || selected.type === "csv" ? <iframe src={documentUrl(selected)} title={selected.name} className="h-[65vh] w-full rounded-lg bg-white" /> : <div className="flex max-w-lg flex-col items-center gap-4 rounded-xl bg-white p-6 text-center shadow-sm sm:p-10"><FileText className="size-12 text-slate-400" aria-hidden="true" /><div><h3 className="font-bold text-slate-900">Word document ready</h3><p className="mt-2 text-sm leading-6 text-slate-500">This original file is preserved in the archive. Download it to view it in Microsoft Word or another compatible editor.</p></div></div>}
          </div>
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"><p className="text-xs text-slate-500">The original {formatLabels[selected.type]} file is preserved.</p><div className="flex flex-wrap gap-2"><a href={documentUrl(selected)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"><ExternalLink className="size-4" aria-hidden="true" /> Open new tab</a><a href={documentUrl(selected)} download={filenameFor(selected)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"><Download className="size-4" aria-hidden="true" /> Download Document</a></div></div>
        </div>
      </div> : null}
    </div>
  )
}

export default DocumentsContent

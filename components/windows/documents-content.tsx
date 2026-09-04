"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Download, FileImage, FileText, Maximize2, X } from "lucide-react"

const documents = [
  { name: "Brian KCPE Certificate", file: "/documents/PERU%20DOCS/Brian%20KCPE%20cert.pdf", type: "pdf", category: "Education" },
  { name: "Brian Peru CV", file: "/documents/PERU%20DOCS/Brian_Peru_CV_docc.docx", type: "docx", category: "Career" },
  { name: "Njathaini Recommendation Letter", file: "/documents/PERU%20DOCS/Njathaini%202recomm.letter.docx", type: "docx", category: "References" },
  { name: "Police Clearance Certificate", file: "/documents/PERU%20DOCS/PCC-V6SBWLNWJ-POLICE%20CLEARANCE%20CERTIFICATE%20WK%20(1).pdf", type: "pdf", category: "Verification" },
  { name: "Peru Resume", file: "/documents/PERU%20DOCS/Peru%20resume.21.docx", type: "docx", category: "Career" },
  { name: "Peru KCSE Certificate", file: "/documents/PERU%20DOCS/Peru%2CKCSE%20Cert.pdf", type: "pdf", category: "Education" },
  { name: "Brian portrait", file: "/brian-portrait.jpeg", type: "image", category: "Profile" },
  { name: "Brian classroom profile", file: "/brian-classroom.jpeg", type: "image", category: "Profile" },
  { name: "Brian services flyer", file: "/brian-flyer.jpeg", type: "image", category: "Profile" },
] as const

export function DocumentsContent() {
  const [selected, setSelected] = useState<(typeof documents)[number] | null>(null)
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visibleDocuments.map((document, index) => (
          <button key={document.file} type="button" onClick={() => setSelected(document)} className="group flex min-h-28 gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md">
            <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
              {document.type === "image" ? <Image src={document.file} alt={document.name} fill sizes="80px" className="object-cover transition-transform group-hover:scale-105" /> : <FileText className="size-8 text-slate-500" aria-hidden="true" />}
              <span className="absolute bottom-1 left-1 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{document.type}</span>
            </div>
            <span className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <span><span className="block text-sm font-bold text-slate-800">{document.name}</span><span className="mt-1 block text-xs text-slate-500">{document.category}</span></span>
              <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900">Open document →</span>
            </span>
            {document.type === "image" ? <FileImage className="size-4 shrink-0 text-slate-400" aria-hidden="true" /> : null}
            <span className="sr-only">Document {index + 1}</span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={selected.name}>
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
              <div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">{selected.name}</p><p className="text-xs text-slate-500">{selected.category} · {selected.type.toUpperCase()}</p></div>
              <div className="flex items-center gap-1"><a href={selected.type === "image" ? selected.file : `/api${selected.file}`} download="" target="_self" rel="noopener noreferrer" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label={`Download ${selected.name}`}><Download className="size-4" /></a><button type="button" onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close document viewer"><X className="size-5" /></button></div>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-slate-100 p-3 sm:p-6">
              {selected.type === "image" ? <Image src={selected.file} alt={selected.name} width={1400} height={1000} className="max-h-[72vh] w-auto object-contain shadow-lg" /> : selected.type === "pdf" ? <iframe src={`/api${selected.file}`} title={selected.name} className="h-[72vh] w-full rounded-lg bg-white" /> : <div className="flex max-w-md flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-sm"><FileText className="size-12 text-slate-400" /><div><h3 className="font-bold text-slate-900">Word document ready</h3><p className="mt-1 text-sm leading-6 text-slate-500">This format is preserved in the archive. Download it to view the original document in Microsoft Word or another compatible editor.</p></div><a href={`/api${selected.file}`} download="" target="_self" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"><Download className="size-4" /> Download original</a></div>}
            </div>
            <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-2 text-xs text-slate-500"><Maximize2 className="size-3.5" /> Clicked files open in this viewer; originals remain downloadable.</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default DocumentsContent

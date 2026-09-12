"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Document as PdfDocument, Page, pdfjs } from "react-pdf"
import { Download, FileImage, FileSpreadsheet, FileText, Maximize2, Minus, Presentation, Printer, RotateCw, Search, X, ZoomIn } from "lucide-react"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"

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

const formatLabels: Record<DocumentType, string> = { pdf: "PDF", doc: "DOC", docx: "DOCX", xls: "XLS", xlsx: "XLSX", ppt: "PPT", pptx: "PPTX", txt: "TXT", csv: "CSV", image: "Image", file: "File" }
const officeTypes = new Set<DocumentType>(["doc", "docx", "xls", "xlsx", "ppt", "pptx"])
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

function documentUrl(document: DocumentRecord) {
  // Build one canonical same-origin URL for every archive item. Decoding first
  // prevents already-escaped names from being escaped twice, while encodeURI
  // preserves the folder separators and produces a valid deployed asset URL.
  const decodedPath = decodeURIComponent(document.file)
  return encodeURI(decodedPath)
}
function filenameFor(document: DocumentRecord) { return decodeURIComponent(document.file.split("/").pop() || document.name) }
function iconFor(type: DocumentType) { if (type === "image") return FileImage; if (["xls", "xlsx"].includes(type)) return FileSpreadsheet; if (["ppt", "pptx"].includes(type)) return Presentation; return FileText }

function PdfViewer({ url, name }: { url: string; name: string }) {
  const [pages, setPages] = useState(0), [page, setPage] = useState(1), [scale, setScale] = useState(1), [rotation, setRotation] = useState(0), [error, setError] = useState(false)
  return <div className="flex h-full min-h-0 flex-col">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2 text-xs">
      <span className="font-semibold text-slate-600">{page} / {pages || "…"}</span>
      <div className="flex items-center gap-1">
        <button type="button" title="Previous page" disabled={page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="viewer-tool">‹</button><button type="button" title="Next page" disabled={!pages || page >= pages} onClick={() => setPage((value) => Math.min(pages, value + 1))} className="viewer-tool">›</button>
        <button type="button" title="Zoom out" onClick={() => setScale((value) => Math.max(.6, value - .1))} className="viewer-tool"><Minus className="size-3.5" /></button><button type="button" title="Zoom in" onClick={() => setScale((value) => Math.min(2, value + .1))} className="viewer-tool"><ZoomIn className="size-3.5" /></button><button type="button" title="Rotate" onClick={() => setRotation((value) => (value + 90) % 360)} className="viewer-tool"><RotateCw className="size-3.5" /></button><button type="button" title="Print" onClick={() => { const popup = window.open(url, "_blank"); popup?.addEventListener("load", () => popup.print()) }} className="viewer-tool"><Printer className="size-3.5" /></button>
      </div>
    </div>
    <div className="min-h-0 flex-1 overflow-auto bg-slate-200 p-4">
      {error ? <PreviewError onRetry={() => { setError(false); setPage(1) }} /> : <PdfDocument file={url} onLoadSuccess={({ numPages }) => setPages(numPages)} onLoadError={() => setError(true)} loading={<LoadingState label="Loading PDF…" />}><Page pageNumber={page} scale={scale} rotate={rotation} renderTextLayer renderAnnotationLayer className="mx-auto w-fit shadow-xl" /></PdfDocument>}
    </div>
  </div>
}

function DocxViewer({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null), [error, setError] = useState(false)
  useEffect(() => { let active = true; fetch(url).then((response) => { if (!response.ok) throw new Error("Document unavailable"); return response.arrayBuffer() }).then(async (buffer) => { const { renderAsync } = await import("docx-preview"); if (active && ref.current) { ref.current.innerHTML = ""; await renderAsync(buffer, ref.current, undefined, { className: "docx-preview" }) } }).catch(() => active && setError(true)); return () => { active = false } }, [url])
  return error ? <PreviewError onRetry={() => setError(false)} /> : <div ref={ref} className="h-full w-full overflow-auto bg-slate-200 p-4" />
}

function SheetViewer({ url, type }: { url: string; type: DocumentType }) { const [html, setHtml] = useState(""); const [error, setError] = useState(false); useEffect(() => { fetch(url).then((response) => response.arrayBuffer()).then(async (buffer) => { const XLSX = await import("xlsx"); const book = XLSX.read(buffer, { type: "array" }); setHtml(XLSX.utils.sheet_to_html(book.Sheets[book.SheetNames[0]])) }).catch(() => setError(true)) }, [url]); return error ? <PreviewError onRetry={() => setError(false)} /> : <div className="h-full overflow-auto bg-white p-4"><div className="spreadsheet-preview" dangerouslySetInnerHTML={{ __html: html }} /><p className="mt-3 text-xs text-slate-500">{type.toUpperCase()} preview · first sheet</p></div> }
function TextViewer({ url }: { url: string }) { const [text, setText] = useState(""); useEffect(() => { fetch(url).then((response) => response.text()).then(setText) }, [url]); return <pre className="h-full overflow-auto whitespace-pre-wrap break-words bg-slate-950 p-5 font-mono text-sm leading-6 text-slate-100">{text || "Loading text…"}</pre> }
function LoadingState({ label = "Loading document…" }: { label?: string }) { return <div className="flex h-full min-h-64 items-center justify-center text-sm text-slate-500">{label}</div> }
function PreviewError({ onRetry }: { onRetry: () => void }) { return <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 text-center"><p className="font-semibold text-slate-800">Unable to preview this document.</p><button type="button" onClick={onRetry} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Retry</button></div> }

function DocumentViewer({ document, onClose }: { document: DocumentRecord; onClose: () => void }) {
  const url = documentUrl(document), [fullscreen, setFullscreen] = useState(false)
  const preview = document.type === "pdf" ? <PdfViewer url={url} name={document.name} /> : document.type === "docx" ? <DocxViewer url={url} /> : ["xls", "xlsx"].includes(document.type) ? <SheetViewer url={url} type={document.type} /> : document.type === "txt" || document.type === "csv" ? <TextViewer url={url} /> : document.type === "image" ? <div className="flex h-full items-center justify-center overflow-auto bg-slate-200 p-5"><Image src={document.file} alt={document.name} width={1600} height={1200} className="max-h-full w-auto object-contain shadow-xl" /></div> : <div className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-500">This {formatLabels[document.type]} file cannot be rendered safely in the browser. Download the original to open it.</div>
  return <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-0 sm:p-5 ${fullscreen ? "p-0" : ""}`} role="dialog" aria-modal="true" aria-label={document.name}><div className={`flex h-full max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl ${fullscreen ? "max-h-full max-w-full" : "sm:rounded-2xl"}`}><header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3"><div className="min-w-0"><h2 className="truncate text-sm font-bold text-slate-900">{document.name}</h2><p className="mt-1 text-xs text-slate-500">{document.category} · {formatLabels[document.type]}</p></div><div className="flex items-center gap-1"><a href={url} download={filenameFor(document)} className="viewer-action"><Download className="size-4" /> <span className="hidden sm:inline">Download</span></a><button type="button" title="Fullscreen" onClick={() => setFullscreen((value) => !value)} className="viewer-action"><Maximize2 className="size-4" /></button><button type="button" onClick={onClose} className="viewer-action" aria-label="Close document viewer"><X className="size-5" /></button></div></header><main className="min-h-0 flex-1">{preview}</main><footer className="flex shrink-0 items-center justify-between border-t border-slate-200 px-4 py-2 text-xs text-slate-500"><span>Original {formatLabels[document.type]} preserved</span>{officeTypes.has(document.type) && <a href={url} download={filenameFor(document)} className="font-semibold text-slate-700 underline">Download original</a>}</footer></div></div>
}

export function DocumentsContent() { const [selected, setSelected] = useState<DocumentRecord | null>(null); const [filter, setFilter] = useState("All"); const categories = useMemo(() => ["All", ...new Set(documents.map((document) => document.category))], []); const visibleDocuments = documents.filter((document) => filter === "All" || document.category === filter); return <div className="flex flex-col gap-5"> <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Brian Peru / archive</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Documents</h2><p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">A private filing cabinet for education records, career documents, references, and scanned archive pages.</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{documents.length} files</span></div><div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2" role="tablist" aria-label="Document categories">{categories.map((category) => <button key={category} type="button" role="tab" aria-selected={filter === category} onClick={() => setFilter(category)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${filter === category ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>{category}</button>)}</div>{visibleDocuments.length ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{visibleDocuments.map((document) => { const Icon = iconFor(document.type); return <article key={document.file} className="flex min-h-32 gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><button type="button" onClick={() => setSelected(document)} className="group flex min-w-0 flex-1 gap-3 text-left" aria-label={`Open ${document.name}`}><div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">{document.type === "image" ? <Image src={document.file} alt={document.name} fill sizes="80px" className="object-cover" /> : <Icon className="size-8 text-slate-500" aria-hidden="true" />}<span className="absolute bottom-1 left-1 rounded bg-slate-900/75 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{formatLabels[document.type]}</span></div><span className="flex min-w-0 flex-1 flex-col justify-between py-0.5"><span><span className="block truncate text-sm font-bold text-slate-800">{document.name}</span><span className="mt-1 block text-xs text-slate-500">{document.category} · Original file</span></span><span className="text-xs font-semibold text-slate-500">Open preview →</span></span></button><a href={documentUrl(document)} download={filenameFor(document)} className="flex h-9 shrink-0 items-center gap-1 self-end rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-700" aria-label={`Download ${document.name}`}><Download className="size-3.5" /><span className="hidden md:inline">Download</span></a></article> })}</div> : <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><FileText className="mx-auto size-10 text-slate-400" /><h3 className="mt-3 font-bold text-slate-900">No documents available</h3></div>}{selected && <DocumentViewer document={selected} onClose={() => setSelected(null)} />}</div> }

export default DocumentsContent

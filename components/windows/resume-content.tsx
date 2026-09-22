"use client"

import { Download, GraduationCap, Briefcase, HeartHandshake, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeContent() {
  const resumeUrl = "/Brian-Peru-CV-Updated.pdf"
  const resumeName = "Brian-Peru-CV-Updated.pdf"

  const handleDownload = async () => {
    try {
      const response = await fetch(resumeUrl)
      if (!response.ok) throw new Error("CV unavailable")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = resumeName
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
      window.open(resumeUrl, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">Curriculum Vitae</h2>
        <Button onClick={handleDownload} size="sm" className="w-full sm:w-auto"><Download className="mr-1 h-4 w-4" />Download CV</Button>
      </div>
      <section className="space-y-2"><h3 className="flex items-center gap-2 text-lg font-bold text-gray-900"><Users className="h-5 w-5 text-blue-600" />Personal Details</h3><div className="grid grid-cols-1 gap-3 text-sm text-gray-700 sm:grid-cols-2"><p><b>Full Name:</b> Brian Peru</p><p><b>Nationality:</b> Kenyan</p><p><b>Phone:</b> +254 790 579 802</p><p><b>Email:</b> perubrian2019@gmail.com</p><p><b>Location:</b> Nairobi, Kenya</p><p><b>Title:</b> Special Needs Education Professional</p></div></section>
      <section className="space-y-2"><h3 className="flex items-center gap-2 text-lg font-bold text-gray-900"><Briefcase className="h-5 w-5 text-violet-600" />Professional Profile</h3><p className="text-sm leading-relaxed text-gray-700">Special Needs Education professional with a Bachelor of Education (Science) and practical experience in inclusive education, disability support, accessibility, Kenyan Sign Language (KSL) interpretation, Mathematics and Physics instruction, and individualized learner support.</p></section>
      <section className="space-y-2"><h3 className="flex items-center gap-2 text-lg font-bold text-gray-900"><GraduationCap className="h-5 w-5 text-emerald-600" />Education</h3><div className="space-y-2"><div className="rounded-lg border border-blue-200 bg-blue-50 p-3"><p className="font-semibold text-gray-900">Bachelor of Education Science (Special Needs Education)</p><p className="text-sm text-gray-600">Kenyatta University | 2020 – 2025</p></div><div className="rounded-lg border border-blue-200 bg-blue-50 p-3"><p className="font-semibold text-gray-900">KCSE</p><p className="text-sm text-gray-600">Kakamega High School | 2016 – 2019</p></div></div></section>
      <section className="space-y-2"><h3 className="flex items-center gap-2 text-lg font-bold text-gray-900"><HeartHandshake className="h-5 w-5 text-teal-600" />Professional Experience</h3><div className="space-y-2"><div className="rounded-lg border border-amber-200 bg-amber-50 p-3"><p className="font-semibold text-gray-900">Special Needs Education Teacher</p><p className="text-sm text-gray-600">Dalyn Integrated School | May 2026 – Jul 2026</p></div><div className="rounded-lg border border-amber-200 bg-amber-50 p-3"><p className="font-semibold text-gray-900">Learner Support Teacher / Sign Language Teacher</p><p className="text-sm text-gray-600">Njathaini Comprehensive School | Apr 2025 – Apr 2026</p></div><div className="rounded-lg border border-amber-200 bg-amber-50 p-3"><p className="font-semibold text-gray-900">Sign Language Interpreter</p><p className="text-sm text-gray-600">KU TV & Radio | Dec 2024 – Feb 2026</p></div></div></section>
      <section className="space-y-2"><h3 className="text-lg font-bold text-gray-900">Core Competencies</h3><p className="text-sm leading-relaxed text-gray-700">Disability inclusion and accessibility, KSL interpretation, learner support and reasonable accommodation, IEPs, differentiated instruction, curriculum adaptation, autism, hearing and visual impairment support, positive behaviour support, safeguarding, Mathematics and Physics instruction, and multidisciplinary collaboration.</p></section>
    </div>
  )
}

export default ResumeContent

"use client"

import { Download, GraduationCap, Briefcase, HeartHandshake, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResumeContent() {
  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()
    doc.setFontSize(18); doc.text("BRIAN PERU", 105, 18, { align: "center" })
    doc.setFontSize(11); doc.text("Learner Support Teacher | Special Needs & Inclusive Education", 105, 26, { align: "center" })
    doc.setFontSize(10)
    const lines = ["Nairobi, Kenya | +254 790 579 802 | brianperu2019@gmail.com", "", "PROFILE", "TSC-registered Learner Support Teacher with a Bachelor of Education (Science), experienced in inclusive education, individualized learner support, differentiated instruction, and learner wellbeing.", "", "EDUCATION", "Bachelor of Education (Science)", "", "EXPERIENCE", "Learner Support Teaching", "Supporting learners with diverse educational and developmental needs through individualized plans, curriculum adaptation, assessment, positive behaviour support, and collaboration with families and multidisciplinary teams.", "", "CORE COMPETENCIES", "Special Needs Education | Inclusive Education | IEPs | Autism and ADHD Support | Differentiated Instruction | Curriculum Adaptation | Learner Assessment | Safeguarding | Mathematics and Physics", "", "LINKEDIN", "linkedin.com/in/brian-peru-227a863b6"]
    let y = 38
    lines.forEach((line) => { if (y > 280) { doc.addPage(); y = 18 }; doc.text(line, 15, y); y += line === "" ? 4 : 6 })
    doc.save("Brian-Peru-CV.pdf")
  }

  return <div className="space-y-6"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-900">Curriculum Vitae</h2><Button onClick={handleDownload} size="sm"><Download className="w-4 h-4 mr-1" />Download CV</Button></div><section className="space-y-2"><h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" />Personal Details</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700"><p><b>Full Name:</b> Brian Peru</p><p><b>Nationality:</b> Kenyan</p><p><b>Phone:</b> +254 790 579 802</p><p><b>Email:</b> brianperu2019@gmail.com</p><p><b>Location:</b> Nairobi, Kenya</p><p><b>Title:</b> Learner Support Teacher</p></div></section><section className="space-y-2"><h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Briefcase className="w-5 h-5 text-violet-600" />Profile Summary</h3><p className="text-sm text-gray-700 leading-relaxed">TSC-registered Learner Support Teacher with a Bachelor of Education (Science), committed to inclusive learning and compassionate, individualized support for learners with diverse needs.</p></section><section className="space-y-2"><h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-emerald-600" />Education</h3><div className="p-3 bg-blue-50 rounded-lg border border-blue-200"><p className="font-semibold text-gray-900">Bachelor of Education (Science)</p><p className="text-sm text-gray-600">Kenya</p></div></section><section className="space-y-2"><h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><HeartHandshake className="w-5 h-5 text-teal-600" />Professional Competencies</h3><p className="text-sm text-gray-700 leading-relaxed">IEP development and review, differentiated instruction, autism and ADHD support, curriculum adaptation, learner assessment, positive behaviour support, child safeguarding, assistive learning technologies, and parent/multidisciplinary collaboration.</p></section></div>
}

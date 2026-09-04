"use client"

import { Target, GraduationCap, HeartHandshake, BookOpen, Users } from "lucide-react"

const ambitions = [
  { icon: GraduationCap, title: "Advance Inclusive Education Practice", timeline: "Ongoing", gradient: "from-sky-400 to-blue-600", description: "Continue developing practical expertise in Special Needs Education, inclusive classroom practice, and learner-centred support." },
  { icon: HeartHandshake, title: "Strengthen Learner Support Systems", timeline: "Ongoing", gradient: "from-emerald-400 to-green-600", description: "Support effective IEPs, positive behaviour, safeguarding, and coordinated interventions for learners with diverse needs." },
  { icon: BookOpen, title: "Teach Mathematics and Physics Inclusively", timeline: "Ongoing", gradient: "from-amber-400 to-orange-600", description: "Make Mathematics and Physics accessible through differentiated instruction, adapted resources, and assistive learning technologies." },
  { icon: Users, title: "Collaborate for Learner Wellbeing", timeline: "Ongoing", gradient: "from-pink-400 to-rose-600", description: "Build strong partnerships with teachers, parents, therapists, and multidisciplinary teams around each learner." },
  { icon: Target, title: "Grow as a Compassionate Education Professional", timeline: "Long term", gradient: "from-indigo-400 to-blue-700", description: "Keep learning, reflecting, and advocating for safe, equitable, and inclusive educational environments." },
]

export function AmbitionsContent() {
  return <div className="space-y-6"><div><h2 className="text-2xl font-bold text-gray-900">Professional Goals</h2><p className="text-sm text-gray-500 mt-1">A practical roadmap for learner support and inclusive education.</p></div><div className="space-y-4">{ambitions.map((item) => { const Icon = item.icon; return <div key={item.title} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"><div className="flex items-start gap-3"><div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}><Icon className="w-5 h-5 text-white" strokeWidth={1.8} /></div><div className="flex-1"><div className="flex items-start justify-between gap-2 flex-wrap"><h3 className="font-bold text-gray-900 text-sm">{item.title}</h3><span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">{item.timeline}</span></div><p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{item.description}</p></div></div></div> })}</div></div>
}

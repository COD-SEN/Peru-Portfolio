"use client"

import Image from "next/image"
import { BookOpen, HeartHandshake, Languages, Music2 } from "lucide-react"

const interests = [
  { icon: HeartHandshake, title: "Inclusive learner support", detail: "Creating patient, practical, learner-centred support for diverse abilities." },
  { icon: BookOpen, title: "Mathematics and Physics", detail: "Making technical subjects approachable through examples, practice, and encouragement." },
  { icon: Languages, title: "Kenyan Sign Language", detail: "Supporting accessible communication and stronger classroom participation." },
  { icon: Music2, title: "Community and wellbeing", detail: "Building confidence, independence, and belonging beyond the classroom." },
]

export function InterestsContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg">
          <Image src="/brian-classroom.jpeg" alt="Brian Peru supporting learners in an inclusive classroom" width={1536} height={1024} className="h-full min-h-64 w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Interests and practice</p>
          <h2 className="text-2xl font-bold text-slate-900">Learning should feel possible.</h2>
          <p className="text-sm leading-6 text-slate-600">Brian&apos;s interests sit at the intersection of teaching, communication, inclusion, and learner wellbeing.</p>
          <Image src="/brian-flyer.jpeg" alt="Brian Peru educational services flyer" width={1080} height={1080} className="mt-2 h-36 w-full rounded-xl object-cover object-top shadow-sm" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {interests.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Icon className="size-5 text-blue-700" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InterestsContent

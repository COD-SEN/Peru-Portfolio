"use client"

import { MapPin, Mail, Phone, GraduationCap, HeartHandshake, BookOpen, Languages } from "lucide-react"

const skills = ["Special Needs Education", "Inclusive Education", "IEPs", "Differentiated Instruction", "Autism Support", "ADHD Support", "Curriculum Adaptation", "Learner Assessment", "Positive Behaviour Support", "Mathematics", "Physics", "Safeguarding"]

export function ProfileContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-blue-200 shadow-md">
          <img src="/brian-flyer.jpeg" alt="Brian Peru educational services flyer" className="h-full w-full object-cover object-top" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brian Peru</h2>
          <p className="text-sm text-gray-500 font-medium">Learner Support Teacher | Special Needs Education</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">I am a TSC-registered Learner Support Teacher with a Bachelor of Education (Science), committed to helping learners with diverse educational and developmental needs thrive in inclusive environments. My practice brings together individualized education programmes, differentiated instruction, curriculum adaptation, learner assessment, positive behaviour support, and collaborative work with families and multidisciplinary teams.</p>

      <div>
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-indigo-600" />Areas of Practice</h3>
        <div className="flex flex-wrap gap-2">{skills.slice(0, 9).map((skill) => <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200">{skill}</span>)}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200"><MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" /><div><p className="text-xs text-gray-500">Location</p><p className="text-sm font-medium text-gray-800">Nairobi, Kenya</p></div></div>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200"><Mail className="w-5 h-5 text-purple-600 flex-shrink-0" /><div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-800">brianperu2019@gmail.com</p></div></div>
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200"><Phone className="w-5 h-5 text-green-600 flex-shrink-0" /><div><p className="text-xs text-gray-500">Phone</p><p className="text-sm font-medium text-gray-800">+254 790 579 802</p></div></div>
        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200"><GraduationCap className="w-5 h-5 text-amber-600 flex-shrink-0" /><div><p className="text-xs text-gray-500">Education</p><p className="text-sm font-medium text-gray-800">Bachelor of Education (Science)</p></div></div>
      </div>

      <div><h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600" />Core Competencies</h3><div className="flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium border border-gray-200">{skill}</span>)}</div></div>
      <div><h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Languages className="w-4 h-4 text-teal-600" />Professional Focus</h3><ul className="text-sm text-gray-700 space-y-1 list-disc list-inside"><li>Individual learner support, IEP development, and progress monitoring</li><li>One-to-one and small-group interventions for diverse learning needs</li><li>Parent, teacher, therapist, and multidisciplinary collaboration</li><li>Assistive and adaptive learning technologies</li><li>Mathematics and Physics education in inclusive settings</li></ul></div>
    </div>
  )
}

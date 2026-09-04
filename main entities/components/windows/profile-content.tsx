"use client"

import { MapPin, Mail, Phone, GraduationCap, Code, Trophy, Globe } from "lucide-react"

export function ProfileContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img
          src="/tech-avatar-icon.png"
          alt="Marie Nyawaga"
          className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-200 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marie Esther Atieno Nyawaga</h2>
          <p className="text-sm text-gray-500 font-medium">Data Analyst | BSc Data Science &amp; Analytics</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">
        I am a Data Analyst with hands-on experience transforming raw datasets into actionable insights. Currently completing my BSc in Data Science & Analytics at USIU-Africa (Cum Laude candidate). I specialize in financial data analysis, audit support, Python programming, Excel dashboards, and Power BI visualization. Passionate about solving real-world problems with data-driven approaches and mentoring others in the analytics field.
      </p>

      <div>
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-600" />Interests &amp; Passions</h3>
        <div className="flex flex-wrap gap-2">
          {["Financial Analytics", "Audit Data Analysis", "Machine Learning", "Python Programming", "Data Visualization", "Power BI", "ETL Pipeline Design"].map((interest) => (
            <span key={interest} className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200">{interest}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-medium text-gray-800">Nairobi, Kenya</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
          <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-800">nyawagamarieesther@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
          <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-medium text-gray-800">+254 797 291 632</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
          <GraduationCap className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">Education</p>
            <p className="text-sm font-medium text-gray-800">USIU-Africa (Data Science, Apr 2026)</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Code className="w-4 h-4 text-blue-600" />Core Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["Python", "SQL", "R", "Excel", "Power BI", "Tableau", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "NLP", "Statistical Analysis"].map((s) => (
            <span key={s} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium border border-gray-200">{s}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-600" />Key Achievements</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Cum Laude Candidate at USIU-Africa (BSc Data Science & Analytics)</li>
          <li>CC Academy Data Analytics Skill Cohort Certified (ID: CC-DA-0326-001)</li>
          <li>Multiple DataCamp Certifications (Python, EDA, Data Science)</li>
          <li>Data Analyst Intern at KKCO East Africa LLP (Financial Audit Analytics)</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Globe className="w-4 h-4 text-teal-600" />Languages</h3>
        <div className="flex gap-3">
          {[
            { lang: "English", level: "Fluent" },
            { lang: "Kiswahili", level: "Fluent" },
            { lang: "French", level: "Basic" },
          ].map((l) => (
            <div key={l.lang} className="px-3 py-2 bg-teal-50 rounded-lg border border-teal-200 text-center">
              <p className="text-sm font-semibold text-gray-800">{l.lang}</p>
              <p className="text-[10px] text-gray-500">{l.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

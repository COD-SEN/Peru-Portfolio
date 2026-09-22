"use client"

import { ExternalLink, Mail, MapPin, MessageCircle, Linkedin, Music2 } from "lucide-react"

const socials = [
  { platform: "LinkedIn", icon: Linkedin, color: "bg-[#0A66C2]", username: "brian-peru-227a863b6", url: "https://www.linkedin.com/in/brian-peru-227a863b6" },
  { platform: "WhatsApp", icon: MessageCircle, color: "bg-[#25D366]", username: "+254 790 579 802", url: "https://wa.me/254790579802" },
  { platform: "Email", icon: Mail, color: "bg-[#EA4335]", username: "brianperu2019@gmail.com", url: "mailto:brianperu2019@gmail.com" },
  { platform: "TikTok", icon: Music2, color: "bg-slate-900", username: "Brian Peru", url: "https://www.tiktok.com/" },
  { platform: "Location", icon: MapPin, color: "bg-[#2563EB]", username: "Nairobi, Kenya", url: "https://maps.google.com/?q=Nairobi,Kenya" },
]

export function SocialsContent() {
  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold text-gray-900">Contact &amp; Professional Profiles</h2><p className="text-sm text-gray-500 mt-1">Connect with Brian Peru through verified contact channels.</p></div>
      <div className="grid gap-4">{socials.map((social) => { const Icon = social.icon; return <div key={social.platform} className="group bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all overflow-hidden"><div className="flex items-center gap-4 p-4"><div className={`w-14 h-14 flex items-center justify-center ${social.color} rounded-xl shadow-md flex-shrink-0`}><Icon className="w-7 h-7 text-white" /></div><div className="flex-1 min-w-0"><p className="font-bold text-gray-900 text-base">{social.platform}</p><a href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 break-all">{social.username} <ExternalLink className="w-3 h-3 flex-shrink-0" /></a></div></div></div> })}</div>
    </div>
  )
}

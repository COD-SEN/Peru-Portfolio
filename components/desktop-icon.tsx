"use client"

import type { LucideIcon } from "lucide-react"

interface DesktopIconProps {
  icon: LucideIcon
  label: string
  onClick: () => void
}

const defaultGradients: Record<string, { bg: string; border: string }> = {
  "About Me": { bg: "from-rose-400 to-rose-600", border: "border-rose-300/60" },
  Projects: { bg: "from-violet-400 to-purple-600", border: "border-violet-300/60" },
  Resume: { bg: "from-cyan-300 to-blue-500", border: "border-cyan-300/60" },
  "Social Profiles": { bg: "from-pink-400 to-rose-500", border: "border-pink-300/60" },
  Interests: { bg: "from-amber-300 to-orange-500", border: "border-amber-300/60" },
  "Tech Ambitions": { bg: "from-purple-300 to-purple-500", border: "border-purple-300/60" },
  "Contact Me": { bg: "from-teal-300 to-emerald-500", border: "border-teal-300/60" },
  Certificates: { bg: "from-fuchsia-400 to-pink-600", border: "border-fuchsia-300/60" },
  Settings: { bg: "from-gray-400 to-slate-600", border: "border-gray-300/60" },
  Restart: { bg: "from-orange-400 to-rose-500", border: "border-orange-300/60" },
  "Log Out": { bg: "from-rose-500 to-pink-600", border: "border-rose-300/60" },
}

export function DesktopIcon({ icon: Icon, label, onClick }: DesktopIconProps) {
  const colors = defaultGradients[label] || {
    bg: "from-blue-500 to-indigo-600",
    border: "border-blue-300/60",
  }

  return (
    <button
      onClick={onClick}
      onDoubleClick={onClick}
      className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl hover:bg-white/15 transition-all group w-[76px] sm:w-[88px] active:scale-95"
    >
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${colors.bg} border-2 ${colors.border} shadow-lg group-hover:scale-115 group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-200`}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm" strokeWidth={1.8} />
      </div>
      <span className="text-[10px] sm:text-[11px] font-bold text-white text-center drop-shadow-lg leading-tight bg-black/50 backdrop-blur-md rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 max-w-full group-hover:bg-black/70 transition-colors duration-200">
        {label}
      </span>
    </button>
  )
}

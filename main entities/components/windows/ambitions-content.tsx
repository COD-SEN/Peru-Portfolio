"use client"

import { Target, Rocket, GraduationCap, Building2, Globe, Code, Users, Lightbulb, Briefcase, Crown } from "lucide-react"

const ambitions = [
  {
    icon: GraduationCap,
    title: "Master's Degree in Data Science",
    timeline: "2026 - 2028",
    gradient: "from-sky-400 to-blue-600",
    description: "Complete BSc in Data Science & Analytics from USIU-Africa, then pursue a Master's degree in Data Science or Advanced Analytics at a leading institution. Build expertise in advanced machine learning, statistical modeling, and big data systems.",
  },
  {
    icon: Code,
    title: "Advanced Analytics & ML Engineering Mastery",
    timeline: "2026 - 2027",
    gradient: "from-violet-500 to-purple-700",
    description: "Deepen expertise in Python, R, SQL, and machine learning frameworks. Master statistical modeling, predictive analytics, NLP, and computer vision. Contribute to open-source ML projects and build a portfolio of production-grade data science applications.",
  },
  {
    icon: Building2,
    title: "Senior Data Analyst at Major Corporation",
    timeline: "2027 - 2030",
    gradient: "from-emerald-400 to-green-600",
    description: "Secure a senior data analyst or data scientist role at leading global organizations in finance, tech, healthcare, or e-commerce. Lead analytics initiatives, mentor junior analysts, and drive data-driven transformation across business units.",
  },
  {
    icon: Rocket,
    title: "Launch Data-Driven Startup",
    timeline: "2030 - 2035",
    gradient: "from-amber-400 to-orange-600",
    description: "Found a data analytics or business intelligence startup addressing market gaps in African fintech, agritech, or healthcare. Develop AI-powered solutions that drive operational efficiency and revenue growth for businesses across the continent.",
  },
  {
    icon: Globe,
    title: "Global Data Science Leadership",
    timeline: "Ongoing",
    gradient: "from-teal-400 to-cyan-600",
    description: "Become a recognized voice in the African and global data science community. Speak at international conferences, publish research papers, and advocate for ethical AI and responsible data practices in developing economies.",
  },
  {
    icon: Users,
    title: "Data Literacy & Analytics Education",
    timeline: "Ongoing",
    gradient: "from-pink-400 to-rose-600",
    description: "Establish programs teaching data analytics and visualization to young Africans. Create open-source educational resources, mentor aspiring data scientists, and build pathways for underrepresented communities into data-driven careers.",
  },
  {
    icon: Lightbulb,
    title: "AI & Predictive Analytics Innovation",
    timeline: "2027 - 2035",
    gradient: "from-red-400 to-rose-700",
    description: "Conduct applied research in machine learning for real-world problems. Develop intelligent systems for agricultural optimization, supply chain analytics, and financial risk prediction across developing nations.",
  },
  {
    icon: Briefcase,
    title: "Analytics Consulting & Business Leadership",
    timeline: "2030 - 2040",
    gradient: "from-yellow-400 to-amber-600",
    description: "Build a data consulting firm helping African businesses leverage analytics for competitive advantage. Develop expertise in business strategy, client engagement, and scaling analytics operations across multiple industries.",
  },
  {
    icon: Crown,
    title: "Chief Data Officer / Analytics Executive",
    timeline: "2035 - Ongoing",
    gradient: "from-purple-500 to-pink-600",
    description: "Establish myself as a senior executive driving data strategy at major organizations. Serve on boards, mentor data science teams, and shape industry standards for ethical, impactful analytics across Africa and globally.",
  },
  {
    icon: Target,
    title: "Thought Leadership & Impact Advocacy",
    timeline: "Ongoing",
    gradient: "from-indigo-400 to-blue-700",
    description: "Build a powerful personal brand as a data scientist and thought leader. Publish technical articles on ML and analytics, maintain active contributions to data science communities, and inspire the next generation of African data professionals.",
  },
]

export function AmbitionsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tech Ambitions &amp; Goals</h2>
        <p className="text-sm text-gray-500 mt-1">A strategic roadmap for my career in technology and beyond.</p>
      </div>

      <div className="space-y-4">
        {ambitions.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full whitespace-nowrap">{item.timeline}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

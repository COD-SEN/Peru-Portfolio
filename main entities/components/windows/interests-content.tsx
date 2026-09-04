"use client"

import { Code, Cpu, Gamepad2, BookOpen, Music, Globe, Dumbbell, Camera } from "lucide-react"

const interests = [
  {
    icon: Code,
    title: "Data Analysis & Python Programming",
    gradient: "from-sky-400 to-blue-600",
    description: "Passionate about extracting meaningful insights from complex datasets using Python and advanced analytical tools. I enjoy solving real-world data puzzles, optimizing data processes, and transforming raw information into actionable business intelligence.",
  },
  {
    icon: Cpu,
    title: "Machine Learning & AI Applications",
    gradient: "from-violet-500 to-purple-700",
    description: "Fascinated by the transformative potential of machine learning in business and healthcare. Excited about building predictive models, conducting NLP research, and applying deep learning techniques to solve complex problems across African markets.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning & Professional Development",
    gradient: "from-emerald-400 to-green-600",
    description: "A dedicated lifelong learner pursuing advanced certifications in data science, M&E, and analytics. I actively engage with online courses, academic research, and hands-on projects to stay current with evolving technologies and best practices.",
  },
  {
    icon: Globe,
    title: "Community Service & Youth Mentorship",
    gradient: "from-teal-400 to-cyan-600",
    description: "Committed to giving back through community service and mentoring young people in STEM and analytics. Volunteer at the Kenya Women and Children Wellness Center, passionate about creating pathways for underrepresented communities into data science careers.",
  },
  {
    icon: Music,
    title: "Creative Expression & Arts",
    gradient: "from-amber-400 to-orange-600",
    description: "Appreciate music and creative pursuits as sources of inspiration and balance. I believe artistic thinking complements analytical work by fostering innovative problem-solving approaches and creative data visualization techniques.",
  },
  {
    icon: Camera,
    title: "Data Storytelling & Visualization",
    gradient: "from-indigo-400 to-blue-700",
    description: "Captivated by the power of data storytelling and compelling visualization. I enjoy creating interactive dashboards and visual narratives that make complex data accessible and drive informed decision-making across organizations.",
  },
  {
    icon: Gamepad2,
    title: "Technology & Innovation",
    gradient: "from-red-400 to-rose-600",
    description: "Enthusiastic about exploring emerging technologies and innovative applications of data science. Interested in fintech, edtech, and sustainable development solutions that leverage analytics to create positive impact.",
  },
  {
    icon: Dumbbell,
    title: "Wellness & Holistic Development",
    gradient: "from-pink-400 to-rose-600",
    description: "Believe in maintaining work-life balance and overall wellness. Physical fitness and mental health support productivity and creativity, enabling better focus and problem-solving in both professional and personal pursuits.",
  },
]

export function InterestsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Interests</h2>
        <p className="text-sm text-gray-500 mt-1">The passions and pursuits that drive my career in data science and analytics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {interests.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

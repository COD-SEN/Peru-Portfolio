"use client"

import { useState } from "react"
import Image from "next/image"
import { Code, BarChart3, TrendingUp, Database, PieChart, LineChart, Table2, Zap, GitBranch, Briefcase, X } from "lucide-react"

const projects = [
  {
    title: "Car Sales Performance Dashboard",
    description: "Interactive multi-sheet Excel dashboard tracking sales volume, revenue trends, and customer segments across dealership data. Features PivotTables, dynamic slicers, conditional formatting, and identified seasonal demand spikes with actionable stock and promotion insights.",
    icon: BarChart3,
    gradient: "from-green-400 to-emerald-600",
    tags: ["Excel", "PivotTables", "Dashboard"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.31.43-PkVVVRddeuOCZFR0nKsyL7g9y6coJF.jpeg",
  },
  {
    title: "Fitness Calorie Prediction Model",
    description: "Regression model trained on wearable device data to predict calorie expenditure using Python and Scikit-learn. Deployed as a Streamlit web app with feature selection, cross-validation, and RMSE/R² evaluation for real-world activity predictions.",
    icon: TrendingUp,
    gradient: "from-orange-400 to-red-600",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.40.24-kMySE65j9tj2j38lam0KZIOaWJihpy.jpeg",
  },
  {
    title: "ML Model Predictions",
    description: "Comprehensive machine learning comparison featuring Random Forest, Decision Trees, Linear Regression, and Gradient Boosting models. Evaluated models using cross-validation and multiple metrics including R², MAE, and RMSE for optimal performance selection.",
    icon: Code,
    gradient: "from-purple-400 to-pink-600",
    tags: ["ML", "Python", "Scikit-learn"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.40.25-WFkKKKI8WfikPQMuXpnSqvuYb31QjV.jpeg",
  },
  {
    title: "Data Analytics Overview",
    description: "Visual dashboard summarizing key analytics findings including model predictions, performance metrics, and data insights. Presents complex analytical results in accessible format for stakeholder communication.",
    icon: Zap,
    gradient: "from-indigo-400 to-blue-700",
    tags: ["Analytics", "Visualization", "BI"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%2810%29-jfUM2nrAReZdX9WCsr5FiU9jCjPETq.jpg",
  },
  {
    title: "Activity Level Assessment",
    description: "Comprehensive Python and Excel analysis of fitness activity data with automated calorie burn estimation. Includes activity classification, performance benchmarking, and personalized recommendations based on user activity patterns.",
    icon: Database,
    gradient: "from-teal-400 to-cyan-600",
    tags: ["Python", "Excel", "Analytics"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.40.25%20%282%29-HPkhI8woCGANFBjYw2tuP9QsbgIHqB.jpeg",
  },
  {
    title: "HR Department Dashboard",
    description: "Interactive Power BI dashboard visualizing HR metrics including employee distribution, salary analysis, recruitment source, employee satisfaction, and geographic location. Features multi-level filtering and drill-down capabilities for data exploration.",
    icon: LineChart,
    gradient: "from-pink-400 to-rose-600",
    tags: ["Power BI", "HR Analytics", "Dashboard"],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.31.44-iDjyMm9nmjfn5AyRAYG8qQiA2rWaoP.jpeg",
  },
]

export function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
          <p className="text-sm text-gray-500 mt-1">Click any project to view details. A portfolio of analytics, machine learning, and data science projects demonstrating hands-on expertise.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <button
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all text-left cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br ${project.gradient} shadow-md`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{project.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-start justify-between border-b">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br ${selectedProject.gradient} shadow-md flex-shrink-0`}>
                  {selectedProject.icon && <selectedProject.icon className="w-8 h-8 text-white" strokeWidth={1.8} />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {selectedProject.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">Click the X button to close this view.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

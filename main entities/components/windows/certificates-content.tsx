"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

const certificates = [
  {
    id: 1,
    title: "Google Foundations: Data, Data, Everywhere",
    platform: "Google/Coursera",
    date: "Apr 1, 2025",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.32.51-hCTNnUNXo7RINlkCWDN0beM8pPana3.jpeg",
  },
  {
    id: 2,
    title: "Data Analytics Skill Cohort",
    platform: "CC Academy",
    date: "Mar 30, 2026",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.32.54%20%281%29-zIrHwivSjWNFYU8eR7PdDye2aWVrx2.jpeg",
  },
  {
    id: 3,
    title: "Preparing Data for Analysis with Excel",
    platform: "Microsoft/Coursera",
    date: "Mar 6, 2025",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.32.52-vuj2ONBXQcSJq0lRkDGH66IWJs7PDt.jpeg",
  },
  {
    id: 4,
    title: "Understanding Data Science",
    platform: "DataCamp",
    date: "Jul 4, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.32.52%20%281%29-2gDAUWdyBH074zclXnef61DcYkkF44.jpeg",
  },
  {
    id: 5,
    title: "Introduction to Python",
    platform: "DataCamp",
    date: "Jun 9, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.32.53-3dDOUei0ey4e4RtZ5DbkoUAwPIZAnw.jpeg",
  },
  {
    id: 6,
    title: "Exploratory Data Analysis in Python",
    platform: "DataCamp",
    date: "Jun 1, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-07-16%20at%2010.32.54-rpuq22QIvEP92xZCESUDDXQheewCe9.jpeg",
  },
]

export function CertificatesContent() {
  const [selectedCert, setSelectedCert] = useState<(typeof certificates)[0] | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % certificates.length)
  }

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certificates & Achievements</h2>
          <p className="text-sm text-gray-500 mt-1">Click any certificate to view full details in a large gallery view.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => {
                setSelectedCert(cert)
                setImageIndex(certificates.findIndex((c) => c.id === cert.id))
              }}
              className="group text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-fuchsia-400 hover:shadow-lg transition-all"
            >
              <div className="aspect-video relative mb-3 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-fuchsia-600 transition-colors">{cert.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{cert.platform}</p>
              <p className="text-xs text-gray-400 mt-0.5">{cert.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-fuchsia-50 to-pink-50 px-6 py-4 flex items-center justify-between border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCert.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedCert.platform} • {selectedCert.date}</p>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 relative overflow-hidden min-h-[500px]">
              <Image
                key={selectedCert.id}
                src={certificates[imageIndex].image}
                alt={certificates[imageIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
              <button
                onClick={handlePrev}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="flex gap-2 overflow-x-auto flex-1 mx-4 pb-2">
                {certificates.map((cert, idx) => (
                  <button
                    key={cert.id}
                    onClick={() => setImageIndex(idx)}
                    className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden transition-all border-2 ${
                      imageIndex === idx
                        ? "border-fuchsia-500 ring-2 ring-fuchsia-300"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Counter */}
            <div className="bg-gray-50 px-6 py-3 text-center text-sm text-gray-600 border-t">
              Certificate {imageIndex + 1} of {certificates.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

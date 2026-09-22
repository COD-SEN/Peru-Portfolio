"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send } from "lucide-react"

const WHATSAPP_NUMBER = "254790579802" // +254 is Kenya country code

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields (name, subject, message required - email optional)
    if (!formData.name.trim() || !formData.subject.trim() || !formData.message.trim()) {
      alert("Please fill in Name, Subject, and Message fields")
      return
    }

    // Build the WhatsApp message
    const whatsappMessage = `*New Contact Message*\n\n*Name:* ${formData.name}${
      formData.email ? `\n*Email:* ${formData.email}` : ""
    }\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`

    // Create WhatsApp link (using web.whatsapp.com for desktop/browser)
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage
    )}`

    // Open WhatsApp
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Me</h2>
          <p className="text-gray-600 text-sm">Send me a message via WhatsApp and I'll get back to you soon!</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email (Optional)</label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="bg-white resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          <Send className="w-4 h-4 mr-2" />
          Send via WhatsApp
        </Button>
      </form>
    </div>
  )
}

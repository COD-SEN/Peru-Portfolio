import type React from "react"
import type { Metadata, Viewport } from "next"
import { Arima as Tahoma } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const tahoma = Tahoma({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-tahoma",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0067c0",
}

export const metadata: Metadata = {
  title: "Brian Peru — Learner Support Teacher",
  description: "Brian Peru — Learner Support Teacher specializing in Special Needs and Inclusive Education.",
  generator: "My app",
  verification: {
    google: "google9efaad4f8be5d079",
  },
  icons: {
    icon: [
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/apple-icon.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${tahoma.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

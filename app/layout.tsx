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
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0067c0",
}

export const metadata: Metadata = {
  title: "Brian Peru — Learner Support Teacher",
  description: "Brian Peru — Learner Support Teacher specializing in Special Needs and Inclusive Education.",
  generator: "Brian Peru Portfolio",
  applicationName: "Brian Peru Portfolio",
  keywords: ["Brian Peru", "Special Needs Education", "Learner Support Teacher", "Inclusive Education"],
  metadataBase: new URL("https://peru-portfolio-azure.vercel.app"),
  openGraph: {
    title: "Brian Peru — Learner Support Teacher",
    description: "A calm, accessible portfolio for Brian Peru's work in learner support and inclusive education.",
    type: "website",
    images: [{ url: "/brian-classroom-background.jpeg", alt: "Brian Peru in a classroom setting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Peru — Learner Support Teacher",
    description: "Learner support, inclusive education, and professional resources.",
    images: ["/brian-classroom-background.jpeg"],
  },
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

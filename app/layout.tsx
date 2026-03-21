import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://fedegastronomy.com"),
  title: {
    default: "Fede Gastronomy | Private Chef Experience NYC",
    template: "%s | Fede Gastronomy"
  },
  description: "Federico Aristizabal - Elevating private dining to an art form in New York City. Bespoke culinary experiences for discerning palates.",
  keywords: ["Private Chef NYC", "Gourmet Catering New York", "Bespoke Dining", "Federico Aristizabal", "Luxury Gastronomy"],
  authors: [{ name: "Federico Aristizabal" }],
  creator: "Federico Aristizabal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fedegastronomy.com",
    siteName: "Fede Gastronomy",
    title: "Fede Gastronomy | Private Chef Experience NYC",
    description: "Elevating private dining to an art form in New York City. Bespoke culinary experiences for discerning palates.",
    images: [
      {
        url: "/IMG_8256.jpg",
        width: 1200,
        height: 630,
        alt: "Fede Gastronomy Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fede Gastronomy | Private Chef Experience NYC",
    description: "Elevating private dining to an art form in New York City. Bespoke culinary experiences for discerning palates.",
    images: ["/IMG_8256.jpg"],
    creator: "@fedegastronomy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${playfair.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}

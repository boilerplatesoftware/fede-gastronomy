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
  title: "Fede Gastronomy | Private Chef Experience NYC",
  description:
    "Federico Aristizabal - Elevating private dining to an art form in New York City. Bespoke culinary experiences for discerning palates.",

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

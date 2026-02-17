import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Fede Gastronomy | Private Chef Experience NYC",
  description:
    "Federico Aristizabal - Elevating private dining to an art form in New York City. Bespoke culinary experiences for discerning palates.",
  generator: "v0.app",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_playfair.variable} ${_inter.variable}`}>
        {children}
      </body>
    </html>
  )
}

"use client"

import { HeroEnterprise } from "@/components/hero-enterprise"
import { ServicesSection } from "@/components/services-section"
import { MenuHighlights } from "@/components/menu-highlights"
import { ChefEnterprise } from "@/components/chef-enterprise"
import { BlogEditorial } from "@/components/blog-editorial"
import { NewsletterSection } from "@/components/newsletter-section"
import { BookingEngine } from "@/components/booking-engine"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <main className="bg-[#f2f0e9] text-[#1a1a1a] min-h-screen selection:bg-[#D4AF37] selection:text-black font-serif">
      <div className="grain-overlay opacity-30 mix-blend-multiply pointer-events-none fixed inset-0 z-50" />
      <Sidebar />

      <HeroEnterprise onOpenBooking={() => setIsBookingOpen(true)} />

      <ServicesSection />

      {/* Dark Immersive Section */}
      <div className="bg-[#050505] text-[#f5f5f5] relative z-10">
        <ChefEnterprise />
        <MenuHighlights />
      </div>

      <BlogEditorial />
      <NewsletterSection />
      <Footer />

      <AnimatePresence>
        {isBookingOpen && (
          <BookingEngine isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  )
}

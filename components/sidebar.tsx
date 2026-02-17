"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { useRouter } from "next/navigation"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "The Chef", href: "/chef" },
  { label: "Menu", href: "/#menu" },
  { label: "Contact", href: "#contact" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (href: string) => {
    setIsOpen(false)

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "")
      // If we are already on home, scroll. otherwise push to home + hash
      if (window.location.pathname === "/") {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        router.push(href)
      }
    } else if (href.startsWith("#")) {
      const targetId = href.replace("#", "")
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(href)
    }
  }

  return (
    <>
      {/* Menu trigger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-8 left-8 z-50 w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center hover:bg-[#1a1a1a] transition-colors bg-[#0a0a0a] text-[#D4AF37] shadow-lg shadow-black/10"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            />

            {/* Sidebar panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 left-0 h-full w-80 md:w-96 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-[#D4AF37]/20 transform-gpu will-change-transform"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center hover:bg-[#1a1a1a] transition-colors text-[#D4AF37] bg-black/20"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="pt-24 px-12">
                <span className="font-serif text-3xl text-[#D4AF37] tracking-widest">FEDE</span>
              </div>

              {/* Navigation links */}
              <div className="mt-16 px-12">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.1 + i * 0.05,
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.href)
                    }}
                    className="block py-4 text-2xl font-serif text-[#f5f5f5] hover:text-[#D4AF37] transition-colors border-b border-white/10 cursor-pointer"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Footer info */}
              <div className="absolute bottom-12 left-12 right-12">
                <div className="text-xs text-white/40 space-y-2 font-mono">
                  <p>New York City</p>
                  <p>contact@fedegastronomy.com</p>
                  <p className="pt-4 text-[#D4AF37]/50">© 2026 Fede Gastronomy</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

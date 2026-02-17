"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer id="contact" className="py-24 px-6 md:px-12 lg:px-24 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <span className="font-serif text-4xl text-foreground">FEDE</span>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Elevating private dining to an art form in New York City.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-foreground">
              <p>contact@fedegastronomy.com</p>
              <p>+1 (212) 555-0198</p>
              <p>Manhattan, New York</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Follow</h4>
            <div className="space-y-3 text-sm text-foreground">
              <a href="#" className="block hover:text-muted-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="block hover:text-muted-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/50">© 2026 Fede Gastronomy. All rights reserved.</p>
          <p className="text-xs text-muted-foreground/50">Designed for excellence.</p>
        </div>
      </div>
    </footer>
  )
}

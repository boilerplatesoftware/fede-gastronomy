"use client"

import { motion } from "framer-motion"

const bioText = [
  "Federico Aristizabal brings over a decade of culinary mastery",
  "to the most discerning tables of New York City.",
  "Trained in the kitchens of Michelin-starred establishments,",
  "his philosophy centers on precision, seasonality, and intimacy.",
]

export function ChefSection() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative aspect-[3/4] bg-muted overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
          <img
            src="/elegant-black-and-white-portrait-of-male-chef-in-d.jpg"
            alt="Chef Federico Aristizabal"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          {/* Frame accent */}
          <div className="absolute inset-4 border border-foreground/10 pointer-events-none" />
        </motion.div>

        {/* Bio */}
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-muted-foreground text-xs tracking-[0.3em] uppercase"
          >
            The Chef
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
          >
            Federico Aristizabal
          </motion.h2>

          <div className="space-y-4">
            {bioText.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2 + i * 0.1,
                }}
                className="text-muted-foreground text-lg md:text-xl leading-relaxed font-sans"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
            className="pt-8"
          >
            <div className="flex items-center gap-8 text-xs tracking-[0.2em] uppercase text-muted-foreground">
              <span>Est. 2015</span>
              <span className="w-12 h-px bg-border" />
              <span>NYC</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

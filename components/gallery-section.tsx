"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const dishes = [
  { id: 1, name: "Wagyu Tartare", query: "elegant wagyu beef tartare fine dining dark plate gold accents" },
  { id: 2, name: "Black Truffle Risotto", query: "luxurious black truffle risotto white plate dark background" },
  { id: 3, name: "Seared Scallops", query: "perfectly seared scallops fine dining dark moody plating" },
  { id: 4, name: "Aged Duck Breast", query: "sliced aged duck breast fine dining dark plate elegant" },
  { id: 5, name: "Chocolate Sphere", query: "chocolate sphere dessert fine dining dark elegant plating" },
]

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-muted-foreground text-xs tracking-[0.3em] uppercase"
        >
          The Gallery
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-foreground mt-4"
        >
          Signature Dishes
        </motion.h2>
      </div>

      {/* Horizontal scroll gallery */}
      <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-12 lg:pl-24 transform-gpu will-change-transform">
        {dishes.map((dish, i) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 100, rotateY: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: i * 0.1,
            }}
            className="flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] group transform-gpu will-change-transform"
            style={{ perspective: "1000px" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <motion.img
                src={`/placeholder.svg?height=625&width=500&query=${dish.query}`}
                alt={dish.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="font-serif text-2xl text-foreground">{dish.name}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-sans">{dish.name}</span>
              <span className="text-muted-foreground/50 text-xs">0{dish.id}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    category: "Philosophy",
    title: "The Art of Restraint",
    excerpt: "Why the most powerful dishes often have the fewest ingredients.",
    date: "Jan 2026",
    image: "/minimalist-plated-dish-black-background.jpg",
  },
  {
    id: 2,
    category: "Seasonal",
    title: "Winter's Hidden Treasures",
    excerpt: "Foraging for the unexpected flavors that define our winter menu.",
    date: "Dec 2025",
    image: "/winter-vegetables-root-vegetables-dark-moody.jpg",
  },
  {
    id: 3,
    category: "Technique",
    title: "Fire & Time",
    excerpt: "Mastering the ancient craft of open-flame cooking in a modern kitchen.",
    date: "Nov 2025",
    image: "/IMG_8256.jpg",
  },
]

export function BlogSection() {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="text-muted-foreground text-xs tracking-[0.3em] uppercase block"
            >
              From the Kitchen
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Journal
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            View All
            <ArrowUpRight className="w-4 h-4 transform-gpu group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.1,
              }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-muted">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale contrast-110 transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                {/* Frame accent */}
                <div className="absolute inset-3 border border-foreground/0 group-hover:border-foreground/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{post.category}</span>
                <span className="w-8 h-px bg-border" />
                <span className="text-xs tracking-[0.15em] text-muted-foreground">{post.date}</span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 group-hover:text-foreground/80 transition-colors duration-300">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-muted-foreground text-base leading-relaxed font-sans">{post.excerpt}</p>

              {/* Read More */}
              <div className="mt-6 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                <span>Read</span>
                <ArrowUpRight className="w-3 h-3 transform-gpu group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
          className="mt-24 h-px bg-border origin-left"
        />
      </div>
    </section>
  )
}

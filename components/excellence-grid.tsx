"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const items = [
    {
        title: "Private Dining",
        description: "Exclusive culinary experiences in the comfort of your home.",
        span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
        title: "Corporate Events",
        description: "Elevate your business gatherings.",
        span: "col-span-1 row-span-1",
    },
    {
        title: "Masterclasses",
        description: "Learn from the masters of cuisine.",
        span: "col-span-1 row-span-1",
    },
    {
        title: "Menu Curation",
        description: "Bespoke menus designed for your palate.",
        span: "col-span-1 md:col-span-2 row-span-1",
    },
]

export function ExcellenceGrid() {
    return (
        <section className="py-32 px-6 md:px-12 lg:px-24 bg-background">
            <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Curated Excellence</h2>
                <div className="h-px w-full bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-4 md:h-[800px]">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative p-8 bg-secondary/30 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col justify-between ${item.span}`}
                    >
                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 mt-auto">
                            <h3 className="text-2xl md:text-3xl font-medium mb-3">{item.title}</h3>
                            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

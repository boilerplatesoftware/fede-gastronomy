"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const dishes = [
    {
        id: "01",
        name: "Classic Steak Tartare",
        desc: "Hand-cut beef tenderloin, cornichons, capers, organic egg yolk. Served with artisan crisps.",
        image: "/minimalist-plated-dish-black-background.jpg"
    },
    {
        id: "02",
        name: "Seared Filet Mignon",
        desc: "Pea purée, heirloom carrot reduction, edible flower petals. A study in texture and color.",
        image: "/winter-vegetables-root-vegetables-dark-moody.jpg"
    },
    {
        id: "03",
        name: "Kanafeh",
        desc: "Middle Eastern spun pastry, sweet cheese, rose water syrup, garnished with pistachios and floral notes.",
        image: "/minimalist-plated-dish-black-background.jpg"
    },
    {
        id: "04",
        name: "Tempura Prawns",
        desc: "Lightly battered, served on cedar wood with a yuzu-chili emulsion.",
        image: "/winter-vegetables-root-vegetables-dark-moody.jpg"
    },
]

export function MenuHighlights() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax effect for the section title
    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section id="menu" ref={containerRef} className="py-32 bg-[#1a1a1a] text-[#f5f5f5] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <motion.div style={{ y }} className="mb-24 relative z-10">
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-6">Culinary Signatures</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[0.9]">
                        Art on <br /> The Plate
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-24">
                    {dishes.map((dish, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`group ${i % 2 === 1 ? "md:mt-24" : ""}`}
                        >
                            <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-800 mb-8">
                                <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Loading skeleton feel */}
                                <Image
                                    src={dish.image}
                                    alt={dish.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-mono border border-white/10">
                                    {dish.id}
                                </div>
                            </div>

                            <h3 className="text-2xl font-serif mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                                {dish.name}
                            </h3>
                            <p className="text-white/60 font-light leading-relaxed max-w-sm">
                                {dish.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

"use client"

import { motion } from "framer-motion"
import { ArrowDown, Play } from "lucide-react"
import Image from "next/image"

interface HeroEditorialProps {
    onOpenBooking: () => void
}

export function HeroEditorial({ onOpenBooking }: HeroEditorialProps) {
    return (
        <section className="relative h-screen w-full bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden">

            {/* BACKGROUND MEDIA LAYER */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
                <div className="relative w-full h-full">
                    {/* 
                Video Background capabilities:
                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
                    <source src="/hero-cinematic.mp4" type="video/mp4" />
                </video>
            */}

                    {/* Fallback/Primary Image: Dark, dramatic chef portrait */}
                    <Image
                        src="/open-flame-cooking-dramatic-lighting.jpg"
                        alt="Cinematic Chef Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />

                    {/* Gradient fade to bottom to blend with stone theme if needed, 
                 but strict cut might be better for 'Cinema' feel. 
                 Adding slight bottom gradient for safety. */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                </div>
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-20 h-full flex flex-col justify-between p-6 md:p-12 lg:p-24">

                {/* Top Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex justify-between items-start"
                >
                    <span className="text-xs uppercase tracking-[0.3em] font-medium border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        The Midnight Collection
                    </span>
                    <span className="hidden md:block text-xs uppercase tracking-widest opacity-70">
                        New York City
                    </span>
                </motion.div>

                {/* Center/Main Title */}
                <div className="flex flex-col gap-6 max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-none tracking-tight mix-blend-overlay"
                    >
                        Culinary <br />
                        <span className="italic">Architecture</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.1 }}
                        className="text-lg md:text-xl text-white/70 max-w-lg font-light leading-relaxed"
                    >
                        A sensory exploration of taste, texture, and time.
                        Experience the avant-garde of private dining.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.3 }}
                        className="flex items-center gap-6 mt-4"
                    >
                        <button
                            onClick={onOpenBooking}
                            className="bg-white text-black px-8 py-4 rounded-none text-sm uppercase tracking-widest font-bold hover:bg-white/90 transition-colors"
                        >
                            Book Experience
                        </button>
                        <button className="flex items-center gap-3 text-sm uppercase tracking-widest hover:text-white/70 transition-colors group">
                            <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                                <Play className="w-3 h-3 fill-white" />
                            </span>
                            Watch Film
                        </button>
                    </motion.div>
                </div>

                {/* Bottom Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex justify-between items-end border-t border-white/10 pt-6"
                >
                    <div className="flex gap-8 text-xs uppercase tracking-widest opacity-50">
                        <span>01. Sourcing</span>
                        <span>02. Process</span>
                        <span>03. Plating</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll</span>
                        <ArrowDown className="w-4 h-4 opacity-50 animate-bounce" />
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

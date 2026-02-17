"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { AnimatedText } from "@/components/ui/animated-text"
import { ArrowRight } from "lucide-react"

interface HeroEnterpriseProps {
    onOpenBooking: () => void
}

export function HeroEnterprise({ onOpenBooking }: HeroEnterpriseProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    // Parallax effect for background
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
            {/* Background Image with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <Image
                    src="/ny-skyline-luxury.jpg"
                    alt="New York City Skyline at Night"
                    fill
                    className="object-cover opacity-80"
                    priority
                    quality={90}
                />
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[#0a0a0a]/30" />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center items-start">

                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="h-[1px] w-12 bg-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase">
                        Est. 2014 &mdash; New York City
                    </span>
                </motion.div>

                {/* Main Title */}
                <div className="space-y-2 mb-10">
                    <AnimatedText
                        text={["The Art of", "Private Dining."]}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] tracking-tight"
                    />
                </div>

                {/* Subtitle / Description */}
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-lg md:text-xl font-light text-white/80 max-w-xl mb-12 leading-relaxed"
                >
                    Experience Michelin-caliber cuisine in the privacy of your home.
                    Curated by Chef Federico Aristizábal.
                </motion.p>

                {/* CTA Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    onClick={onOpenBooking}
                    className="group relative px-8 py-4 bg-[#D4AF37] text-black font-medium text-sm tracking-widest uppercase overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                        Book Experience <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                </motion.button>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    )
}

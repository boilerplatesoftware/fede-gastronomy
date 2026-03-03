"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { AnimatedText } from "@/components/ui/animated-text"
import { ArrowRight, ChevronLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

interface ServiceHeroProps {
    title: string
    subtitle: string
    image: string
    onContact: () => void
}

export function ServiceHero({ title, subtitle, image, onContact }: ServiceHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <section ref={containerRef} className="relative h-[85vh] w-full overflow-hidden bg-black text-white">
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-60"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
            </motion.div>

            <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute top-12 left-6 md:left-12 z-20"
                >
                    <Link
                        href="/#services"
                        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back</span>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-6"
                >
                    <div className="h-[1px] w-12 bg-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase">
                        Enterprise Gastronomy
                    </span>
                </motion.div>

                <div className="max-w-4xl mb-10">
                    <AnimatedText
                        text={[title]}
                        className="text-5xl md:text-8xl font-serif font-medium leading-[1.1] mb-6 italic"
                    />
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg md:text-xl font-light text-white/70 max-w-2xl leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    onClick={onContact}
                    className="group relative w-fit px-10 py-5 bg-white text-black font-medium text-xs tracking-[0.3em] uppercase overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Secure Gold-Tier Slot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-[#D4AF37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f2f0e9] to-transparent z-10" />
        </section>
    )
}

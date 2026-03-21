"use client"

import { motion } from "framer-motion"
import { AnimatedText } from "@/components/ui/animated-text"
import Image from "next/image"

export function ChefEnterprise() {
    return (
        <section className="py-32 bg-[#0a0a0a] text-[#f5f5f5] relative overflow-hidden">
            {/* Background texture/grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-16 md:gap-32">
                {/* Portrait */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full md:w-5/12 aspect-[3/4]"
                >
                    <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4" />
                    <div className="relative h-full w-full overflow-hidden bg-neutral-900 grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/HeroPicture.jpg"
                            alt="Chef Federico Aristizábal"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-[-20px] left-[-20px] bg-[#D4AF37] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest"
                    >
                        The Visionary
                    </motion.div>
                </motion.div>

                {/* Bio Content */}
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-12 bg-[#D4AF37]" />
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Federico Aristizábal Vélez</span>
                    </div>

                    <AnimatedText
                        text={["Bridging Basque Tradition", "With New York's", "Relentless Energy."]}
                        el="h2"
                        className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-10"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-white/60 leading-relaxed font-light text-lg max-w-xl"
                    >
                        <p>
                            A graduate of the prestigious <strong className="text-white font-normal">Basque Culinary Center</strong> in San Sebastián, Federico creates gastronomic experiences that linger in memory long after the last course.
                        </p>
                        <p>
                            His journey spans the kitchens of the <strong className="text-white font-normal">Four Seasons Hotel Downtown NY</strong>, Baccarat Hotel, and exclusive collaborations during New York Fashion Week.
                        </p>
                        <p>
                            Today, he brings this Michelin-caliber expertise to private residences and Fortune 500 boardrooms, curating bespoke menus that blend avant-garde technique with deep respect for product.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-12 flex flex-wrap gap-4"
                    >
                        {["Creative Consultant", "Private Chef", "Culinary Director"].map((role, i) => (
                            <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
                                {role}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

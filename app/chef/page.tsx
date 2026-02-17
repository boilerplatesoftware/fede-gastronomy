"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"

export default function ChefPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] selection:bg-[#D4AF37] selection:text-black">
            <div className="grain-overlay opacity-30 mix-blend-multiply pointer-events-none fixed inset-0 z-50" />
            <Sidebar />

            <section className="container mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-40">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 relative"
                    >
                        <div className="aspect-[3/4] relative overflow-hidden bg-neutral-900 rounded-sm">
                            <div className="absolute inset-0 bg-[#D4AF37]/10 z-10 mix-blend-overlay" />
                            <Image
                                src="/chef-fede-opt1.jpg"
                                alt="Chef Federico Aristizábal"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[#D4AF37]/30 z-0 hidden md:block" />
                        <div className="absolute -top-6 -left-6 w-48 h-48 border border-[#D4AF37]/30 z-0 hidden md:block" />
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-1/2"
                    >
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Visionary</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-[0.9]">
                            Federico <br /> Aristizábal
                        </h1>

                        <div className="space-y-6 text-lg font-light text-white/80 leading-relaxed max-w-xl">
                            <p>
                                I’m Federico Aristizábal Vélez, a Colombian chef with an international career. Since 2014, my journey has evolved significantly, and today I create tailored culinary experiences in New York City and beyond.
                            </p>
                            <p>
                                A graduate of the prestigious <strong className="text-white font-normal">Basque Culinary Center</strong> in San Sebastián, Federico creates gastronomic experiences that linger in memory long after the last course.
                            </p>
                            <p>
                                His journey spans the kitchens of the <strong className="text-white font-normal">Four Seasons Hotel Downtown NY</strong>, Baccarat Hotel, and exclusive collaborations during New York Fashion Week.
                            </p>
                            <p>
                                A key chapter in my career was my time at <strong className="text-white font-normal">Water Street Associates (WSA)</strong> in Manhattan, where I helped build a culinary team from the ground up.
                            </p>
                            <p>
                                Today, he brings this Michelin-caliber expertise to private residences and Fortune 500 boardrooms, curating bespoke menus that blend avant-garde technique with deep respect for product.  Events include the official <strong className="text-white font-normal">Met Gala After Party</strong>, The Nike Marathon, and exclusive events for <strong className="text-white font-normal">Gucci</strong>.
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 flex flex-col md:flex-row gap-8 text-sm font-mono text-white/50 border-t border-white/10 pt-8"
                        >
                            <div>
                                <span className="block text-[#D4AF37] mb-1">Origin</span>
                                Colombia
                            </div>
                            <div>
                                <span className="block text-[#D4AF37] mb-1">Specialty</span>
                                Private Dining & Avant-Garde
                            </div>
                            <div>
                                <span className="block text-[#D4AF37] mb-1">Base</span>
                                New York City
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </main>
    )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }, [])

    useEffect(() => {
        if (isHovered) return
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [next, isHovered])

    return (
        <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.3em] block mb-4">
                            Extraordinary Feedback
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
                            Client Experiences
                        </h2>
                    </motion.div>
                </div>

                <div
                    className="max-w-5xl mx-auto relative px-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative h-[280px] md:h-[240px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                                className="w-full text-center"
                            >
                                <div className="flex justify-center mb-8">
                                    <Quote className="w-12 h-12 text-[#D4AF37]/20" />
                                </div>

                                <p className="text-xl md:text-2xl lg:text-3xl font-serif text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto italic">
                                    "{testimonials[currentIndex].quote}"
                                </p>

                                <div className="space-y-2">
                                    <div className="flex justify-center gap-1 mb-4">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                                        ))}
                                    </div>
                                    <p className="text-[#D4AF37] font-serif text-lg">
                                        {testimonials[currentIndex].name}
                                    </p>
                                    <p className="text-xs font-mono text-white/30 uppercase tracking-widest">
                                        {testimonials[currentIndex].city} — {testimonials[currentIndex].service}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-[#D4AF37] transition-all group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-[#D4AF37] transition-all group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-16">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/10"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

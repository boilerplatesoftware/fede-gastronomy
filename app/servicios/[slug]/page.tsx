"use client"

import { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { getServiceBySlug } from "@/lib/services"
import { ServiceHero } from "@/components/service-hero"
import { ConciergeModal } from "@/components/concierge-modal"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ServicePage() {
    const params = useParams()
    const slug = params.slug as string
    const service = getServiceBySlug(slug)
    const [isConciergeOpen, setIsConciergeOpen] = useState(false)

    if (!service) {
        notFound()
    }

    return (
        <main className="bg-[#f2f0e9] min-h-screen">
            <ServiceHero
                title={service.title}
                subtitle={service.description}
                image={service.image}
                onContact={() => setIsConciergeOpen(true)}
            />

            <section className="py-24 container mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-serif mb-8 italic">The Vision</h2>
                            <p className="text-xl text-black/70 font-light leading-relaxed mb-12">
                                {service.longDescription}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                <div className="p-8 border border-black/5 bg-white/50 backdrop-blur-sm">
                                    <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">Core Focus</h3>
                                    <ul className="space-y-4">
                                        {service.tags.map((tag, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-light">
                                                <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 border border-black/5 bg-black text-white">
                                    <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">Enterprise Tiers</h3>
                                    <p className="text-sm font-light text-white/60 leading-relaxed italic">
                                        "Exclusivity is not just about access, but about the absence of compromise."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="sticky top-32 p-10 border border-black/10 bg-white">
                            <h3 className="text-xl font-serif mb-6 italic">Secure Assignment</h3>
                            <p className="text-sm text-black/50 font-light mb-8 leading-relaxed">
                                Our concierge team will prioritize your inquiry. Finalize your request to unlock private availability.
                            </p>

                            <button
                                onClick={() => setIsConciergeOpen(true)}
                                className="w-full py-4 border border-black text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500 mb-6"
                            >
                                Inquire Now
                            </button>

                            <div className="flex flex-col gap-4 border-t border-black/5 pt-8">
                                <Link
                                    href="/#services"
                                    className="text-[10px] uppercase tracking-[0.2em] text-black/40 hover:text-black flex items-center gap-2 transition-colors"
                                >
                                    <ChevronRight className="w-3 h-3 rotate-180" /> Back to Expertise
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <ConciergeModal
                isOpen={isConciergeOpen}
                onClose={() => setIsConciergeOpen(false)}
                serviceTitle={service.title}
                conciergeMessage={service.conciergeMessage}
            />
        </main>
    )
}

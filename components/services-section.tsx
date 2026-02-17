"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const services = [
    {
        id: "01",
        title: "Private Chef Experience",
        description: "Intimate tasting menus and seated dinners brought to your residence. A journey through flavor, tailored to your palate.",
        tags: ["Tasting Menus", "Wine Pairing", "Storytelling"]
    },
    {
        id: "02",
        title: "Premium Catering",
        description: "Elevating corporate events and social gatherings. From experimental canapés to grand buffets, executed with white-glove service.",
        tags: ["Corporate", "Fashion Week", "Weddings"]
    },
    {
        id: "03",
        title: "Culinary Consulting",
        description: "Operational optimization and menu development for hospitality brands. We align culinary identity with business goals.",
        tags: ["Menu Design", "Ops", "Brand Identity"]
    },
    {
        id: "04",
        title: "NY Meal Prep",
        description: "Nutritionally precision-engineered meals for the high-performance lifestyle of New York professionals and athletes.",
        tags: ["Macros", "Organic", "Convenience"]
    }
]

export function ServicesSection() {
    return (
        <section id="services" className="py-32 bg-[#f2f0e9] text-[#1a1a1a]">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-black/10 pb-8">
                    <div>
                        <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-[#D4AF37]">Our Expertise</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-medium">Curated Services</h3>
                    </div>
                    <p className="max-w-md text-sm md:text-base text-black/60 mt-6 md:mt-0 font-light leading-relaxed">
                        Comprehensive gastronomic solutions designed for those who refuse to compromise on quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-6 border-b border-black/10 pb-6 group-hover:border-[#D4AF37] transition-colors duration-500">
                                <span className="text-sm font-mono text-black/40 group-hover:text-[#D4AF37] transition-colors">/{service.id}</span>
                                <ArrowUpRight className="w-5 h-5 text-black/40 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </div>

                            <h4 className="text-2xl font-serif mb-4 group-hover:translate-x-2 transition-transform duration-300">{service.title}</h4>
                            <p className="text-black/60 font-light leading-relaxed mb-6 max-w-sm">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] uppercase tracking-wider border border-black/5 px-3 py-1 rounded-full group-hover:border-[#D4AF37]/30 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

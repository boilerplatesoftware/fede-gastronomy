"use client"

import { motion } from "framer-motion"

const clients = [
    "VOGUE", "FORBES", "MICHELIN GUIDE", "THE NEW YORK TIMES", "EATER",
    "BON APPÉTIT", "WALL STREET JOURNAL", "ESQUIRE", "GQ"
]

export function ClientsMarquee() {
    return (
        <section className="bg-background border-y border-white/5 py-12 overflow-hidden">
            <div className="relative flex w-full">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex whitespace-nowrap min-w-full gap-24 items-center"
                >
                    {[...clients, ...clients].map((client, i) => (
                        <span
                            key={i}
                            className="text-2xl md:text-3xl font-serif font-bold text-muted-foreground/30 uppercase tracking-widest hover:text-foreground transition-colors duration-300 cursor-default"
                        >
                            {client}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

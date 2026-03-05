"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Loader2 } from "lucide-react"

export function NewsletterSection() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus("loading")
        setMessage("")

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, firstName }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.")
            }

            if (data.ok) {
                setStatus("success")
                setEmail("")
                setFirstName("")
                setMessage("Welcome! You've been successfully added to our private selection.")
            }
        } catch (err) {
            setStatus("error")
            setMessage(err instanceof Error ? err.message : "An unexpected error occurred.")

            // Reset to idle after 4s
            setTimeout(() => {
                setStatus("idle")
                setMessage("")
            }, 4000)
        }
    }

    return (
        <section className="relative py-32 bg-[#050505] text-white overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#D4AF37]/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="inline-flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-8 bg-[#D4AF37]" />
                        <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                            Exclusive Circle
                        </span>
                        <div className="h-[1px] w-8 bg-[#D4AF37]" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 italic leading-tight">
                        A Private Invitation <br /> to Flavor.
                    </h2>

                    <p className="text-white/50 font-light leading-relaxed mb-12 max-w-lg mx-auto">
                        Be the first to secure a slot in our seasonal experiences and receive curated gastronomic insights from Chef Federico.
                    </p>

                    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative group flex-1">
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Names"
                                    disabled={status === "loading" || status === "success"}
                                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/20 disabled:opacity-50"
                                />
                            </div>

                            <div className="relative group flex-[2]">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Private Email"
                                    disabled={status === "loading" || status === "success"}
                                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/20 disabled:opacity-50"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={status !== "idle"}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-[#D4AF37] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <AnimatePresence mode="wait">
                                        {status === "loading" ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            </motion.div>
                                        ) : status === "success" ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-[#D4AF37]"
                                            >
                                                <Check className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center gap-2 group-hover:gap-4 transition-all"
                                            >
                                                <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:inline">Join</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {(status === "success" || status === "error") && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`text-xs font-light tracking-wide ${status === "success" ? "text-[#D4AF37]" : "text-red-400"
                                        }`}
                                >
                                    {message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>

            {/* Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay grain-overlay" />
        </section>
    )
}

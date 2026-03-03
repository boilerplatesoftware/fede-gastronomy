"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

interface ConciergeModalProps {
    isOpen: boolean
    onClose: () => void
    serviceTitle: string
    conciergeMessage: string
}

export function ConciergeModal({
    isOpen,
    onClose,
    serviceTitle,
    conciergeMessage,
}: ConciergeModalProps) {
    const whatsappUrl = `https://wa.me/573000000000?text=${encodeURIComponent(conciergeMessage)}`

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#1a1a1a] text-white border-white/10 p-0 overflow-hidden">
                <div className="relative p-8 pt-12">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <DialogHeader className="text-left mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[1px] w-8 bg-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                                Exclusive Concierge
                            </span>
                        </div>
                        <DialogTitle className="text-3xl font-serif font-medium mb-4 italic">
                            Gold-Tier Access
                        </DialogTitle>
                        <DialogDescription className="text-white/60 text-sm font-light leading-relaxed">
                            You are about to connect with our private concierge regarding the <span className="text-white font-medium">{serviceTitle}</span>.
                            Expect a response within minutes.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-3 w-full py-4 bg-[#D4AF37] text-black font-medium text-sm tracking-widest uppercase transition-colors hover:bg-[#C5A028]"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Contact on WhatsApp
                        </motion.a>

                        <p className="text-[10px] text-center text-white/30 uppercase tracking-[0.2em]">
                            Available 24/7 for Enterprise Clients
                        </p>
                    </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            </DialogContent>
        </Dialog>
    )
}

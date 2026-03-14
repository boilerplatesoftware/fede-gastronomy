"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react"

enum Step {
    DATE = 0,
    GUESTS = 1,
    DETAILS = 2,
    CONTACT = 3,
    CONFIRM = 4
}

interface BookingEngineProps {
    isOpen: boolean
    onClose: () => void
}

export function BookingEngine({ isOpen, onClose }: BookingEngineProps) {
    const [step, setStep] = useState<Step>(Step.DATE)
    const [direction, setDirection] = useState(1)

    // Form State
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [guestCount, setGuestCount] = useState<number | string | null>(null)
    const [details, setDetails] = useState({ occasion: "", dietary: "" })
    const [contact, setContact] = useState({ name: "", email: "", phone: "" })
    const [budget, setBudget] = useState<string>("")
    const [emailError, setEmailError] = useState<string | null>(null)
    const [errors, setErrors] = useState({ email: false, phone: false })

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const PHONE_REGEX = /^\+?[0-9\s\-\(\).]{7,20}$/

    const canProceed = () => {
        switch (step) {
            case Step.DATE: return selectedDate !== null
            case Step.GUESTS: return guestCount !== null
            case Step.DETAILS: return details.occasion.trim() !== "" && details.dietary.trim() !== ""
            case Step.CONTACT: {
                const isEmailValid = EMAIL_REGEX.test(contact.email)
                const isPhoneValid = PHONE_REGEX.test(contact.phone)
                return contact.name.trim() !== "" && isEmailValid && isPhoneValid && budget !== ""
            }
            default: return true
        }
    }

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    }

    const prevMonth = () => {
        const today = new Date()
        const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        // Prevent going back past current month
        if (prev.getMonth() < today.getMonth() && prev.getFullYear() === today.getFullYear()) return
        if (prev < new Date(today.getFullYear(), today.getMonth(), 1)) return

        setCurrentMonth(prev)
    }

    // Reset state when closed
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setStep(Step.DATE)
                setSelectedDate(null)
                setCurrentMonth(new Date())
                setGuestCount(null)
                setDetails({ occasion: "", dietary: "" })
                setContact({ name: "", email: "", phone: "" })
                setBudget("")
                setEmailError(null)
                setDirection(1)
            }, 500) // Wait for exit animation
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const [isLoading, setIsLoading] = useState(false)

    const nextStep = async () => {
        if (step === Step.CONTACT) {
            setIsLoading(true)
            try {
                const res = await fetch("/api/reservations/confirm", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        reservationId: `RES-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                        customerEmail: contact.email,
                        customerName: contact.name,
                        date: selectedDate?.toLocaleDateString(),
                        time: "TBD", // Component currently doesn't have time selection, placeholder
                        guests: guestCount,
                        location: "Fede Gastronomy (Venue/Private)",
                        menuName: details.occasion,
                        total: budget,
                        notes: details.dietary
                    }),
                })

                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    console.error("API error:", data);
                    throw new Error(data?.error || "Failed to send reservation");
                }

                const data = await res.json();
                if (!data.customerEmailSent) {
                    setEmailError(data.customerError || "Email delivery restricted in testing mode.");
                }

                setDirection(1)
                setStep(Step.CONFIRM)
            } catch (error) {
                console.error("Booking Error:", error)
                // Optionally show a toast error here
            } finally {
                setIsLoading(false)
            }
        } else {
            setDirection(1)
            setStep((prev) => Math.min(prev + 1, Step.CONFIRM))
        }
    }

    const prevStep = () => {
        setDirection(-1)
        setStep((prev) => Math.max(prev - 1, Step.DATE))
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            filter: "blur(10px)"
        }),
        center: {
            x: 0,
            opacity: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -50 : 50,
            opacity: 0,
            filter: "blur(10px)"
        })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${((step + 1) / 5) * 100}%` }}
                                className="h-full bg-white transition-all duration-500"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-20"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-center mb-12 pt-4">
                                <div>
                                    <span className="text-xs font-mono text-white/50 uppercase tracking-widest block mb-2">Step {step + 1}/05</span>
                                    <h2 className="text-2xl font-serif text-white">
                                        {step === Step.DATE && "Select a Date"}
                                        {step === Step.GUESTS && "Party Size"}
                                        {step === Step.DETAILS && "Concierge Details"}
                                        {step === Step.CONTACT && "Finalize Request"}
                                        {step === Step.CONFIRM && "Availability Confirmed"}
                                    </h2>
                                </div>
                            </div>

                            <div className="relative min-h-[400px]">
                                <AnimatePresence initial={false} mode="wait" custom={direction}>
                                    {step === Step.DATE && (
                                        <motion.div
                                            key="date"
                                            custom={direction}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            className="space-y-6"
                                        >
                                            {/* Calendar Header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                    <ChevronLeft className="w-5 h-5 text-white" />
                                                </button>
                                                <span className="text-lg font-serif text-[#D4AF37]">
                                                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </span>
                                                <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                    <ChevronRight className="w-5 h-5 text-white" />
                                                </button>
                                            </div>

                                            {/* Days Grid */}
                                            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                                    <div key={day} className="text-xs text-white/30 uppercase tracking-widest">{day}</div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-2">
                                                {/* Empty slots for starting day */}
                                                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                                                    <div key={`empty-${i}`} />
                                                ))}

                                                {/* Actual days */}
                                                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                                                    const day = i + 1
                                                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                                                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                                                    const isToday = new Date().toDateString() === date.toDateString()
                                                    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

                                                    return (
                                                        <button
                                                            key={i}
                                                            onClick={() => !isPast && setSelectedDate(date)}
                                                            disabled={isPast}
                                                            className={`aspect-square flex items-center justify-center rounded-sm transition-all text-sm font-medium border relative
                                                                ${isSelected
                                                                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                                                                    : isPast
                                                                        ? "text-white/10 border-transparent cursor-not-allowed"
                                                                        : "hover:bg-white/10 border-white/5 text-white/80"
                                                                }
                                                                ${isToday && !isSelected ? "border-white/30" : ""}
                                                            `}
                                                        >
                                                            {day}
                                                            {isToday && !isSelected && (
                                                                <div className="absolute bottom-1 w-1 h-1 bg-[#D4AF37] rounded-full" />
                                                            )}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === Step.GUESTS && (
                                        <motion.div
                                            key="guests"
                                            custom={direction}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            className="flex flex-col gap-4"
                                        >
                                            {[2, 4, 6, 8, "Private Event (10+)"].map((num, i) => {
                                                const isSelected = guestCount === num
                                                return (
                                                    <button
                                                        key={num.toString()}
                                                        onClick={() => setGuestCount(num)}
                                                        className={`flex justify-between items-center w-full px-6 py-5 border-b transition-all duration-300 group text-left ${isSelected
                                                            ? "bg-white text-black border-white pl-8"
                                                            : "border-white/10 hover:bg-white/5 hover:pl-8 text-white"
                                                            }`}
                                                    >
                                                        <span className={`text-xl font-light ${isSelected ? "text-black" : "text-white"}`}>{num} Guests</span>
                                                        {isSelected && <Check className="w-5 h-5 text-black" />}
                                                    </button>
                                                )
                                            })}
                                        </motion.div>
                                    )}

                                    {step === Step.DETAILS && (
                                        <motion.div
                                            key="details"
                                            custom={direction}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-white/50">Occasion</label>
                                                <input
                                                    type="text"
                                                    value={details.occasion}
                                                    onChange={(e) => setDetails({ ...details, occasion: e.target.value })}
                                                    placeholder="Birthday, Anniversary, Business..."
                                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors font-serif text-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-white/50">Dietary Restrictions</label>
                                                <input
                                                    type="text"
                                                    value={details.dietary}
                                                    onChange={(e) => setDetails({ ...details, dietary: e.target.value })}
                                                    placeholder="Allergies, preferences..."
                                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors font-serif text-xl"
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === Step.CONTACT && (
                                        <motion.div
                                            key="contact"
                                            custom={direction}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-white/50">Name</label>
                                                    <input
                                                        type="text"
                                                        value={contact.name}
                                                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                                        placeholder="Full Name"
                                                        className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors font-serif text-lg"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs uppercase tracking-widest text-white/50">Phone</label>
                                                    <input
                                                        type="tel"
                                                        value={contact.phone}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/[^0-9\s\-\+\(\)\.]/g, '')
                                                            setContact({ ...contact, phone: val })
                                                        }}
                                                        placeholder="+1 (555) 000-0000"
                                                        className={`w-full bg-transparent border-b py-3 text-white placeholder-white/20 focus:outline-none transition-colors font-serif text-lg ${contact.phone && !PHONE_REGEX.test(contact.phone)
                                                            ? "border-red-500/50"
                                                            : "border-white/20 focus:border-white"
                                                            }`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs uppercase tracking-widest text-white/50">Email</label>
                                                <input
                                                    type="email"
                                                    value={contact.email}
                                                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                                    placeholder="email@example.com"
                                                    className={`w-full bg-transparent border-b py-3 text-white placeholder-white/20 focus:outline-none transition-colors font-serif text-lg ${contact.email && !EMAIL_REGEX.test(contact.email)
                                                        ? "border-red-500/50"
                                                        : "border-white/20 focus:border-white"
                                                        }`}
                                                />
                                            </div>

                                            <div className="space-y-2 pt-4">
                                                <label className="text-xs uppercase tracking-widest text-[#D4AF37]">Budget Per Guest (Est.)</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {["$150 - $250", "$250 - $400", "$400 - $600", "Bespoke / No Limit"].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => setBudget(opt)}
                                                            className={`py-3 px-4 text-xs uppercase tracking-widest border transition-all ${budget === opt
                                                                ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                                                                : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === Step.CONFIRM && (
                                        <motion.div
                                            key="confirm"
                                            custom={direction}
                                            variants={variants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            className="flex flex-col items-center justify-center h-full text-center space-y-8"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring" }}
                                                className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center"
                                            >
                                                <Check className="w-8 h-8 text-[#D4AF37]" />
                                            </motion.div>
                                            <div className="space-y-4">
                                                <h3 className="text-3xl font-serif text-white">Request Received</h3>
                                                <p className="text-white/50 max-w-xs mx-auto">
                                                    Thank you, {contact.name.split(' ')[0]}. Our concierge will review your request and reach out at {contact.email} within 2 hours.
                                                </p>
                                                {emailError && (
                                                    <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded-lg mt-6 max-w-xs mx-auto text-left">
                                                        <p className="text-[#D4AF37] text-xs font-serif italic">
                                                            Note: We received your request, but the confirmation email could not be sent. This is common in testing mode. Don't worry, Chef Fede has been notified!
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {step !== Step.CONFIRM && (
                                <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/5">
                                    <button
                                        onClick={prevStep}
                                        className={`text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={!canProceed() || isLoading}
                                        className="group flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-black text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px] justify-center"
                                        aria-label="Next Step"
                                    >
                                        {isLoading ? "Sending..." : step === Step.CONTACT ? "Submit Request" : "Continue"}
                                        {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

type Step = "date" | "guests" | "requirements"

export function BookingSection() {
  const [step, setStep] = useState<Step>("date")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [requirements, setRequirements] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)

  const isDateAvailable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date >= new Date() && date.getDay() !== 0 // Not in past and not Sunday
  }

  const handleDateClick = (day: number) => {
    if (isDateAvailable(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }
  }

  const nextStep = () => {
    if (step === "date" && selectedDate) setStep("guests")
    else if (step === "guests") setStep("requirements")
  }

  const prevStep = () => {
    if (step === "guests") setStep("date")
    else if (step === "requirements") setStep("guests")
  }

  const handleSubmit = () => {
    alert(
      `Booking requested for ${selectedDate?.toLocaleDateString()} with ${guests} guests.\n\nRequirements: ${requirements || "None specified"}`,
    )
  }

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-muted-foreground text-xs tracking-[0.3em] uppercase"
        >
          Reserve
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-16"
        >
          Book Your Experience
        </motion.h2>

        {/* Glassmorphism booking card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="relative rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl p-8 md:p-12"
        >
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {(["date", "guests", "requirements"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-300 ${
                    step === s
                      ? "bg-foreground text-background border-foreground"
                      : (["date", "guests", "requirements"].indexOf(step) > i)
                        ? "bg-foreground/20 border-foreground/40 text-foreground"
                        : "border-foreground/20 text-muted-foreground"
                  }`}
                >
                  {s === "date" && <Calendar className="w-4 h-4" />}
                  {s === "guests" && <Users className="w-4 h-4" />}
                  {s === "requirements" && <FileText className="w-4 h-4" />}
                </div>
                {i < 2 && (
                  <div
                    className={`w-16 h-px transition-colors duration-300 ${
                      ["date", "guests", "requirements"].indexOf(step) > i ? "bg-foreground/40" : "bg-foreground/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Date Selection */}
            {step === "date" && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="transform-gpu will-change-transform"
              >
                <h3 className="text-center font-serif text-2xl mb-8 text-foreground">Select Your Date</h3>

                {/* Month navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <span className="text-foreground font-sans">
                    {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {DAYS.map((day) => (
                    <div key={day} className="text-center text-xs text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const isAvailable = isDateAvailable(day)
                    const isSelected =
                      selectedDate?.getDate() === day &&
                      selectedDate?.getMonth() === currentMonth.getMonth() &&
                      selectedDate?.getFullYear() === currentMonth.getFullYear()

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={!isAvailable}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-sm transition-all duration-200
                          ${
                            isSelected
                              ? "bg-foreground text-background shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                              : isAvailable
                                ? "hover:bg-foreground/10 text-foreground hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                : "text-muted-foreground/30 cursor-not-allowed"
                          }
                        `}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Guests */}
            {step === "guests" && (
              <motion.div
                key="guests"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-center transform-gpu will-change-transform"
              >
                <h3 className="font-serif text-2xl mb-4 text-foreground">Number of Guests</h3>
                <p className="text-muted-foreground text-sm mb-12">Select between 2 and 12 guests</p>

                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={() => setGuests(Math.max(2, guests - 1))}
                    className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground"
                  >
                    -
                  </button>
                  <span className="font-serif text-6xl text-foreground w-24">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground"
                  >
                    +
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Requirements */}
            {step === "requirements" && (
              <motion.div
                key="requirements"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="transform-gpu will-change-transform"
              >
                <h3 className="text-center font-serif text-2xl mb-4 text-foreground">Special Requirements</h3>
                <p className="text-center text-muted-foreground text-sm mb-8">
                  Dietary restrictions, allergies, or special requests
                </p>

                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Tell us about your preferences..."
                  className="w-full h-40 bg-foreground/5 border border-foreground/10 rounded-xl p-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 transition-colors resize-none font-sans"
                />

                {/* Summary */}
                <div className="mt-8 p-6 bg-foreground/5 rounded-xl border border-foreground/10">
                  <h4 className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">Booking Summary</h4>
                  <div className="space-y-2 text-foreground">
                    <p>
                      <span className="text-muted-foreground">Date:</span>{" "}
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Guests:</span> {guests}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-12">
            <Button
              variant="ghost"
              onClick={prevStep}
              className={`text-muted-foreground hover:text-foreground ${step === "date" ? "invisible" : ""}`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {step !== "requirements" ? (
              <Button
                onClick={nextStep}
                disabled={step === "date" && !selectedDate}
                className="bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-foreground text-background hover:bg-foreground/90">
                Request Booking
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

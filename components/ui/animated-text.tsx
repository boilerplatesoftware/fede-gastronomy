"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"

interface AnimatedTextProps {
  text: string | string[]
  el?: keyof JSX.IntrinsicElements
  className?: string
  once?: boolean
  delay?: number
  duration?: number
}

const defaultVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
    rotate: 2,
    filter: "blur(5px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = true,
  delay = 0,
  duration = 0.5,
}: AnimatedTextProps) => {
  const controls = useRef(null)
  const isInView = useInView(controls, { amount: 0.5, once })
  
  const textArray = Array.isArray(text) ? text : [text]

  return (
    <Wrapper className={className}>
      <span className="sr-only">{textArray.join(" ")}</span>
      <motion.span
        ref={controls}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1, delayChildren: delay }}
        aria-hidden
        className="block"
      >
        {textArray.map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`} className="block overflow-hidden pb-2">
            <motion.span
              variants={defaultVariants}
              className="block will-change-transform"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  )
}

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

/* Placeholder images for the gallery */
const dishes = [
    { id: 1, title: "Wagyu A5 Tartare", caption: "Smoked marrow emulsion, caviar." },
    { id: 2, title: "Bluefin Otoro", caption: "Yuzu kosho, aged soy, gold leaf." },
    { id: 3, title: "Truffle Risotto", caption: "Acquerello rice, 36-month reggiano." },
    { id: 4, title: "Maine Lobster", caption: "Saffron beurre blanc, sea beans." },
]

export function GalleryParallax() {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-16 px-16 md:px-32">
                    {/* Header Card */}
                    <div className="flex h-[60vh] w-[80vw] md:w-[40vw] flex-col justify-center shrink-0">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                            Signature <br />
                            <span className="text-muted-foreground italic font-serif">Selection</span>
                        </h2>
                        <p className="mt-8 text-lg text-muted-foreground max-w-sm">
                            A curated journey through texture, temperature, and taste.
                        </p>
                    </div>

                    {/* Dish Cards */}
                    {dishes.map((dish, i) => (
                        <DishCard key={dish.id} dish={dish} index={i} />
                    ))}

                    {/* End Card */}
                    <div className="flex h-[60vh] w-[80vw] md:w-[40vw] items-center justify-center shrink-0">
                        <span className="text-xl uppercase tracking-widest text-muted-foreground">End of Service</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function DishCard({ dish, index }: { dish: { title: string, caption: string }, index: number }) {
    return (
        <motion.div
            className="relative h-[60vh] w-[80vw] md:w-[40vw] shrink-0 overflow-hidden bg-secondary/20 grayscale hover:grayscale-0 transition-all duration-700 ease-out group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ margin: "-10%" }}
        >
            <div className="absolute inset-0 bg-neutral-900" />
            {/* 
         TODO: Add real images
         <Image src={`/dish-${index}.jpg`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" alt={dish.title} />
       */}

            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-serif text-white">{dish.title}</h3>
                <p className="text-sm text-white/70 mt-1">{dish.caption}</p>
            </div>
        </motion.div>
    )
}

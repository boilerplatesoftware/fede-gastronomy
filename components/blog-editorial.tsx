import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "@/lib/blog-data"

interface BlogEditorialProps {
    posts: BlogPost[]
}

export function BlogEditorial({ posts }: BlogEditorialProps) {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-secondary/30">
            <div className="flex justify-between items-end mb-16 px-2">
                <Link href="/blog">
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground hover:opacity-70 transition-opacity">Notes & Journals</h2>
                </Link>
                <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:underline decoration-1 underline-offset-4">
                    Read All <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.slice(0, 3).map((post, i) => (
                    <Link href={`/blog/${post.slug}`} key={i} className="block h-full">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer h-full flex flex-col"
                        >
                            <div className="aspect-[4/3] bg-neutral-200 w-full mb-6 overflow-hidden relative shadow-sm">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-muted-foreground mb-3">
                                <span>{post.category}</span>
                                <span>{post.date}</span>
                            </div>

                            <h3 className="text-xl font-serif mb-3 group-hover:underline decoration-1 underline-offset-4">{post.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {post.excerpt}
                            </p>
                        </motion.article>
                    </Link>
                ))}
            </div>

            <div className="mt-12 md:hidden flex justify-center">
                <Link href="/blog" className="flex items-center gap-2 text-sm uppercase tracking-widest">
                    Read All <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    )
}

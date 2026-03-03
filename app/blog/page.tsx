import { blogPosts } from "@/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"

const POSTS_PER_PAGE = 9

export default function BlogIndexPage({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    const currentPage = Number(searchParams.page) || 1
    const totalPosts = blogPosts.length
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    const currentPosts = blogPosts.slice(startIndex, endIndex)

    return (
        <main className="min-h-screen bg-[#f2f0e9] text-[#1a1a1a] selection:bg-black selection:text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
                <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-3 h-3" /> Home
                </Link>
                <span className="text-xs font-mono opacity-50 hidden md:block">Fede Gastronomy Blog</span>
            </nav>

            <header className="pt-40 pb-20 px-6 md:px-12 lg:px-24 border-b border-black/5">
                <h1 className="text-6xl md:text-8xl font-serif text-center md:text-left mb-8">Notes & Journals</h1>
                <p className="text-xl md:text-2xl font-serif text-neutral-500 max-w-2xl text-center md:text-left">
                    Thoughts on sourcing, philosophy, and the relentless pursuit of culinary perfection.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 px-6 md:px-12 lg:px-24 py-24">
                {currentPosts.map((post, i) => (
                    <Link href={`/blog/${post.slug}`} key={i} className="group block">
                        <article>
                            <div className="aspect-[4/3] w-full mb-6 overflow-hidden relative bg-neutral-200">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-neutral-500 mb-4 border-b border-black/10 pb-4">
                                <span>{post.category}</span>
                                <span>{post.date}</span>
                            </div>

                            <h2 className="text-3xl font-serif mb-4 group-hover:underline decoration-1 underline-offset-4">{post.title}</h2>
                            <p className="text-neutral-600 leading-relaxed mb-6 font-serif">
                                {post.excerpt}
                            </p>

                            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                Read Entry <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </article>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pb-24 px-6 md:px-12 lg:px-24">
                    <Link
                        href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
                        className={`p-3 border border-black/10 hover:bg-black hover:text-white transition-all ${currentPage === 1 ? 'pointer-events-none opacity-20' : ''}`}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <Link
                                key={pageNum}
                                href={`/blog?page=${pageNum}`}
                                className={`w-12 h-12 flex items-center justify-center border border-black/10 transition-all font-mono text-sm ${currentPage === pageNum ? 'bg-black text-white' : 'hover:bg-black/5'}`}
                            >
                                {pageNum}
                            </Link>
                        ))}
                    </div>

                    <Link
                        href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : "#"}
                        className={`p-3 border border-black/10 hover:bg-black hover:text-white transition-all ${currentPage === totalPages ? 'pointer-events-none opacity-20' : ''}`}
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            )}
        </main>
    )
}

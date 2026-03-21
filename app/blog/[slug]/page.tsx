import { getBlogPosts, BlogPost } from "@/lib/blog-data"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { notFound } from "next/navigation"
import { Metadata } from "next"

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const blogPosts = await getBlogPosts()
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Federico Aristizabal'],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    }
}

export async function generateStaticParams() {
    const blogPosts = await getBlogPosts()
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const blogPosts = await getBlogPosts()
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    // Find next post for navigation
    const currentIndex = blogPosts.findIndex((p) => p.slug === slug)
    const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length]

    return (
        <article className="min-h-screen bg-[#f2f0e9] text-[#1a1a1a] selection:bg-black selection:text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
                <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-3 h-3" /> Back
                </Link>
                <span className="text-xs font-mono opacity-50 hidden md:block">Fede Gastronomy Blog</span>
            </nav>

            {/* Hero Header */}
            <header className="pt-40 pb-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
                <div className="flex justify-center gap-4 text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8">
                    <span>{post.category}</span>
                    <span>—</span>
                    <span>{post.date}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-12">
                    {post.title}
                </h1>

                <div className="relative aspect-video w-full overflow-hidden rounded-sm">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </header>

            {/* Article Content */}
            <div className="px-6 md:px-12 lg:px-24">
                <div
                    className="prose prose-lg prose-neutral mx-auto font-serif prose-headings:font-sans prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-sm prose-headings:font-normal prose-p:leading-relaxed prose-blockquote:border-l-black prose-blockquote:tracking-wide prose-blockquote:text-2xl prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:py-4 prose-blockquote:font-normal max-w-3xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="max-w-3xl mx-auto my-24 border-t border-black/10 flex justify-center pt-12">
                    <span className="text-4xl font-serif italic text-neutral-300">❦</span>
                </div>
            </div>

            {/* Next Article Suggestion */}
            <Link href={`/blog/${nextPost.slug}`} className="block group">
                <div className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12 lg:px-24 text-center cursor-pointer relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-xs uppercase tracking-widest text-white/50 mb-4 block">Read Next</span>
                        <h2 className="text-3xl md:text-5xl font-serif group-hover:italic transition-all duration-500">{nextPost.title}</h2>
                        <div className="mt-8 flex justify-center">
                            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                                Read Story <ArrowRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>

                    {/* Background Image Hover Reveal */}
                    <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                        <Image src={nextPost.image} fill alt="" className="object-cover grayscale" />
                    </div>
                </div>
            </Link>
        </article>
    )
}

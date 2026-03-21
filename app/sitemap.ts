import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-data'
import { services } from '@/lib/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://fedegastronomy.com'
    const blogPosts = await getBlogPosts()

    // Blog posts
    const blogUrls = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Services
    const serviceUrls = services.map((service) => ({
        url: `${baseUrl}/servicios/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Static pages
    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/chef`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.8,
        },
    ]

    return [...staticUrls, ...blogUrls, ...serviceUrls]
}

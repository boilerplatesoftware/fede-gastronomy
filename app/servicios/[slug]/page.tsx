import { notFound } from "next/navigation"
import { getServiceBySlug } from "@/lib/services"
import { ServiceClient } from "@/components/service-client"
import { Metadata } from "next"

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        return {
            title: 'Service Not Found',
        }
    }

    return {
        title: service.title,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            type: 'website',
            images: [
                {
                    url: service.image,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
    }
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params
    const service = getServiceBySlug(slug)

    if (!service) {
        notFound()
    }

    return <ServiceClient service={service} />
}

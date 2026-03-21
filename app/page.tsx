import { Metadata } from "next"
import { HomeClient } from "@/components/home-client"
import { getBlogPosts } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Fede Gastronomy | Bespoke Private Chef Experience in NYC",
  description: "Experience the pinnacle of private dining with Chef Federico Aristizabal. Luxury tasting menus, premium catering, and culinary consulting in New York City.",
  alternates: {
    canonical: "https://fedegastronomy.com",
  },
}

export default async function Home() {
  const blogPosts = await getBlogPosts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fede Gastronomy",
    "image": "https://fedegastronomy.com/IMG_8256.jpg",
    "@id": "https://fedegastronomy.com",
    "url": "https://fedegastronomy.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.instagram.com/fedegastronomy",
      "https://www.linkedin.com/in/federicoaristizabal"
    ],
    "priceRange": "$$$$"
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Federico Aristizabal",
    "jobTitle": "Private Chef",
    "url": "https://fedegastronomy.com/chef",
    "sameAs": [
      "https://www.instagram.com/fedegastronomy",
      "https://www.linkedin.com/in/federicoaristizabal"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HomeClient posts={blogPosts} />
    </>
  )
}

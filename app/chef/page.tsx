import { Metadata } from "next"
import { ChefClient } from "@/components/chef-client"

export const metadata: Metadata = {
    title: "Federico Aristizabal | The Vision Behind Fede Gastronomy",
    description: "Learn about Chef Federico Aristizabal's journey, from Michelin-starred kitchens in Europe to the avant-garde private dining scene of New York City.",
    alternates: {
        canonical: "https://fedegastronomy.com/chef",
    },
}

export default function ChefPage() {
    return <ChefClient />
}

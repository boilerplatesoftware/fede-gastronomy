export interface Service {
    id: string;
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    image: string;
    conciergeMessage: string;
}

export const services: Service[] = [
    {
        id: "01",
        slug: "private-chef-experience",
        title: "Private Chef Experience",
        description: "Intimate tasting menus and seated dinners brought to your residence. A journey through flavor, tailored to your palate.",
        longDescription: "Elevate your private gatherings with a bespoke culinary experience. Chef Federico Aristizábal brings the refinement of Michelin-starred dining to the comfort of your home. From initial consultation to final presentation, every detail is meticulously curated to reflect your preferences and the season's finest offerings.",
        tags: ["Tasting Menus", "Wine Pairing", "Storytelling"],
        image: "/HeroPicture.jpg",
        conciergeMessage: "I'm interested in the Private Chef Experience. I'd like to discuss a potential booking."
    },
    {
        id: "02",
        slug: "premium-catering",
        title: "Premium Catering",
        description: "Elevating corporate events and social gatherings. From experimental canapés to grand buffets, executed with white-glove service.",
        longDescription: "Sophisticated catering solutions for high-stakes events. Whether it's a corporate gala, a high-fashion launch, or a milestone celebration, we provide a seamless gastronomic experience that leaves a lasting impression. Our team handles everything from menu design to flawless service execution.",
        tags: ["Corporate", "Fashion Week", "Weddings"],
        image: "/minimalist-plated-dish-black-background.jpg",
        conciergeMessage: "I'm interested in Premium Catering for an upcoming event. Let's talk details."
    },
    {
        id: "03",
        slug: "culinary-consulting",
        title: "Culinary Consulting",
        description: "Operational optimization and menu development for hospitality brands. We align culinary identity with business goals.",
        longDescription: "Transform your hospitality brand with expert culinary guidance. We specialize in menu optimization, kitchen efficiency, and brand identity alignment. Our consulting services help you bridge the gap between creative vision and business profitability.",
        tags: ["Menu Design", "Ops", "Brand Identity"],
        image: "/IMG_8256.jpg",
        conciergeMessage: "I'm interested in Culinary Consulting. I'd like to schedule a strategy session."
    },
    {
        id: "04",
        slug: "ny-meal-prep",
        title: "NY Meal Prep",
        description: "Nutritionally precision-engineered meals for the high-performance lifestyle of New York professionals and athletes.",
        longDescription: "Fuel your performance with precision-crafted nutrition. Designed for the relentless pace of New York City, our meal prep service combines gourmet quality with bio-individual requirements. No compromises—just exquisite, ready-to-enjoy meals delivered to your door.",
        tags: ["Macros", "Organic", "Convenience"],
        image: "/winter-vegetables-root-vegetables-dark-moody.jpg",
        conciergeMessage: "I'm looking into the NY Meal Prep service. Can you share more about the weekly plans?"
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(s => s.slug === slug);
}

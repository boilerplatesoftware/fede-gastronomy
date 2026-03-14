export interface Testimonial {
    id: number;
    name: string;
    city: string;
    rating: number;
    quote: string;
    service: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Andrea M.",
        city: "NYC",
        rating: 5,
        quote: "An extraordinary culinary journey. Every detail, from the gold plating to the flavor profiles, was absolute perfection.",
        service: "Private Event"
    },
    {
        id: 2,
        name: "Carlos R.",
        city: "Pereira",
        rating: 5,
        quote: "Experiencia gastronómica sin precedentes. Chef Fede elevó nuestra cena técnica a un nivel de arte puro.",
        service: "Dinner for 2"
    },
    {
        id: 3,
        name: "Sophia L.",
        city: "NYC",
        rating: 5,
        quote: "The most exclusive catering in New York. Sophisticated, bold, and entirely bespoke. Simply magnificent.",
        service: "Private Event"
    },
    {
        id: 4,
        name: "Julian G.",
        city: "Pereira",
        rating: 5,
        quote: "Privacidad y exclusividad total. Los sabores cuentan una historia de técnica y pasión extraordinaria.",
        service: "Dinner for 2"
    },
    {
        id: 5,
        name: "Elena V.",
        city: "NYC",
        rating: 5,
        quote: "A masterclass in modern gastronomy. The service was impeccable and the food was beyond imagination.",
        service: "Private Event"
    }
];

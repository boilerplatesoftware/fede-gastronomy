export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string; // HTML string 
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-art-of-the-truffle-hunt",
    category: "Sourcing",
    title: "The Art of the Truffle Hunt",
    date: "Oct 12, 2025",
    excerpt: "Why we travel to Alba every autumn to hand-select the finest tubers for your table.",
    image: "/winter-vegetables-root-vegetables-dark-moody.jpg",
    content: `
      <p class="lead">In the misty hills of Piedmont, timing is everything. The white truffle of Alba — <em>Tuber magnatum pico</em> — respects no schedule but its own. It cannot be cultivated; it can only be discovered.</p>
      
      <p>Every October, the Fede culinary team travels to Northern Italy, not merely to purchase, but to participate. We walk the damp forests at dawn with the <em>trifulau</em> (truffle hunters) and their dogs. We choose to work with hunters who use dogs rather than pigs for a critical reason: pigs, driven by gluttony, often destroy the delicate mycelium network when unearthing the prize. Dogs, driven by play and reward, leave the ecosystem intact for future seasons.</p>

      <h3>The Architecture of Aroma</h3>
      <p>A white truffle is not an ingredient; it is a perfume that you eat. Its value lies not in its rarity alone, but in its ability to transform the simplest dish — a buttered tajarin pasta, a softly scrambled egg, or a warm fonduta — into a moment of sensory suspension.</p>
      
      <p>At Fede, we do not shave truffle over complex dishes where its nuance might get lost. We design entire courses around the truffle's specific aromatic profile of that season, which varies depending on the rainfall and soil pH of the specific micro-climate it was gathered from. A wet summer might yield tubers with notes of wet hay and garlic, while a dry season produces a tighter, more honey-forward fragrance.</p>
      
      <blockquote>
        "To cook with white truffle is to practice the art of restraint. The chef must step back and let nature speak."
      </blockquote>

      <h3>Sourcing for 2026</h3>
      <p>Our 2026 collection features specimens from a protected grove near Roddi, known for producing tubers with distinct structural integrity and prolonged aromatic shelf-life. These are flown overnight to New York in temperature-controlled, pressurized cabins to ensure that the aroma you smell at your table is as potent as it was in the forest.</p>

      <p>We invite you to experience this ephemeral delicacy during our "White Gold" service, running through mid-November. It is a reminder that the most luxurious things in life are often the most fleeting.</p>
    `
  },
  {
    slug: "plating-as-architecture",
    category: "Philosophy",
    title: "Plating as Architecture",
    date: "Nov 05, 2025",
    excerpt: "Exploring the structural integrity of a dish and how negative space effects flavor perception.",
    image: "/minimalist-plated-dish-black-background.jpg",
    content: `
      <p class="lead">A plate is not a canvas. A canvas is static. A plate is a temporal stage for an experience that destroys itself as it is consumed.</p>
      
      <p>In the Fede kitchen, we approach plating with the mindset of an architect. We consider structural integrity, flow, and most importantly, <em>negative space</em>. The empty space on a plate is not void; it is a pause. It allows the eye to rest and the mind to focus on the essential components. Just as silence defines music, empty space defines the dish.</p>

      <h3>Form Follows Flavor</h3>
      <p>Every vertical element must have a purpose. We do not stack ingredients for height; we stack them for texture to control the bite. When you cut through a dish, the collapse should be controlled, mixing sauces and textures in a predetermined sequence. The architecture of the bite dictates the flavor profile.</p>
      
      <p>Our internal study of "Gastronomic Geometry" suggests that the visual weight of food influences satiety and flavor perception. A symmetrical dish tastes "balanced" before the fork is even lifted. An asymmetrical arrangement creates tension and curiosity, driving the diner to explore the plate.</p>
      
      <blockquote>
        "Minimalism is not the absence of complexity, but the perfect containment of it."
      </blockquote>

      <h3>The Monochromatic Study</h3>
      <p>This season, we are exploring <em>monochromatic plating</em> — using shades of a single color to force the diner to distinguish ingredients solely by texture and taste, removing the bias of visual expectation. A dish of pure white — cauliflower, scallop, parsnip, and white chocolate — challenges the palate to find the sweetness, the earthiness, and the brine without color cues.</p> 

      <p>It is an exercise in focus, both for the chef and the guest.</p>
    `
  },
  {
    slug: "a-night-in-kyoto",
    category: "Journal",
    title: "A Night in Kyoto",
    date: "Dec 20, 2025",
    excerpt: "Inspiration drawn from the silent kaiseki counters of Gion.",
    image: "/open-flame-cooking-dramatic-lighting.jpg",
    content: `
      <p class="lead">There is a silence in the kitchens of Gion that is louder than any shout in a Western brigade. It is the silence of absolute focus.</p>
      
      <p>During our recent residency in Kyoto, we studied the rhythm of <em>Kaiseki</em> — the traditional multi-course dinner that honors the micro-seasons. But what struck us most was not just the food or the seasonality, but the fire. The use of <em>Binchotan</em> charcoal is a masterclass in heat management.</p>

      <h3>The Invisible Flame</h3>
      <p>Binchotan burns without smoke and without flame, emitting a pure, intense infrared heat. It does not flavor the food with heavy woodsmoke; it transforms the food's internal structure without external charring. It cooks from the inside out, preserving moisture while creating a glass-like crispness on the skin of fish or poultry.</p>
      
      <p>We have brought this philosophy back to our New York primitive kitchen. We are now using high-carbon Japanese oak charcoal to grill delicate proteins like squab and eel. The result is a texture that is impossible to achieve with gas or conventional wood.</p>
      
      <blockquote>
        "In the shadows of the tea house, we learned that true luxury is not abundance, but precision."
      </blockquote>

      <h3>The Midnight Collection</h3>
      <p>Our "Midnight Collection" menu is directly inspired by this trip — dark, atmospheric, and focused on the purity of elemental cooking. We serve dishes on dark ceramics to absorb light, highlighting the glisten of the ingredients. The pacing is slower, more deliberate, mimicking the contemplative flow of a tea ceremony.</p>
      
      <p>It is a homage to the masters of Kyoto, translated for the energy of New York.</p>
    `
  }
];

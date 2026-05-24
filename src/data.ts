import { TattooStyle, Artist, PortfolioItem, FAQ } from "./types";

// Visual references from generated images
export const IMAGES = {
  studioInterior: "./IMG_4201.PNG",
  tattooProcess: "./studio_baru.jpg",
  tattooArtwork: "./armband_black_bg_1779417848244.png",
  blackworkSleeve: "./sleeve_black_bg_1779418027639.png",
  realismStatue: "./statue_black_bg_1779418050290.png",
  fineLineVine: "./fine_line_vine_1779418228776.png",
  frangipaniTattoo: "./frangipani_black_bg_1779421686740.png",
};

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  role: string; // e.g., "Surfer & Tech Nomad", "Australian Digital Creator"
  quote: string;
  rating: number;
  date: string;
}

export const TATTOO_STYLES: TattooStyle[] = [
  {
    id: "blackwork",
    name: "Sacred Blackwork & Surrealism",
    description: "Visceral dark expressions, dense carbon fills, and complex textures flowing naturally across biological lines. Created with custom stencil blueprints for a bold statement.",
    image: IMAGES.blackworkSleeve,
    traits: {
      complexity: "Masterclass-High",
      averagePain: "Medium to High",
      healingTime: "12 - 18 Days",
      sessionType: "Full Day / Multi-Session"
    },
    details: [
      "Pure solid obsidian saturation with zero scarring",
      "Anatomic wrap lines custom sketched to muscle movement",
      "Surgical depth control for minimal epidermal trauma",
      "Hypoallergenic organic carbon formulations"
    ]
  },
  {
    id: "minimalist",
    name: "Luxury Fine-Line & Minimalist",
    description: "Surgical-precision work resembling ultra-thin silver threads on porcelain skin. Exquisite micro-botanicals, sacred geometry accents, and celestial alignment graphics.",
    image: IMAGES.tattooArtwork,
    traits: {
      complexity: "High-Precision",
      averagePain: "Low to Mild",
      healingTime: "7 - 10 Days",
      sessionType: "Hourly / Half-Day"
    },
    details: [
      "Ultra-fine single-needle (1RL) French execution",
      "Faded dot-work gradients and elegant stippled textures",
      "Extremely clean, modern design language",
      "High-density ink retention with optimal aging profile"
    ]
  },
  {
    id: "realism",
    name: "Dramatic High-Contrast Realism",
    description: "Photorealistic portraits, sculptural textures, and cinematic depth. Merging light and deep shadows to bring complex memories or natural elements to life purely on skin.",
    image: IMAGES.realismStatue,
    traits: {
      complexity: "Extreme Premium",
      averagePain: "Medium-High",
      healingTime: "10 - 15 Days",
      sessionType: "Consecutive Day Sessions"
    },
    details: [
      "Detailed 3D shadow layers utilizing soft gray washed tones",
      "Fineline micro details that survive active Bali sea-breeze healing",
      "Exclusive post-care medical wrap application (Dermalize Pro)",
      "Designed with multi-angle digital mockup mapping"
    ]
  },
  {
    id: "color",
    name: "Aqueous Watercolor & Organic Color",
    description: "Vibrant custom pigments, subtle airbrushed gradients, and dreamlike watercolor splash mechanics. Best suited for clients celebrating their transformative spiritual journey in Bali.",
    image: "https://images.unsplash.com/photo-1512413313706-e78d515f265d?q=80&w=600",
    traits: {
      complexity: "Advanced Colorway",
      averagePain: "Medium",
      healingTime: "10 - 14 Days",
      sessionType: "Half-Day / Full-Day"
    },
    details: [
      "Imported vegan pigments certified by EU safety standards",
      "Seamless soft transitions that mimic liquid paint on watercolor paper",
      "Custom skin tonal adjustments prior to stenciling",
      "Exceptional long-term dye persistence under harsh tropical sun"
    ]
  }
];

export const ARTISTS: Artist[] = [
  {
    id: "roy",
    name: "Roy",
    title: "Realistic charcoal specialist",
    specialty: "High-Contrast Charcoal Realism, Fine-Line Portraiture, Custom Illustrative",
    bio: "Roy translates intense personal narratives, anatomical details, and charcoal portrait aesthetics into permanent skin art. Highly professional, welcoming, and deeply collaborative.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500",
    instagram: "roy.ink.bali",
    languages: ["English", "Indonesian"],
    portfolio: [
      IMAGES.tattooArtwork,
      IMAGES.blackworkSleeve,
      IMAGES.realismStatue,
      IMAGES.fineLineVine
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    imageUrl: IMAGES.tattooArtwork,
    style: "Minimalist",
    title: "Endless Knot Geometric Band",
    artistName: "Roy"
  },
  {
    id: "p3",
    imageUrl: IMAGES.fineLineVine,
    style: "Minimalist",
    title: "Anatomical Botanical Vine",
    artistName: "Roy"
  },
  {
    id: "p4",
    imageUrl: IMAGES.blackworkSleeve,
    style: "Blackwork",
    title: "Sacred Skull & Empress Archive",
    artistName: "Roy"
  },
  {
    id: "p5",
    imageUrl: IMAGES.frangipaniTattoo,
    style: "Color",
    title: "Ethereal Bali Frangipani Blast",
    artistName: "Roy"
  },
  {
    id: "p6",
    imageUrl: IMAGES.realismStatue,
    style: "Realism",
    title: "Classical Sculpture Portrait",
    artistName: "Roy"
  }
];

export const GENERAL_FAQS: FAQ[] = [
  {
    question: "Do you accommodate walk-ins, or is it strictly reservation based?",
    answer: "As a premium custom studio, we operate primarily on a booking basis to secure uninterrupted time for drafting and sterile execution. However, same-day walk-in slots are occasionally available for smaller, elegant fine-line pieces. Feel free to contact our WhatsApp coordinator before walking in!"
  },
  {
    question: "How do we gauge pain levels for different anatomy sectors?",
    answer: "Pain is localized and relative. Fleshy areas like outer shoulders, biceps, and thighs are very manageable (low-medium). Bony or thin-skinned sectors, such as the collarbone, ribs, spine, or inner joints, feel more intense. Our masters utilize slow-stroke breathing techniques and a relaxed beachside ambiance to ease your nerves."
  },
  {
    question: "How long does a customized tattoo take to heal under Bali's sun?",
    answer: "Initial epidermal sealing takes 3 to 5 days, while deep tissue healing takes 14 to 21 days. We apply premium Dermalize Pro transparent waterproof medical patches directly after your session. This medical-grade barrier permits shower-proofing and shields your fresh ink from air-borne bacteria, but we highly advise against direct surf sessions or tanning beds for 10-14 days."
  },
  {
    question: "What are your specific chemical safety & hygiene standards?",
    answer: "Devarda.ink operates under surgical-standard hospital protocols. We boast full autoclave sanitizing chambers, absolute touchless washing stations, and 100% single-use, gas-sterilized medical cartridge needles. We use imported, vegan, cruelty-free carbon inks that strictly exceed EU REACH safety guidelines."
  },
  {
    question: "How is billing framed for international nomads & visitors?",
    answer: "We strive to be nomad-friendly. We accept major credit cards (Visa, Mastercard, Amex), secure international wires, local QRIS, and direct Cryptocurrency transfers (USDT / BTC / ETH) for seamless, secure transactions."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dresean Alston",
    country: "America",
    role: "Traveller",
    quote: "Very good artist and price. Highly professional. Definitely recommend for anyone looking for high quality tattoo and a reasonable price.",
    rating: 5,
    date: "December 2025"
  },
  {
    id: "t2",
    name: "Bradley Jacob",
    country: "Singapore",
    role: "Mixologist and Traveller",
    quote: "Roy was super welcoming and i were comfortable throughout. He was very professional and adhered to our request for specific addition/modification to our design. Highly recommended for affordable tattoos with a clean and cosy space. Will be back ! ",
    rating: 5,
    date: "March 2025"
  },
  {
    id: "t3",
    name: "Brittney Nikole",
    country: "America",
    role: "Traveller",
    quote: "Roy was great!!! Absolutely loved his freehand...he brought my little crazy idea to life and is fairly priced! Shop is clean and comfortable! Next time in Bali I'll be back!!!",
    rating: 5,
    date: "May 2025"
  },
  {
    id: "t4",
    name: "Sarah Jenkins",
    country: "Australia",
    role: "Digital Designer",
    quote: "Roy's fine-line work is absolute perfection. My geometric armband has healed flawlessly after less than 10 days in the Canggu heat. Meticulous aseptic standard and very patient design drafting.",
    rating: 5,
    date: "January 2026"
  },
  {
    id: "t5",
    name: "Maxime Dubois",
    country: "France",
    role: "Tech Nomad",
    quote: "Unbelievable studio alignments. Finding fine-line custom needle artists in Indonesia operating under absolute surgical hospital standards is extremely rare. Highly sophisticated experience.",
    rating: 5,
    date: "February 2026"
  },
  {
    id: "t6",
    name: "Kadek Wirawan",
    country: "Indonesia",
    role: "Local Surf Coach",
    quote: "The blackwork on my forearm wraps beautifully with natural muscular flow. Roy is a genius with anatomical placement and stenciling. Best studio on the island without doubt.",
    rating: 5,
    date: "November 2025"
  },
  {
    id: "t7",
    name: "Elena Rostova",
    country: "Germany",
    role: "Yacht Skipper",
    quote: "Symmetrical, delicate, and deeply therapeutic session. He took his time making sure every single dot alignment was mathematically sound. Returning to Bali means returning here.",
    rating: 5,
    date: "April 2026"
  },
  {
    id: "t8",
    name: "Oliver Smith",
    country: "United Kingdom",
    role: "Music Producer",
    quote: "Stunning private sanctuary environment. Premium vegan pigments, pristine sterilization protocols, and a fantastic sound track. My high-contrast charcoal portrait looks completely unreal.",
    rating: 5,
    date: "February 2026"
  },
  {
    id: "t9",
    name: "Chloe van der Berg",
    country: "Netherlands",
    role: "Travel Journalist",
    quote: "My fine-line botanical leaves are incredibly bright and sharp. They applied premium Dermalize waterproof medical wraps, leaving my showers and bike trips completely worry-free.",
    rating: 5,
    date: "October 2025"
  },
  {
    id: "t10",
    name: "Ethan Brooks",
    country: "Canada",
    role: "Creative Director",
    quote: "Simply elite carbon saturated shading. Extremely professional, comforting, and authentic. They genuinely care about fine-line longevity under the sun. An absolute standout in Southeast Asia.",
    rating: 5,
    date: "May 2026"
  }
];

export const HOURLY_RATES = {
  consultation: "Complimentary digital blueprint",
  fineLineRate: "IDR 1,500,000 / Hour",
  customDayRate: "IDR 8,500,000 / Day Session"
};

export const SANCTUARY_STANDARDS = [
  {
    title: "Surgical Hygiene",
    desc: "100% single-use EO gas-sterilized equipment, professional touchless sanitary washing stations, and medical-grade private glass booths with HEPA filtration."
  },
  {
    title: "Certified Vegan Inks",
    desc: "We exclusively import premium, intense hyper-black organic vegan inks (Dynamic & Intenze) for long-lasting deep black sheen and allergen-free skin healing."
  },
  {
    title: "Advanced Postcare",
    desc: "Premium native Balinese coconut and active care extracts are applied under medical dermal wraps (Dermalize Pro) to guarantee ocean-safe healing."
  }
];

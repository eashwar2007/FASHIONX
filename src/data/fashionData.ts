// FASHIONX - Dedicated Gender-Specific Fashion Databases
// Strict separation between Male and Female fashion options as required by FASHIONX specifications.

export type Gender = "male" | "female";

export type MainCategory =
  | "Traditional / Festive Wear"
  | "Casual Wear"
  | "Business Professional"
  | "Western Wear";

export interface CategoryOption {
  id: string;
  name: string;
  description: string;
  suggestedUpper: string[];
  suggestedBottom: string[];
  suggestedJackets: string[];
  suggestedShoes: string[];
}

export interface FashionCategoryConfig {
  id: MainCategory;
  title: string;
  description: string;
  options: string[];
  sampleSuggestions: {
    upperWear: string[];
    bottomWear: string[];
    jackets: string[];
    shoes: string[];
  };
}

// ==========================================
// 1. MALE FASHION DATA (Strictly Male Options)
// ==========================================
export const MALE_FASHION_CATEGORIES: FashionCategoryConfig[] = [
  {
    id: "Traditional / Festive Wear",
    title: "Traditional / Festive Wear",
    description: "Refined Indian & festive attire tailored with cultural poise.",
    options: [
      "Kurta",
      "Kurta + Pajama",
      "Kurta + Churidar",
      "Sherwani",
      "Dhoti + Kurta",
      "Bandhgala",
      "Indo-Western",
      "Traditional Fusion",
    ],
    sampleSuggestions: {
      upperWear: [
        "Maroon silk kurta",
        "Maroon silk short kurta",
        "Navy blue silk kurta",
        "Raw silk cream bandhgala jacket",
        "Deep emerald green embroidered sherwani",
        "Textured ivory tussar kurta",
      ],
      bottomWear: [
        "Classic white cotton churidar",
        "Off-white tapered pajama",
        "Pre-stitched silk dhoti with gold border",
        "Tailored straight-fit ivory trousers",
      ],
      jackets: [
        "Nehru Jacket (Optional)",
        "Contrast embroidered Nehru jacket (Optional)",
        "Raw silk sleeveless bandi jacket (Optional)",
      ],
      shoes: [
        "Handcrafted brown leather mojari",
        "Black velvet embroidered juttis",
        "Tan Kolhapuri leather slip-ons",
        "Traditional ethnic sandals",
      ],
    },
  },
  {
    id: "Casual Wear",
    title: "Casual Wear",
    description: "Effortless everyday cuts, streetwear drape, and modern denim.",
    options: [
      "T-Shirt + Jeans",
      "Polo + Chinos",
      "Oversized Fit",
      "Relaxed Fit",
      "Straight Fit",
      "Baggy Fit",
      "Cargo",
      "Denim",
      "Athleisure",
      "Streetwear",
      "Smart Casual",
    ],
    sampleSuggestions: {
      upperWear: [
        "Oversized black cotton T-shirt",
        "Heavyweight washed boxy white tee",
        "Olive green knit polo shirt",
        "Charcoal graphic-free oversized tee",
        "Relaxed waffle-knit long-sleeve henley",
      ],
      bottomWear: [
        "Baggy blue washed jeans",
        "Wide-leg carpenter denim",
        "Straight-fit beige cotton chinos",
        "Utility cargo pants in faded slate",
        "Relaxed vintage indigo denim",
      ],
      jackets: [
        "Black denim jacket (Optional)",
        "Brown suede trucker jacket (Optional)",
        "Washed olive utility bomber (Optional)",
        "Heavyweight canvas overshirt (Optional)",
      ],
      shoes: [
        "White retro court sneakers",
        "Chunky platform skate sneakers",
        "Minimalist leather low-tops",
        "Black suede slip-on mules",
      ],
    },
  },
  {
    id: "Business Professional",
    title: "Business Professional",
    description: "Sharp corporate suiting, executive tailoring, and formal trousers.",
    options: [
      "Formal Shirt + Trousers",
      "Blazer + Trousers",
      "Full Suit",
      "Three-Piece Suit",
      "Shirt + Chinos",
      "Structured Fit",
      "Straight Fit",
      "Relaxed Tailoring",
      "Business Casual",
    ],
    sampleSuggestions: {
      upperWear: [
        "Crisp white Egyptian cotton dress shirt",
        "Light blue spread-collar poplin shirt",
        "Fine-twill French cuff formal shirt",
        "Subtle micro-check business shirt",
      ],
      bottomWear: [
        "Black straight-fit formal wool trousers",
        "Charcoal double-pleated formal trousers",
        "Midnight navy tailored dress pants",
        "Taupe tailored chinos with center press",
      ],
      jackets: [
        "Navy relaxed-fit unstructured blazer (Optional)",
        "Charcoal structured two-button suit jacket (Optional)",
        "Single-breasted midnight blue wool blazer (Optional)",
      ],
      shoes: [
        "Hand-burnished black leather Oxford shoes",
        "Dark espresso leather penny loafers",
        "Polished cordovan monk-strap shoes",
        "Classic dark brown leather derbies",
      ],
    },
  },
  {
    id: "Western Wear",
    title: "Western Wear",
    description: "Contemporary silhouettes, layered outerwear, and minimal aesthetics.",
    options: [
      "Western Casual",
      "Denim",
      "Jackets + Jeans",
      "Layered Looks",
      "Cargo",
      "Western Formal",
      "Relaxed Fit",
      "Baggy Fit",
      "Modern Minimal",
    ],
    sampleSuggestions: {
      upperWear: [
        "Seamless boxy cotton crewneck",
        "Western denim button-down shirt",
        "Fine-gauge draped merino mockneck",
        "Minimalist camp-collar relaxed shirt",
      ],
      bottomWear: [
        "Raw selvedge straight-leg jeans",
        "Wide-leg pleated Western trousers",
        "Black tapered utility cargo pants",
        "Light-wash relaxed vintage denim",
      ],
      jackets: [
        "Brown vintage leather jacket (Optional)",
        "Raw indigo denim jacket (Optional)",
        "Minimalist wool-blend overshirt (Optional)",
      ],
      shoes: [
        "Chelsea boots in dark brown suede",
        "Chunky black leather combat boots",
        "Clean white minimalist leather sneakers",
        "Western-style almond-toe boots",
      ],
    },
  },
];

// ==========================================
// 2. FEMALE FASHION DATA (Strictly Female Options)
// ==========================================
export const FEMALE_FASHION_CATEGORIES: FashionCategoryConfig[] = [
  {
    id: "Traditional / Festive Wear",
    title: "Traditional / Festive Wear",
    description: "Exquisite sarees, lehengas, and timeless ethnic silhouettes.",
    options: [
      "Saree",
      "Lehenga",
      "Anarkali",
      "Salwar Suit",
      "Sharara",
      "Gharara",
      "Half Saree",
      "Churidar",
      "Traditional Fusion",
    ],
    sampleSuggestions: {
      upperWear: [
        "Embroidered silk blouse in deep crimson",
        "Gold zari woven sweetheart-neck choli",
        "Floor-length georgette anarkali kurta",
        "Pastel organza embroidered peplum kurti",
        "Banarasi silk tailored ethnic top",
      ],
      bottomWear: [
        "Flared raw silk lehenga skirt with gold cancan",
        "Pleated silk saree with pallu drape",
        "Wide-leg flared sharara pants",
        "Traditional silk churidar with gathers",
        "Gharara flared layered pants",
      ],
      jackets: [
        "Embroidered ethnic cape jacket (Optional)",
        "Long velvet jacket with zardozi work (Optional)",
        "Sheer organza long shrug (Optional)",
      ],
      shoes: [
        "Embroidered golden bridal juttis",
        "Metallic gold block-heel sandals",
        "Nude embellished strappy heels",
        "Handmade Kolhapuri wedge heels",
      ],
    },
  },
  {
    id: "Casual Wear",
    title: "Casual Wear",
    description: "Chic everyday comfort, streetwear drape, and versatile co-ords.",
    options: [
      "T-Shirt + Jeans",
      "Tops",
      "Oversized Fit",
      "Relaxed Fit",
      "Straight Fit",
      "Baggy Fit",
      "Cargo",
      "Skirts + Tops",
      "Denim",
      "Athleisure",
      "Streetwear",
      "Co-ords",
    ],
    sampleSuggestions: {
      upperWear: [
        "Oversized cotton graphic tee in vintage grey",
        "Ribbed knit halter top in bone white",
        "Boxy cropped crewneck t-shirt",
        "Fluid linen relaxed button-up shirt",
        "Cropped streetwear baby tee",
      ],
      bottomWear: [
        "High-waisted baggy blue wide-leg jeans",
        "Relaxed cargo pants in neutral stone",
        "Pleated A-line denim midi skirt",
        "High-rise straight-leg vintage denim",
        "Matching relaxed linen lounge pants",
      ],
      jackets: [
        "Cropped black denim jacket (Optional)",
        "Oversized washed utility bomber (Optional)",
        "Faux leather relaxed moto jacket (Optional)",
      ],
      shoes: [
        "Clean white platform court sneakers",
        "Retro chunky dad runners",
        "Minimalist leather slides",
        "Chunky lug-sole street loafers",
      ],
    },
  },
  {
    id: "Business Professional",
    title: "Business Professional",
    description: "Commanding corporate tailoring, executive blazers, and formal suiting.",
    options: [
      "Blazer + Trousers",
      "Formal Shirt + Trousers",
      "Blazer + Skirt",
      "Pantsuit",
      "Formal Dress",
      "Structured Tailoring",
      "Straight Fit",
      "Relaxed Tailoring",
      "Business Casual",
      "Professional Co-ords",
    ],
    sampleSuggestions: {
      upperWear: [
        "Crisp white silk crepe formal blouse",
        "Pointed-collar tailored button-down shirt",
        "Fine-knit sleeveless shell in ivory",
        "High-neck modal drape top in dove grey",
      ],
      bottomWear: [
        "High-waisted straight-fit formal trousers",
        "Wide-leg tailored wool trousers in charcoal",
        "Tailored pencil skirt with modest slit",
        "Pressed straight-leg navy suiting pants",
      ],
      jackets: [
        "Single-breasted navy tailored blazer (Optional)",
        "Structured black double-breasted pantsuit blazer (Optional)",
        "Oversized camel wool blazer (Optional)",
      ],
      shoes: [
        "Pointed-toe leather kitten heel pumps",
        "Polished black leather almond-toe loafers",
        "Nude block-heel court pumps",
        "Minimalist leather slingback heels",
      ],
    },
  },
  {
    id: "Western Wear",
    title: "Western Wear",
    description: "Modern dresses, clean co-ords, layered aesthetics, and sleek silhouettes.",
    options: [
      "Dresses",
      "Jumpsuits",
      "Skirts + Tops",
      "Jeans + Tops",
      "Co-ords",
      "Crop Tops",
      "Blazers",
      "Western Formal",
      "Layered Looks",
      "Modern Minimal",
    ],
    sampleSuggestions: {
      upperWear: [
        "Sculpted square-neck corset top in black",
        "Fluid draped cowl-neck silk blouse",
        "Minimalist rib-knit crop top",
        "Tailored vest top in warm taupe",
      ],
      bottomWear: [
        "High-rise wide-leg pleated palazzo trousers",
        "Satin slip midi skirt in champagne",
        "Tailored tailored flared denim",
        "Structured high-waist straight pants",
      ],
      jackets: [
        "Cropped black leather biker jacket (Optional)",
        "Relaxed tailored boyfriend blazer (Optional)",
        "Fluid lightweight trench coat (Optional)",
      ],
      shoes: [
        "Minimalist strappy stiletto heels",
        "Pointed-toe ankle boots in smooth leather",
        "Chunky platform leather loafers",
        "Sleek square-toe knee-high boots",
      ],
    },
  },
];

export function getCategoriesForGender(gender: Gender): FashionCategoryConfig[] {
  return gender === "female" ? FEMALE_FASHION_CATEGORIES : MALE_FASHION_CATEGORIES;
}

export function getCategoryConfig(
  gender: Gender,
  categoryId: MainCategory
): FashionCategoryConfig | undefined {
  const list = getCategoriesForGender(gender);
  return list.find((c) => c.id === categoryId);
}

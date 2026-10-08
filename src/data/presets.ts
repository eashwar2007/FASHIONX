import { PresetOutfit } from "../types";

export const PRESET_OUTFITS: PresetOutfit[] = [
  {
    id: "minimalist-loose",
    title: "Fluid Loose-Fit Formals & Fine Knit",
    aesthetic: "Quiet Luxury",
    occasion: "Smart Casual",
    weather: "Mild / Spring",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    description: "High-waisted fluid loose-fit formal pleated trousers in taupe wool drape, paired with a fine-gauge knit mockneck and leather Belgian loafers (clean silhouette with fluid tailoring).",
  },
  {
    id: "business-straight",
    title: "Executive Straight-Fit Business Suit",
    aesthetic: "Classic Tailored",
    occasion: "Business Professional",
    weather: "Cool / Autumn",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    description: "Tailored two-button navy suit with crisp straight-fit formal wool trousers, spread-collar shirt, and polished Oxford shoes (strictly straight-fit formals reserved for corporate business).",
  },
  {
    id: "streetwear-baggy",
    title: "Baggy Streetwear & Relaxed Denim",
    aesthetic: "Streetwear & Techwear",
    occasion: "Festival & Party",
    weather: "Cool / Autumn",
    imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    description: "Oversized washed utility bomber over relaxed baggy vintage carpenter jeans stacking cleanly over chunky retro court sneakers (proper clean baggy street silhouette).",
  },
  {
    id: "french-loose",
    title: "Fluid Duster & Loose Formal Pleats",
    aesthetic: "Clean Minimalist",
    occasion: "Date Night",
    weather: "Rainy / Overcast",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    description: "Unstructured lightweight draped duster over fluid double-pleated loose-fit formal trousers with sleek minimalist mules (no generic blazer and straight pants).",
  },
  {
    id: "summer-baggy-street",
    title: "Baggy Skater Denim & Boxy Street Cut",
    aesthetic: "Streetwear & Techwear",
    occasion: "Casual Street",
    weather: "Warm / Summer",
    imageUrl: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    description: "Boxy heavyweight washed tee with wide-leg baggy faded denim jeans pooling cleanly over platform sneakers with balanced volume.",
  },
  {
    id: "cocktail-loose",
    title: "Nocturne Loose-Fit Formal Trousers",
    aesthetic: "Old Money / Preppy",
    occasion: "Cocktail & Gala",
    weather: "Cold / Winter",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    description: "Fluid floor-grazing loose-fit formal wool trousers in obsidian, draped silk evening top, and polished low-profile almond-toe slippers.",
  },
];

export const OCCASIONS = [
  "Smart Casual",
  "Casual Street",
  "Date Night",
  "Business Professional",
  "Cocktail & Gala",
  "Wedding Guest",
  "Festival & Party",
  "Airport / Travel",
];

export const AESTHETICS = [
  "Quiet Luxury",
  "Clean Minimalist",
  "Old Money / Preppy",
  "Streetwear & Techwear",
  "Y2K Cyber",
  "Classic Tailored",
  "Dark Academia",
  "Bohemian Relaxed",
];

export const WEATHER_OPTIONS = [
  "Mild / Spring (15-22°C)",
  "Warm / Summer (23-35°C)",
  "Cool / Autumn (10-16°C)",
  "Cold / Winter (0-9°C)",
  "Rainy / Overcast",
];

export const FIT_PREFERENCES = [
  "Auto-Detect from Photo",
  "Masculine / Menswear Silhouette",
  "Feminine / Womenswear Silhouette",
  "Gender-Neutral / Oversized",
];

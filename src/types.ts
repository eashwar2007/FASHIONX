export type Gender = "male" | "female";

export type MainCategory =
  | "Traditional / Festive Wear"
  | "Casual Wear"
  | "Business Professional"
  | "Western Wear";

export interface UserOutfitInput {
  gender: Gender;
  category: MainCategory;
  subStyle?: string;
  upperWear: string;
  bottomWear: string;
  jacket?: string;
  shoes: string;
  additionalRequirement: string;
}

export interface GarmentSpecification {
  type: string;
  sleeves?: string;
  description: string;
}

export interface StructuredGarmentSet {
  upperWear: GarmentSpecification;
  bottomWear: GarmentSpecification;
  jacket?: GarmentSpecification | null;
  shoes: GarmentSpecification;
}

export interface StructuredOutfitRecommendation {
  id: string;
  name: string;
  styleDirection?: string;
  upperWear: string;
  bottomWear: string;
  jacket?: string;
  shoes: string;
  colors: ColorSwatch[];
  fabric?: string;
  occasion?: string;
  reason: string;
  stylingTips: string[];
  restyledImageUrl?: string;
  footwearVisibleInPhoto?: boolean;
  garmentDetails?: StructuredGarmentSet;
}

export interface AIStylistAnalysis {
  genderProfile: Gender;
  category: MainCategory;
  detectedStyle: string;
  recommendedColors: ColorSwatch[];
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface StylingRatings {
  colorHarmony: number;
  fitAndSilhouette: number;
  occasionAppropriateness: number;
  trendVersatility: number;
}

export interface ColorPaletteAnalysis {
  dominant: ColorSwatch[];
  accents: ColorSwatch[];
  harmonyType: string;
  notes: string;
}

export interface SwapUpgradeItem {
  item: string;
  replacement: string;
  reason: string;
}

export interface PairingRecommendation {
  category: "Shoes" | "Outerwear" | "Bags" | "Accessories" | "Jewelry" | string;
  name: string;
  color: string;
  stylingAdvice: string;
  shopTip: string;
}

export interface StyleVariations {
  dressUp: string;
  dressDown: string;
  weatherLayering: string;
}

export interface VisualUpgradeHotspot {
  area: string;
  title: string;
  description: string;
}

export interface VisualOutfitRecommendation {
  generatedImageUrl: string;
  referenceImageUrl?: string;
  transformationTitle: string;
  transformationSummary: string;
  upgradesApplied: string[];
  hotspots: VisualUpgradeHotspot[];
  generationStyle: "Tailored & Polished" | "Evening Transformation" | "Avant-Garde Luxury" | "Streetwear Elevated" | string;
  genderPresentation?: "male" | "female" | "androgynous";
}

export interface OutfitRecommendationItem {
  id: string;
  title: string;
  styleCategory: "loose-formal" | "baggy-streetwear" | "minimalist-drape" | "business-straight" | string;
  badge: string;
  imageUrl: string;
  referenceImageUrl?: string;
  isUserPhoto?: boolean;
  restyledImageUrl?: string;
  silhouetteDescription: string;
  whyItWorks: string;
  estimatedPrice?: string;
  pieces: {
    top: string;
    bottom: string;
    outerwear: string;
    footwear: string;
    accessories: string;
  };
  colorPalette: ColorSwatch[];
  stylingAdvice: string;
  keyRule: string;
  garmentDetails?: StructuredGarmentSet;
}

export interface SavedWardrobeOutfit {
  id: string;
  savedAt: string;
  recommendation: OutfitRecommendationItem;
  userNotes?: string;
}

export interface StylingAnalysis {
  score: number;
  vibeTitle: string;
  overallVerdict: string;
  ratings: StylingRatings;
  colorPalette: ColorPaletteAnalysis;
  keyPiecesIdentified: string[];
  whatWorksWell: string[];
  whatToSwapOrUpgrade: SwapUpgradeItem[];
  pairingRecommendations: PairingRecommendation[];
  styleVariations: StyleVariations;
  stylistProTip: string;
  visualRecommendation?: VisualOutfitRecommendation;
  recommendations?: OutfitRecommendationItem[];
  detectedGender?: "male" | "female" | "androgynous";
}

export interface PresetOutfit {
  id: string;
  title: string;
  aesthetic: string;
  occasion: string;
  weather: string;
  imageUrl: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "stylist";
  text: string;
  timestamp: string;
}

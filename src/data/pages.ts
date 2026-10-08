export interface PageDefinition {
  id: string;
  number: number;
  title: string;
  shortLabel: string;
  subtitle: string;
  badge?: string;
}

export const APP_PAGES: PageDefinition[] = [
  {
    id: "gender",
    number: 1,
    title: "Gender Selection",
    shortLabel: "Gender",
    subtitle: "Select Men's or Women's fashion profile",
  },
  {
    id: "category",
    number: 2,
    title: "Category Dashboard",
    shortLabel: "Category",
    subtitle: "Select styling category and aesthetic sub-styles",
  },
  {
    id: "outfit-input",
    number: 3,
    title: "Outfit Specification",
    shortLabel: "Outfit Input",
    subtitle: "Upload photo & specify upper, bottom, jacket & shoes",
  },
  {
    id: "recommendations",
    number: 4,
    title: "FASHIONX Recommendations",
    shortLabel: "AI Looks",
    subtitle: "3 bespoke looks & identity-locked virtual try-on",
  },
  {
    id: "wardrobe",
    number: 5,
    title: "My Wardrobe",
    shortLabel: "Wardrobe",
    subtitle: "Saved bespoke looks & capsule pieces",
  },
];

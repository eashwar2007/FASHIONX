import React, { useState } from "react";
import { Layers, Sparkles, Check, RefreshCw } from "lucide-react";

interface WardrobeItem {
  id: string;
  name: string;
  category: "outerwear" | "top" | "bottom" | "footwear";
  colorName: string;
  hex: string;
  aesthetic: string;
  icon: string;
}

const CAPSULE_CATALOG: Record<string, WardrobeItem[]> = {
  outerwear: [
    { id: "ow-1", name: "Oversized Wool Blazer", category: "outerwear", colorName: "Charcoal Slate", hex: "#2B2F3A", aesthetic: "Quiet Luxury", icon: "🧥" },
    { id: "ow-2", name: "Classic Trench Coat", category: "outerwear", colorName: "Camel Khaki", hex: "#C2A382", aesthetic: "Classic Tailored", icon: "🧥" },
    { id: "ow-3", name: "Boxy Leather Bomber", category: "outerwear", colorName: "Obsidian Black", hex: "#11141D", aesthetic: "Streetwear", icon: "🧥" },
    { id: "ow-4", name: "Merino Knit Cardigan", category: "outerwear", colorName: "Oatmeal Cream", hex: "#EAE6DF", aesthetic: "Minimalist", icon: "🧶" },
  ],
  top: [
    { id: "top-1", name: "Heavyweight Cotton Tee", category: "top", colorName: "Crisp Chalk White", hex: "#F8F8F6", aesthetic: "Clean Minimalist", icon: "👕" },
    { id: "top-2", name: "Silk Crepe Spread Collar", category: "top", colorName: "Sky Fog Blue", hex: "#9EB6CB", aesthetic: "Smart Casual", icon: "👔" },
    { id: "top-3", name: "Ribbed Mockneck Knit", category: "top", colorName: "Deep Espresso", hex: "#382923", aesthetic: "Quiet Luxury", icon: "🧶" },
    { id: "top-4", name: "Graphic Boxy Vintage Tee", category: "top", colorName: "Washed Graphite", hex: "#424754", aesthetic: "Streetwear", icon: "👕" },
  ],
  bottom: [
    { id: "bot-1", name: "High-Rise Pleated Trousers", category: "bottom", colorName: "Tonal Taupe", hex: "#8A847A", aesthetic: "Old Money", icon: "👖" },
    { id: "bot-2", name: "Straight-Leg Selvedge Denim", category: "bottom", colorName: "Raw Indigo", hex: "#202A44", aesthetic: "Clean Minimalist", icon: "👖" },
    { id: "bot-3", name: "Relaxed Wide Linen Pants", category: "bottom", colorName: "Sand Dune", hex: "#D6CEBE", aesthetic: "Bohemian Relaxed", icon: "👖" },
    { id: "bot-4", name: "Structured Carpenter Chino", category: "bottom", colorName: "Military Olive", hex: "#4B5340", aesthetic: "Streetwear", icon: "👖" },
  ],
  footwear: [
    { id: "fw-1", name: "Chunky Lug-Sole Loafers", category: "footwear", colorName: "Gloss Noir", hex: "#0E1118", aesthetic: "Quiet Luxury", icon: "👞" },
    { id: "fw-2", name: "Clean Retro Court Sneakers", category: "footwear", colorName: "Alabaster White", hex: "#F2EFEB", aesthetic: "Clean Minimalist", icon: "👟" },
    { id: "fw-3", name: "Burnished Leather Chelsea", category: "footwear", colorName: "Cognac Amber", hex: "#8C4A2F", aesthetic: "Classic Tailored", icon: "👢" },
    { id: "fw-4", name: "Technical Platform Runner", category: "footwear", colorName: "Silver Mist", hex: "#B4B9C4", aesthetic: "Streetwear", icon: "👟" },
  ],
};

export const WardrobeCapsule: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<{
    outerwear: WardrobeItem;
    top: WardrobeItem;
    bottom: WardrobeItem;
    footwear: WardrobeItem;
  }>({
    outerwear: CAPSULE_CATALOG.outerwear[0],
    top: CAPSULE_CATALOG.top[0],
    bottom: CAPSULE_CATALOG.bottom[1],
    footwear: CAPSULE_CATALOG.footwear[0],
  });

  const handleSelect = (category: keyof typeof selectedItems, item: WardrobeItem) => {
    setSelectedItems((prev) => ({ ...prev, [category]: item }));
  };

  const handleRandomize = () => {
    const random = (arr: WardrobeItem[]) => arr[Math.floor(Math.random() * arr.length)];
    setSelectedItems({
      outerwear: random(CAPSULE_CATALOG.outerwear),
      top: random(CAPSULE_CATALOG.top),
      bottom: random(CAPSULE_CATALOG.bottom),
      footwear: random(CAPSULE_CATALOG.footwear),
    });
  };

  // Calculate dynamic capsule cohesion score
  const selectedList: WardrobeItem[] = [
    selectedItems.outerwear,
    selectedItems.top,
    selectedItems.bottom,
    selectedItems.footwear,
  ];
  const aestheticCounts: Record<string, number> = {};
  selectedList.forEach((item) => {
    aestheticCounts[item.aesthetic] = (aestheticCounts[item.aesthetic] || 0) + 1;
  });
  const maxSameAesthetic = Math.max(...Object.values(aestheticCounts));
  const cohesionScore = 8.4 + (maxSameAesthetic >= 2 ? 0.8 : 0.3) + (maxSameAesthetic >= 3 ? 0.5 : 0);

  return (
    <section id="capsule" className="py-16 px-[5%] lg:px-[8%] border-t border-[#202536]/60 bg-[#080b14]">
      <div className="max-w-[1150px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171b2a] border border-[#262e43] text-xs text-[#c4b5fd] mb-2 font-medium">
              <Layers className="w-3.5 h-3.5" />
              <span>Modular Wardrobe Matrix</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Capsule Wardrobe Builder
            </h2>
            <p className="text-xs sm:text-sm text-[#9299ad] mt-1 max-w-xl">
              Mix and match foundational garments to test silhouette balance, tonal transitions, and capsule efficiency.
            </p>
          </div>

          <button
            onClick={handleRandomize}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold text-[#c4b5fd] bg-[#151b2c] border border-[#293047] hover:border-[#8b5cf6] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Shuffle Mix</span>
          </button>
        </div>

        {/* 2 Column: Left = Builder Deck, Right = Live Composite Mannequin & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Garment Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {(["outerwear", "top", "bottom", "footwear"] as const).map((category) => (
              <div
                key={category}
                className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider">
                  <span>{category} Layer</span>
                  <span className="text-[#8b5cf6] font-medium lowercase">
                    {selectedItems[category].name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CAPSULE_CATALOG[category].map((item) => {
                    const isSelected = selectedItems[category].id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(category, item)}
                        className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#181a2e] border-[#8b5cf6] shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                            : "bg-[#0c111d] border-[#202536] hover:border-[#38435d]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl">{item.icon}</span>
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-xs shrink-0"
                            style={{ backgroundColor: item.hex }}
                            title={item.colorName}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white truncate">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-[#7d859d] truncate">
                            {item.aesthetic}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#8b5cf6] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Live Look Assembly Visualizer (5 cols) */}
          <div className="lg:col-span-5 bg-[#101522] border border-[#242b3d] rounded-[24px] p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a78bfa] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Composite Ensemble
                </span>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {cohesionScore.toFixed(1)} / 10 Cohesion
                </div>
              </div>

              {/* Stacked Vertical Garment Anatomy Card */}
              <div className="space-y-3 bg-[#0c111d] border border-[#202536] rounded-2xl p-4 mb-5">
                {selectedList.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#13192b]/70 border border-[#242b3d]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-[10px] text-[#9299ad]">{item.colorName} • {item.aesthetic}</div>
                      </div>
                    </div>
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shadow-sm"
                      style={{ backgroundColor: item.hex }}
                    />
                  </div>
                ))}
              </div>

              {/* Color Stripe Bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex items-center justify-between text-[11px] text-[#9299ad]">
                  <span>Capsule Tonal Spread</span>
                  <span className="text-white font-mono">4 Coordinates</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex border border-white/10">
                  {selectedList.map((item, i) => (
                    <div
                      key={i}
                      className="h-full flex-1"
                      style={{ backgroundColor: item.hex }}
                      title={`${item.name} (${item.colorName})`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stylist Verdict for this Capsule */}
            <div className="p-4 rounded-xl bg-[#151b2c] border border-[#293047] text-xs text-[#aeb4c7] leading-relaxed">
              <span className="text-white font-semibold">Capsule Stylist Verdict: </span>
              {selectedItems.outerwear.name} provides architectural grounding, while the{" "}
              {selectedItems.bottom.name} in {selectedItems.bottom.colorName} ensures the silhouette maintains an elongated lower line.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

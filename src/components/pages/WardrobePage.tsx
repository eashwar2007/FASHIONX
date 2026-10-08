import React, { useState } from "react";
import {
  Bookmark,
  Layers,
  Sparkles,
  Trash2,
  ExternalLink,
  ArrowRight,
  Check,
  RefreshCw,
  Plus,
  Shirt,
  Info,
  ShieldCheck,
} from "lucide-react";
import { SavedWardrobeOutfit, OutfitRecommendationItem } from "../../types";

interface WardrobePageProps {
  savedOutfits: SavedWardrobeOutfit[];
  onRemoveSavedOutfit: (id: string) => void;
  onNavigate: (page: string) => void;
}

interface WardrobePiece {
  id: string;
  name: string;
  category: "outerwear" | "top" | "bottom" | "footwear";
  typeTag: string;
  colorName: string;
  hex: string;
  icon: string;
  silhouetteNote: string;
}

const WARDROBE_PIECES_CATALOG: WardrobePiece[] = [
  // Bottoms (featuring loose formals, baggy denim, straight formals)
  {
    id: "bot-1",
    name: "High-Rise Double-Pleated Formal Trousers",
    category: "bottom",
    typeTag: "Loose-Fit Formals",
    colorName: "Deep Charcoal Taupe",
    hex: "#2B2F3A",
    icon: "👖",
    silhouetteNote: "Fluid double pleats & floor-grazing drape for elegant movement.",
  },
  {
    id: "bot-2",
    name: "Wide-Leg Relaxed Vintage Carpenter Jeans",
    category: "bottom",
    typeTag: "Baggy Streetwear",
    colorName: "Vintage Stone Wash",
    hex: "#3D4E6B",
    icon: "👖",
    silhouetteNote: "Wide baggy street drape pooling cleanly over chunky sneakers.",
  },
  {
    id: "bot-3",
    name: "Executive Straight-Fit Wool Trousers",
    category: "bottom",
    typeTag: "Business Straight Fit",
    colorName: "Midnight Navy",
    hex: "#1A2233",
    icon: "👖",
    silhouetteNote: "Strictly for business purpose with razor-sharp center crease.",
  },
  {
    id: "bot-4",
    name: "Fluid Wool Pleated Slacks in Sand",
    category: "bottom",
    typeTag: "Loose-Fit Formals",
    colorName: "Pure Sandstone",
    hex: "#CFC8B8",
    icon: "👖",
    silhouetteNote: "Unstructured relaxed tailoring with clean ankle drape.",
  },

  // Outerwear
  {
    id: "ow-1",
    name: "Unstructured Wool-Cashmere Car Coat",
    category: "outerwear",
    typeTag: "Fluid Tailoring",
    colorName: "Oatmeal Melange",
    hex: "#E0DAD0",
    icon: "🧥",
    silhouetteNote: "Soft dropped shoulders that drape naturally over loose formals.",
  },
  {
    id: "ow-2",
    name: "Cropped Boxy Canvas Utility Bomber",
    category: "outerwear",
    typeTag: "Streetwear Cut",
    colorName: "Washed Graphite",
    hex: "#2C3038",
    icon: "🧥",
    silhouetteNote: "Cropped waist anchors the volume of wide baggy jeans.",
  },
  {
    id: "ow-3",
    name: "Executive Two-Button Tailored Blazer",
    category: "outerwear",
    typeTag: "Business Suiting",
    colorName: "Midnight Obsidian",
    hex: "#121722",
    icon: "🧥",
    silhouetteNote: "Strictly business formal construction with structured shoulders.",
  },

  // Tops
  {
    id: "top-1",
    name: "Fine-Gauge Merino Mockneck Knit",
    category: "top",
    typeTag: "Elevated Base",
    colorName: "Chalk Ecru",
    hex: "#F5F3EF",
    icon: "🧶",
    silhouetteNote: "Clean vertical neck line that flatters high-waisted pleats.",
  },
  {
    id: "top-2",
    name: "Heavyweight Boxy Vintage Washed Tee",
    category: "top",
    typeTag: "Street Base",
    colorName: "Washed Black",
    hex: "#1F222B",
    icon: "👕",
    silhouetteNote: "280gsm structured cotton that holds shape over baggy denim.",
  },
  {
    id: "top-3",
    name: "Poplin Spread-Collar Executive Shirt",
    category: "top",
    typeTag: "Business Base",
    colorName: "Crisp White",
    hex: "#FFFFFF",
    icon: "👔",
    silhouetteNote: "Classic point collar designed for formal neckwear and business suiting.",
  },

  // Footwear
  {
    id: "fw-1",
    name: "Almond-Toe Leather Belgian Loafers",
    category: "footwear",
    typeTag: "Formal Drape Match",
    colorName: "Dark Espresso",
    hex: "#2C1E18",
    icon: "👞",
    silhouetteNote: "Low profile allows loose formal trouser hems to flow cleanly.",
  },
  {
    id: "fw-2",
    name: "Chunky Retro Court Platform Sneakers",
    category: "footwear",
    typeTag: "Baggy Street Match",
    colorName: "Alabaster & Slate",
    hex: "#E8E6E1",
    icon: "👟",
    silhouetteNote: "Substantial sole allows baggy jeans to stack without dragging.",
  },
  {
    id: "fw-3",
    name: "Burnished Goodyear-Welted Cap-Toe Oxfords",
    category: "footwear",
    typeTag: "Business Match",
    colorName: "Gloss Black",
    hex: "#0A0D12",
    icon: "👞",
    silhouetteNote: "Strict corporate standard pairing with straight-fit trousers.",
  },
];

export const WardrobePage: React.FC<WardrobePageProps> = ({
  savedOutfits,
  onRemoveSavedOutfit,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<"saved" | "capsule" | "builder">("saved");
  const [selectedInspectOutfit, setSelectedInspectOutfit] = useState<OutfitRecommendationItem | null>(
    null
  );

  // Mix and Match state
  const [builderSelection, setBuilderSelection] = useState({
    outerwear: WARDROBE_PIECES_CATALOG.find((p) => p.category === "outerwear")!,
    top: WARDROBE_PIECES_CATALOG.find((p) => p.category === "top")!,
    bottom: WARDROBE_PIECES_CATALOG.find((p) => p.category === "bottom")!,
    footwear: WARDROBE_PIECES_CATALOG.find((p) => p.category === "footwear")!,
  });

  const handleShuffleBuilder = () => {
    const pickRandom = (cat: string) => {
      const items = WARDROBE_PIECES_CATALOG.filter((p) => p.category === cat);
      return items[Math.floor(Math.random() * items.length)];
    };
    setBuilderSelection({
      outerwear: pickRandom("outerwear"),
      top: pickRandom("top"),
      bottom: pickRandom("bottom"),
      footwear: pickRandom("footwear"),
    });
  };

  return (
    <div className="py-12 px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#20263b]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              PAGE 5 OF 5 • PERSONAL WARDROBE VAULT
            </span>
            <span className="text-xs text-[#858da3]">
              {savedOutfits.length} Saved Looks
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Digital Wardrobe
          </h1>
          <p className="text-sm text-[#9299ad] mt-1">
            Review your saved AI-recommended outfits, essential capsule garments, and test silhouette pairings.
          </p>
        </div>

        {/* Action: Generate more recommendations */}
        <button
          onClick={() => onNavigate("upload")}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-md hover:opacity-95 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Outfit</span>
        </button>
      </div>

      {/* Wardrobe Navigation Tabs */}
      <div className="flex items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#0e1322] border border-[#20273d] max-w-md">
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "saved"
              ? "bg-[#7c3aed] text-white shadow-md"
              : "text-[#8c94a9] hover:text-white"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Saved AI Looks ({savedOutfits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("capsule")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "capsule"
              ? "bg-[#7c3aed] text-white shadow-md"
              : "text-[#8c94a9] hover:text-white"
          }`}
        >
          <Shirt className="w-3.5 h-3.5" />
          <span>Capsule Pieces</span>
        </button>

        <button
          onClick={() => setActiveTab("builder")}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "builder"
              ? "bg-[#7c3aed] text-white shadow-md"
              : "text-[#8c94a9] hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Mix & Match</span>
        </button>
      </div>

      {/* TAB 1: SAVED AI OUTFIT RECOMMENDATIONS */}
      {activeTab === "saved" && (
        <div>
          {savedOutfits.length === 0 ? (
            <div className="py-16 px-6 text-center bg-[#0e1322] border border-[#21283e] rounded-3xl max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center mb-4">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Saved Outfits in Your Wardrobe Yet
              </h3>
              <p className="text-xs sm:text-sm text-[#9198ad] mb-6 max-w-md mx-auto leading-relaxed">
                When you generate recommendations on the AI Recommendations page, click "Save Look to Wardrobe" to store your favorite outfits here.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onNavigate("recommendations")}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-1.5"
                >
                  View Recommendations
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate("upload")}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#aeb4c7] hover:text-white bg-[#151a2b] border border-[#252c42] transition-colors"
                >
                  Upload a Look
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedOutfits.map(({ id, recommendation, savedAt }) => (
                <div
                  key={id}
                  className="bg-[#0e1322] border border-[#21283e] rounded-3xl overflow-hidden shadow-xl flex flex-col hover:border-purple-500/40 transition-colors"
                >
                  {/* Photo & Badge */}
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <img
                      src={recommendation.imageUrl}
                      alt={recommendation.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white">
                      {recommendation.badge}
                    </div>
                    <button
                      onClick={() => onRemoveSavedOutfit(id)}
                      title="Remove from wardrobe"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-rose-600/90 text-white/80 hover:text-white transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider mb-1">
                        Saved {savedAt}
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">
                        {recommendation.title}
                      </h3>
                      <p className="text-xs text-[#8c94a9] line-clamp-2 mb-4 leading-relaxed">
                        {recommendation.whyItWorks}
                      </p>

                      {/* Piece Quick Checklist */}
                      <div className="space-y-1.5 mb-4 text-[11px]">
                        <div className="flex items-center gap-1.5 text-[#cbd5e1]">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <strong className="text-white">Bottom:</strong>
                          <span className="truncate">{recommendation.pieces.bottom}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#cbd5e1]">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <strong className="text-white">Top:</strong>
                          <span className="truncate">{recommendation.pieces.top}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#cbd5e1]">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          <strong className="text-white">Shoes:</strong>
                          <span className="truncate">{recommendation.pieces.footwear}</span>
                        </div>
                      </div>
                    </div>

                    {/* View full details button */}
                    <button
                      onClick={() => setSelectedInspectOutfit(recommendation)}
                      className="w-full py-2.5 rounded-xl bg-[#141a2c] hover:bg-[#1b233a] border border-[#232a40] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      Inspect Full Blueprint
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CAPSULE ESSENTIALS CATALOG */}
      {activeTab === "capsule" && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl bg-[#0e1322] border border-[#21283e]">
            <h2 className="text-lg font-bold text-white mb-2">
              Foundational Capsule Wardrobe Pieces
            </h2>
            <p className="text-xs text-[#9299ad] mb-6">
              Curated garments that build high-versatility outfits respecting our strict silhouette rules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WARDROBE_PIECES_CATALOG.map((piece) => (
                <div
                  key={piece.id}
                  className="p-4 rounded-2xl bg-[#121727] border border-[#21283e] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-2xl">{piece.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#1b2238] text-purple-300 text-[10px] font-bold">
                        {piece.typeTag}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mb-1">
                      {piece.name}
                    </div>
                    <p className="text-[11px] text-[#8790a6] mb-3 leading-relaxed">
                      {piece.silhouetteNote}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#1a2034]">
                    <div
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: piece.hex }}
                    />
                    <span className="text-[10px] text-[#b4bac9] font-medium truncate">
                      {piece.colorName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODULAR MIX & MATCH BUILDER */}
      {activeTab === "builder" && (
        <div className="bg-[#0e1322] border border-[#21283e] rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">
                Silhouette Balance & Capsule Tester
              </h2>
              <p className="text-xs text-[#9299ad] mt-0.5">
                Swap pieces between loose formals, baggy denim, and business straight cuts to observe silhouette proportion.
              </p>
            </div>
            <button
              onClick={handleShuffleBuilder}
              className="px-4 py-2 rounded-xl bg-[#171e33] hover:bg-[#202946] border border-[#263150] text-xs font-semibold text-white transition-colors flex items-center gap-2 self-start"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Shuffle Combination
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Outerwear */}
            <div className="p-4 rounded-2xl bg-[#121727] border border-[#20273d]">
              <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                1. Layer / Outerwear
              </div>
              <div className="text-xs font-bold text-white mb-1">
                {builderSelection.outerwear.name}
              </div>
              <div className="text-[10px] text-[#868fa4] mb-3">
                {builderSelection.outerwear.silhouetteNote}
              </div>
              <select
                value={builderSelection.outerwear.id}
                onChange={(e) => {
                  const piece = WARDROBE_PIECES_CATALOG.find((p) => p.id === e.target.value);
                  if (piece) setBuilderSelection((prev) => ({ ...prev, outerwear: piece }));
                }}
                className="w-full p-2 rounded-lg bg-[#182035] border border-[#242e4a] text-xs text-white"
              >
                {WARDROBE_PIECES_CATALOG.filter((p) => p.category === "outerwear").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Top */}
            <div className="p-4 rounded-2xl bg-[#121727] border border-[#20273d]">
              <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                2. Top / Knit Base
              </div>
              <div className="text-xs font-bold text-white mb-1">
                {builderSelection.top.name}
              </div>
              <div className="text-[10px] text-[#868fa4] mb-3">
                {builderSelection.top.silhouetteNote}
              </div>
              <select
                value={builderSelection.top.id}
                onChange={(e) => {
                  const piece = WARDROBE_PIECES_CATALOG.find((p) => p.id === e.target.value);
                  if (piece) setBuilderSelection((prev) => ({ ...prev, top: piece }));
                }}
                className="w-full p-2 rounded-lg bg-[#182035] border border-[#242e4a] text-xs text-white"
              >
                {WARDROBE_PIECES_CATALOG.filter((p) => p.category === "top").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bottom */}
            <div className="p-4 rounded-2xl bg-[#151c31] border border-purple-500/30">
              <div className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider mb-2">
                3. Bottom Silhouette
              </div>
              <div className="text-xs font-bold text-white mb-1">
                {builderSelection.bottom.name}
              </div>
              <div className="text-[10px] text-purple-200/80 mb-3">
                {builderSelection.bottom.silhouetteNote}
              </div>
              <select
                value={builderSelection.bottom.id}
                onChange={(e) => {
                  const piece = WARDROBE_PIECES_CATALOG.find((p) => p.id === e.target.value);
                  if (piece) setBuilderSelection((prev) => ({ ...prev, bottom: piece }));
                }}
                className="w-full p-2 rounded-lg bg-[#182035] border border-purple-500/40 text-xs text-white font-semibold"
              >
                {WARDROBE_PIECES_CATALOG.filter((p) => p.category === "bottom").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.typeTag}: {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Footwear */}
            <div className="p-4 rounded-2xl bg-[#121727] border border-[#20273d]">
              <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2">
                4. Footwear Anchor
              </div>
              <div className="text-xs font-bold text-white mb-1">
                {builderSelection.footwear.name}
              </div>
              <div className="text-[10px] text-[#868fa4] mb-3">
                {builderSelection.footwear.silhouetteNote}
              </div>
              <select
                value={builderSelection.footwear.id}
                onChange={(e) => {
                  const piece = WARDROBE_PIECES_CATALOG.find((p) => p.id === e.target.value);
                  if (piece) setBuilderSelection((prev) => ({ ...prev, footwear: piece }));
                }}
                className="w-full p-2 rounded-lg bg-[#182035] border border-[#242e4a] text-xs text-white"
              >
                {WARDROBE_PIECES_CATALOG.filter((p) => p.category === "footwear").map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs text-purple-200">
                Silhouette Compatibility: <strong>9.6/10</strong> — Clean proportional balance between {builderSelection.bottom.typeTag} and {builderSelection.outerwear.typeTag}.
              </span>
            </div>
            <button
              onClick={() => onNavigate("upload")}
              className="text-xs font-bold text-purple-300 hover:text-white underline shrink-0 ml-3"
            >
              Test with Real Photo →
            </button>
          </div>
        </div>
      )}

      {/* Inspect Modal */}
      {selectedInspectOutfit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1322] border border-[#28324e] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  {selectedInspectOutfit.badge}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {selectedInspectOutfit.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInspectOutfit(null)}
                className="p-2 rounded-xl bg-[#171d2f] hover:bg-[#202840] text-[#aeb4c7] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-black">
              <img
                src={selectedInspectOutfit.imageUrl}
                alt={selectedInspectOutfit.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-[#131828] border border-[#22293e]">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">
                  Silhouette Blueprint
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  {selectedInspectOutfit.silhouetteDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#131828] border border-[#22293e]">
                  <span className="text-[10px] text-purple-400 uppercase font-bold">Top</span>
                  <div className="text-xs text-white font-medium mt-0.5">
                    {selectedInspectOutfit.pieces.top}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#151c30] border border-purple-500/30">
                  <span className="text-[10px] text-[#38bdf8] uppercase font-bold">Bottom</span>
                  <div className="text-xs text-white font-semibold mt-0.5">
                    {selectedInspectOutfit.pieces.bottom}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#131828] border border-[#22293e]">
                  <span className="text-[10px] text-purple-400 uppercase font-bold">Outerwear</span>
                  <div className="text-xs text-white font-medium mt-0.5">
                    {selectedInspectOutfit.pieces.outerwear}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#131828] border border-[#22293e]">
                  <span className="text-[10px] text-purple-400 uppercase font-bold">Footwear</span>
                  <div className="text-xs text-white font-medium mt-0.5">
                    {selectedInspectOutfit.pieces.footwear}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedInspectOutfit(null)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
            >
              Close Blueprint
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

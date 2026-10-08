import React, { useState, useRef } from "react";
import {
  Sparkles,
  Shirt,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Wand2,
  Palette,
  Layers,
  User,
  ShieldCheck,
} from "lucide-react";
import {
  Gender,
  MainCategory,
  UserOutfitInput,
  StructuredOutfitRecommendation,
  AIStylistAnalysis,
  OutfitRecommendationItem,
  SavedWardrobeOutfit,
} from "../../types";
import { VirtualTryOnViewer } from "../VirtualTryOnViewer";

interface RecommendationsPageProps {
  gender: Gender;
  category: MainCategory;
  userInput: UserOutfitInput | null;
  outfits: StructuredOutfitRecommendation[];
  recommendationItems: OutfitRecommendationItem[];
  analysisResult: AIStylistAnalysis | null;
  uploadedImage: string | null;
  onNavigate: (page: string) => void;
  savedOutfits: SavedWardrobeOutfit[];
  onToggleSaveOutfit: (outfit: OutfitRecommendationItem) => void;
  onChangeOutfitInputs: () => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  gender,
  category,
  userInput,
  outfits = [],
  recommendationItems = [],
  analysisResult,
  uploadedImage,
  onNavigate,
  savedOutfits,
  onToggleSaveOutfit,
  onChangeOutfitInputs,
}) => {
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>(
    outfits[0]?.id || recommendationItems[0]?.id || "rec-look-1"
  );
  const [tryOnTriggerTimestamp, setTryOnTriggerTimestamp] = useState<number>(Date.now());
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const tryOnSectionRef = useRef<HTMLDivElement>(null);

  // Active outfit item for VirtualTryOnViewer
  const activeRecItem =
    recommendationItems.find((r) => r.id === selectedOutfitId) ||
    recommendationItems[0] || {
      id: "rec-look-1",
      title: outfits[0]?.name || "Bespoke Curated Look",
      styleCategory: "loose-formal",
      badge: "Look 1",
      imageUrl: uploadedImage || "",
      isUserPhoto: true,
      silhouetteDescription: "",
      whyItWorks: outfits[0]?.reason || "",
      pieces: {
        top: outfits[0]?.upperWear || userInput?.upperWear || "",
        bottom: outfits[0]?.bottomWear || userInput?.bottomWear || "",
        outerwear: outfits[0]?.jacket || userInput?.jacket || "",
        footwear: outfits[0]?.shoes || userInput?.shoes || "",
        accessories: "Curated jewelry & accents",
      },
      colorPalette: outfits[0]?.colors || [],
      stylingAdvice: (outfits[0]?.stylingTips || []).join(" "),
      keyRule: "Identity Lock: Preserves original photograph.",
    };

  const handleTryThisLook = (outfitId: string) => {
    setSelectedOutfitId(outfitId);
    setTryOnTriggerTimestamp(Date.now());
    setTimeout(() => {
      tryOnSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleSave = (outfitItem: OutfitRecommendationItem) => {
    onToggleSaveOutfit(outfitItem);
    const isCurrentlySaved = savedOutfits.some((s) => s.recommendation.id === outfitItem.id);
    setSaveToast(
      isCurrentlySaved
        ? `Removed "${outfitItem.title}" from your Wardrobe`
        : `Saved "${outfitItem.title}" to your Wardrobe!`
    );
    setTimeout(() => setSaveToast(null), 3000);
  };

  // If no recommendations exist yet, prompt user to specify outfit
  if (outfits.length === 0 && recommendationItems.length === 0) {
    return (
      <div className="py-20 px-[5%] lg:px-[8%] max-w-[900px] mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1322] border border-[#232a3f] shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/25 text-purple-300 mx-auto flex items-center justify-center mb-5">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            No Recommendations Generated Yet
          </h2>
          <p className="text-[#8e96ac] text-sm sm:text-base max-w-md mx-auto mb-8">
            Upload your photo and specify your desired garments to receive 3 bespoke AI recommendations.
          </p>
          <button
            onClick={() => onNavigate("upload")}
            className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Shirt className="w-4 h-4" />
            <span>Specify Outfit Requirements</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
      {/* Toast feedback */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#151c2f] border border-purple-500/40 text-white text-sm shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Navigation & Profile Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#1c233a]">
        <div className="flex items-center gap-3">
          <button
            onClick={onChangeOutfitInputs}
            className="px-3 py-1.5 rounded-lg bg-[#141a2c] hover:bg-[#1d253f] text-[#a1a8be] hover:text-white border border-[#252f4c] text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Outfit Inputs</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-[#8c94ad]">
            <span className="capitalize font-semibold text-purple-300">{gender} Profile</span>
            <span>•</span>
            <span className="font-semibold text-white">{category}</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate("wardrobe")}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#151c2f] hover:bg-[#1f2942] border border-[#273250] transition-colors flex items-center gap-2"
        >
          <Bookmark className="w-3.5 h-3.5 text-purple-400" />
          <span>My Wardrobe ({savedOutfits.length})</span>
        </button>
      </div>

      {/* Header Required by Specification */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>FASHIONX AI RECOMMENDATIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          3 Bespoke Outfit Recommendations
        </h1>
        <p className="text-sm sm:text-base text-[#9299ad] mt-2">
          Tailored to your {gender} profile and requested garment choices. Click [ Try This Look ] to visualize directly on your photo.
        </p>

        {/* Footwear Detection & Completion Status Indicator */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#14192b] border border-[#232c4a] text-xs text-[#9aa4c0]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {userInput?.shoes?.trim()
              ? `Footwear Priority: Locked to user requested "${userInput.shoes}"`
              : "Footwear Analysis: AI automatically completed bespoke traditional footwear for each look"}
          </span>
        </div>
      </div>

      {/* 3 Outfit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {outfits.map((outfit, index) => {
          const recItem = recommendationItems[index] || activeRecItem;
          const isSelected = outfit.id === selectedOutfitId;
          const hasJacket = Boolean(outfit.jacket && outfit.jacket.trim().length > 0 && !outfit.jacket.toLowerCase().includes("none"));
          const styleDir = outfit.styleDirection || (index === 0 ? "Classic Traditional" : index === 1 ? "Festive Traditional / Opulent" : "Modern Traditional Fusion");
          const fabric = outfit.fabric || (index === 0 ? "Pure Mulberry Raw Silk & Fine Cotton" : index === 1 ? "Banarasi Chanderi Silk with Zari" : "Textured Linen-Silk Blend");
          const occasion = outfit.occasion || (index === 0 ? "Family Wedding, Sangeet, or Puja" : index === 1 ? "Grand Wedding Reception or Diwali Gala" : "Cocktail Party or Cultural Soiree");

          return (
            <div
              key={outfit.id || index}
              id={`fx-outfit-card-${index + 1}`}
              className={`relative bg-[#0e1322] border rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? "border-purple-500 ring-2 ring-purple-500/20 bg-[#10162a]"
                  : "border-[#21283e] hover:border-purple-500/50"
              }`}
            >
              <div>
                {/* Badge & Look Number */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 tracking-wider">
                      Recommendation {index + 1}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1b2238] text-[#a4afcf] border border-[#2b3554]">
                      {styleDir}
                    </span>
                  </div>
                  <button
                    onClick={() => handleSave(recItem)}
                    className="text-[#7d86a0] hover:text-purple-300 transition-colors p-1"
                    title="Save to Wardrobe"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        savedOutfits.some((s) => s.recommendation.id === recItem.id)
                          ? "fill-purple-400 text-purple-400"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Outfit Name */}
                <h3 className="text-lg sm:text-xl font-extrabold text-white mb-4 leading-snug">
                  {outfit.name}
                </h3>

                {/* Garments Specification List */}
                <div className="space-y-2.5 mb-5 p-4 rounded-2xl bg-[#080c16] border border-[#1c2237] text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                      1. Upper Wear
                    </span>
                    <span className="text-[#d5dbe9] font-medium leading-relaxed block">
                      {outfit.upperWear}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                      2. Bottom Wear
                    </span>
                    <span className="text-[#d5dbe9] font-medium leading-relaxed block">
                      {outfit.bottomWear}
                    </span>
                  </div>

                  {hasJacket && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                        3. Jacket / Outerwear
                      </span>
                      <span className="text-[#d5dbe9] font-medium leading-relaxed block">
                        {outfit.jacket}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                        4. Shoes
                      </span>
                      {userInput?.shoes?.trim() ? (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40">
                          User Specified
                        </span>
                      ) : (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                          AI Completed
                        </span>
                      )}
                    </div>
                    <span className="text-[#d5dbe9] font-medium leading-relaxed block">
                      {outfit.shoes}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                      5. Fabric / Material
                    </span>
                    <span className="text-[#c1c9dd] font-medium leading-relaxed block">
                      {fabric}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                      6. Occasion
                    </span>
                    <span className="text-[#c1c9dd] font-medium leading-relaxed block">
                      {occasion}
                    </span>
                  </div>
                </div>

                {/* Color Palette Swatches */}
                {outfit.colors && outfit.colors.length > 0 && (
                  <div className="mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737c97] block mb-2">
                      Harmonized Color Palette
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {outfit.colors.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#14192b] border border-[#21273f]"
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white/20 inline-block flex-shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span className="text-[11px] text-[#a6aec7] font-medium">
                            {c.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Why It Works */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#737c97] block mb-1">
                    Styling Explanation
                  </span>
                  <p className="text-xs text-[#9aa3bc] leading-relaxed">
                    {outfit.reason}
                  </p>
                </div>

                {/* Styling Tips */}
                {outfit.stylingTips && outfit.stylingTips.length > 0 && (
                  <div className="mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#737c97] block mb-1.5">
                      Styling Tips
                    </span>
                    <ul className="space-y-1.5">
                      {outfit.stylingTips.map((tip, tIdx) => (
                        <li
                          key={tIdx}
                          className="text-[11px] text-[#868fa6] flex items-start gap-1.5 leading-relaxed"
                        >
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* [ Try This Look ] Button */}
              <button
                id={`fx-try-look-btn-${index + 1}`}
                onClick={() => handleTryThisLook(outfit.id)}
                className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_4px_20px_rgba(147,51,234,0.4)]"
                    : "bg-[#181f36] hover:bg-purple-600 text-[#c7cee2] hover:text-white border border-[#2a3354] hover:border-purple-500"
                }`}
              >
                <Wand2 className="w-4 h-4" />
                <span>Try This Look</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Virtual Try-On Viewer Section */}
      <div ref={tryOnSectionRef} className="scroll-mt-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>STRICT IDENTITY LOCK • SAME PERSON GUARANTEED</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Virtual Try-On: {activeRecItem.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#8c94aa] mt-1.5">
            Your uploaded photograph is the permanent base image. Only the requested clothing is replaced using Cloudinary geometry preservation.
          </p>
        </div>

        {uploadedImage ? (
          <VirtualTryOnViewer
            userUploadedImage={uploadedImage}
            recommendation={activeRecItem}
            allRecommendations={recommendationItems}
            onSelectRecommendation={handleTryThisLook}
            onSaveOutfit={handleSave}
            isSaved={savedOutfits.some((s) => s.recommendation.id === activeRecItem.id)}
            tryOnTriggerTimestamp={tryOnTriggerTimestamp}
          />
        ) : (
          <div className="p-8 rounded-2xl bg-[#0e1322] border border-[#21283e] text-center">
            <p className="text-sm text-[#8c94aa]">
              Please upload a photo in the outfit specification screen to enable virtual try-on.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

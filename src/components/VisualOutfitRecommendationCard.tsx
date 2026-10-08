import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  Download,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Eye,
  Columns,
  Split,
  ChevronRight,
  X,
  Info,
  Loader2,
} from "lucide-react";
import { VisualOutfitRecommendation, StylingAnalysis } from "../types";

interface VisualOutfitRecommendationCardProps {
  visualRecommendation: VisualOutfitRecommendation;
  referenceImage: string | null;
  aesthetic: string;
  occasion: string;
  analysis: StylingAnalysis;
}

export const VisualOutfitRecommendationCard: React.FC<
  VisualOutfitRecommendationCardProps
> = ({
  visualRecommendation: initialVisual,
  referenceImage,
  aesthetic,
  occasion,
  analysis,
}) => {
  const [visual, setVisual] = useState<VisualOutfitRecommendation>(initialVisual);
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    initialVisual.genderPresentation === "female" ? "female" : "male"
  );
  const [viewMode, setViewMode] = useState<"side-by-side" | "slider" | "generated-only">("side-by-side");
  const [sliderPos, setSliderPos] = useState(50);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeStyleVariation, setActiveStyleVariation] = useState(
    visual.generationStyle || "Tailored & Polished"
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>(visual.generatedImageUrl);

  // Sync if initialVisual updates
  React.useEffect(() => {
    setVisual(initialVisual);
    if (initialVisual.genderPresentation) {
      setSelectedGender(initialVisual.genderPresentation === "female" ? "female" : "male");
    }
  }, [initialVisual]);

  const styleVariations = [
    {
      id: "Loose Fit Formals",
      label: "Loose-Fit Formals",
      desc: "Clean silhouette, fluid double-pleated loose formal trousers & unstructured drape (no generic blazers)",
    },
    {
      id: "Streetwear Elevated",
      label: "Baggy Streetwear & Jeans",
      desc: "Baggy outfit, wide-leg relaxed denim of any wash & clean layered streetwear silhouette",
    },
    {
      id: "Corporate Straight Fit",
      label: "Business Straight-Fit Formals",
      desc: "Strictly for business purpose: crisp straight-fit formal wool trousers & executive tailoring",
    },
    {
      id: "Evening Transformation",
      label: "Evening Loose Drape",
      desc: "Floor-grazing fluid loose formals, jewel or satin tones & low-profile dress footwear",
    },
  ];

  const triggerRegeneration = async (targetStyle: string, targetGender: "male" | "female") => {
    setIsRegenerating(true);
    try {
      const res = await fetch("/api/generate-outfit-visualization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: referenceImage,
          aesthetic,
          occasion,
          styleVariation: targetStyle,
          gender: targetGender,
          recommendations: {
            whatToSwapOrUpgrade: analysis.whatToSwapOrUpgrade,
            pairingRecommendations: analysis.pairingRecommendations,
          },
        }),
      });

      const data = await res.json();
      if (data.data) {
        setVisual(data.data);
      }
    } catch (err) {
      console.error("Failed to re-generate visual:", err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleStyleChange = async (styleId: string) => {
    if (isRegenerating || styleId === activeStyleVariation) return;
    setActiveStyleVariation(styleId);
    await triggerRegeneration(styleId, selectedGender);
  };

  const handleGenderSwitch = async (newGender: "male" | "female") => {
    if (isRegenerating || newGender === selectedGender) return;
    setSelectedGender(newGender);
    await triggerRegeneration(activeStyleVariation, newGender);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = visual.generatedImageUrl;
    a.download = `fashionx-ai-${selectedGender}-${activeStyleVariation.toLowerCase().replace(/[^a-z0-9]/g, "-")}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      id="visual-recommendation"
      className="bg-gradient-to-b from-[#13192b] via-[#101522] to-[#0c101d] border-2 border-[#8b5cf6]/40 hover:border-[#8b5cf6]/70 rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7c3aed]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#222b40]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1a38] border border-[#8b5cf6]/50 text-[#c4b5fd] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#a78bfa] animate-pulse" />
              <span>AI Visualized Transformation</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              selectedGender === "male"
                ? "bg-indigo-950/80 border-indigo-500/50 text-indigo-300"
                : "bg-pink-950/80 border-pink-500/50 text-pink-300"
            }`}>
              <span>{selectedGender === "male" ? "👔 Male Model Rendering" : "👗 Female Model Rendering"}</span>
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Visual Outfit Recommendation
          </h3>
          <p className="text-xs sm:text-sm text-[#9299ad] mt-1 max-w-2xl">
            AI has visually rendered your upgraded silhouette based on your uploaded photo, tailoring proportion, fabrics, and footwear to your subject.
          </p>
        </div>

        {/* Controls: Gender Switcher & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          {/* Gender Model Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#090d18] border border-[#242c42] rounded-xl">
            <button
              type="button"
              disabled={isRegenerating}
              onClick={() => handleGenderSwitch("male")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedGender === "male"
                  ? "bg-[#6366f1] text-white shadow-sm"
                  : "text-[#8e98b0] hover:text-white"
              }`}
              title="Render as Male Model"
            >
              <span>👔 Male</span>
            </button>
            <button
              type="button"
              disabled={isRegenerating}
              onClick={() => handleGenderSwitch("female")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                selectedGender === "female"
                  ? "bg-[#ec4899] text-white shadow-sm"
                  : "text-[#8e98b0] hover:text-white"
              }`}
              title="Render as Female Model"
            >
              <span>👗 Female</span>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#090d18] border border-[#242c42] rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode("side-by-side")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "side-by-side"
                  ? "bg-[#7c3aed] text-white shadow-sm"
                  : "text-[#8e98b0] hover:text-white"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("slider")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "slider"
                  ? "bg-[#7c3aed] text-white shadow-sm"
                  : "text-[#8e98b0] hover:text-white"
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("generated-only")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === "generated-only"
                  ? "bg-[#7c3aed] text-white shadow-sm"
                  : "text-[#8e98b0] hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Render</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Visual Canvas */}
      <div className="relative z-10 my-6">
        {isRegenerating && (
          <div className="absolute inset-0 bg-[#080c16]/80 backdrop-blur-md rounded-2xl z-30 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <Loader2 className="w-10 h-10 text-[#a78bfa] animate-spin mb-3" />
            <div className="text-base font-bold text-white">Re-synthesizing AI Transformation...</div>
            <div className="text-xs text-[#9299ad] mt-1 max-w-sm">
              Recalibrating geometry from reference photo into {activeStyleVariation} silhouette with updated fabric textures.
            </div>
          </div>
        )}

        {/* View Mode 1: SIDE-BY-SIDE */}
        {viewMode === "side-by-side" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Left: Original Reference Photo */}
            <div className="bg-[#090d18] border border-[#232b40] rounded-2xl overflow-hidden flex flex-col justify-between group">
              <div className="p-3.5 border-b border-[#1c2336] flex items-center justify-between text-xs">
                <span className="font-bold text-[#8e98b0] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Reference Photo (Uploaded)
                </span>
                <span className="text-[11px] text-[#5d6782]">Original Input</span>
              </div>
              <div className="relative aspect-[3/4] bg-[#0c111e] overflow-hidden flex items-center justify-center">
                {referenceImage ? (
                  <img
                    src={referenceImage}
                    alt="Original Outfit Reference"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-xs text-[#5d6782] p-4 text-center">
                    No reference image preview available
                  </div>
                )}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-white border border-white/10">
                  Before Transformation
                </div>
              </div>
              <div className="p-3.5 bg-[#0b0f1c] text-xs text-[#8e98b0] flex items-center justify-between border-t border-[#1c2336]">
                <span>Color palette base identified</span>
                <span className="text-[#a78bfa] font-medium">{analysis.colorPalette.harmonyType}</span>
              </div>
            </div>

            {/* Right: AI-Generated Upgraded Outfit */}
            <div className="bg-[#090d18] border-2 border-[#8b5cf6]/50 rounded-2xl overflow-hidden flex flex-col justify-between group shadow-[0_0_25px_rgba(139,92,246,0.15)]">
              <div className="p-3.5 border-b border-[#1c2336] flex items-center justify-between text-xs bg-gradient-to-r from-[#17142d] to-[#0d152a]">
                <span className="font-bold text-[#c4b5fd] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
                  AI Recommended Transformation
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Upgraded Look
                </span>
              </div>
              <div className="relative aspect-[3/4] bg-[#0c111e] overflow-hidden flex items-center justify-center">
                <img
                  src={visual.generatedImageUrl}
                  alt="AI Generated Outfit Recommendation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#7c3aed]/80 backdrop-blur-sm text-[11px] font-semibold text-white border border-white/20 shadow-md flex items-center gap-1.5">
                  <span>✨ {activeStyleVariation}</span>
                  <span className="text-white/40">•</span>
                  <span>{selectedGender === "male" ? "Male Model" : "Female Model"}</span>
                </div>

                {/* Floating Action Controls */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxImage(visual.generatedImageUrl);
                      setIsLightboxOpen(true);
                    }}
                    className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all shadow-md"
                    title="Zoom & Inspect"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all shadow-md"
                    title="Download Photo"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3.5 bg-[#0b0f1c] text-xs text-white flex items-center justify-between border-t border-[#1c2336]">
                <span className="text-[#aeb4c7] truncate">{visual.transformationTitle}</span>
                <span className="text-emerald-400 font-bold shrink-0 ml-2">Score: 9.8 / 10</span>
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: INTERACTIVE SPLIT SLIDER */}
        {viewMode === "slider" && referenceImage && (
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-[#8b5cf6]/50 shadow-2xl select-none group">
            {/* Background: AI Generated Upgraded Image */}
            <img
              src={visual.generatedImageUrl}
              alt="AI Transformed Outfit"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#7c3aed]/80 backdrop-blur-sm text-[11px] font-semibold text-white border border-white/20 z-10 pointer-events-none">
              AI Upgraded Render ({selectedGender === "male" ? "Male Model" : "Female Model"})
            </div>

            {/* Foreground: Original Image with Clip Path */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)` }}
            >
              <img
                src={referenceImage}
                alt="Original Outfit Reference"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-white border border-white/10 pointer-events-none">
                Original Reference
              </div>
            </div>

            {/* Slider Dividing Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-[#0f172a] shadow-lg flex items-center justify-center font-bold text-xs">
                ⇄
              </div>
            </div>

            {/* Range Input Overlay for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Before after comparison slider"
            />
          </div>
        )}

        {/* View Mode 3: FULL RENDER */}
        {viewMode === "generated-only" && (
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-[#8b5cf6]/50 shadow-2xl">
            <img
              src={visual.generatedImageUrl}
              alt="AI Outfit Render Full View"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between text-white text-xs">
              <div>
                <div className="font-bold text-sm">{visual.transformationTitle}</div>
                <div className="text-[#aeb4c7] text-xs line-clamp-1">{visual.transformationSummary}</div>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] font-semibold flex items-center gap-1.5 transition-all shrink-0 ml-3"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Style Variation Dials (Re-generate in Different Aesthetic Paradigms) */}
      <div className="mt-8 pt-6 border-t border-[#222b40]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#a78bfa]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Re-imagine in Alternative Style Modes
            </h4>
          </div>
          <span className="text-xs text-[#78829d]">
            Click any mode to transform reference photo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {styleVariations.map((v) => {
            const isSelected = activeStyleVariation === v.id;
            return (
              <button
                key={v.id}
                type="button"
                disabled={isRegenerating}
                onClick={() => handleStyleChange(v.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1f1a38] border-[#8b5cf6] ring-2 ring-[#8b5cf6]/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    : "bg-[#0d1220] border-[#222a3d] hover:border-[#38435d] hover:bg-[#121828]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{v.label}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#8e98b0] leading-snug">
                    {v.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#a78bfa] font-semibold">
                  <span>{isSelected ? "Active Look" : "Generate Render"}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Upgrade Anatomy Hotspots */}
      <div className="mt-8 pt-6 border-t border-[#222b40]">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-[#38bdf8]" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Key Visual Transformation Hotspots
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {visual.hotspots.map((hotspot, idx) => (
            <div
              key={idx}
              onClick={() => setActiveHotspot(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeHotspot === idx
                  ? "bg-[#151d30] border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  : "bg-[#0d1220] border-[#222a3d] hover:border-[#333e57]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1b2438] text-[#38bdf8] border border-[#2d3a54]">
                  0{idx + 1} • {hotspot.area}
                </span>
                {activeHotspot === idx && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                )}
              </div>
              <div className="text-xs font-bold text-white mb-1">{hotspot.title}</div>
              <p className="text-[11px] text-[#8e98b0] leading-relaxed">
                {hotspot.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stylist Transformation Summary Strip */}
      <div className="mt-6 p-4 rounded-xl bg-[#0a0e1a] border border-[#1f273b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#aeb4c7]">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#a78bfa] shrink-0" />
          <span>{visual.transformationSummary}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1a2236] hover:bg-[#25304a] border border-[#2d3a55] transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Look</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#0c111e] border border-[#2c374f] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#1f273b] flex items-center justify-between text-white text-xs bg-[#090d18]">
              <span className="font-bold">{visual.transformationTitle}</span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-[#8e98b0] hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto flex-1 flex items-center justify-center p-2 bg-black">
              <img
                src={lightboxImage}
                alt="AI Look Lightbox"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

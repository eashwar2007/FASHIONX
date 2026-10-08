import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  X,
  Sparkles,
  Loader2,
  ArrowRight,
  User,
  Crown,
  Coffee,
  Briefcase,
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Gender, MainCategory, UserOutfitInput, StructuredOutfitRecommendation, AIStylistAnalysis } from "../../types";
import { getCategoryConfig } from "../../data/fashionData";

interface OutfitInputPageProps {
  gender: Gender;
  category: MainCategory;
  initialSubStyle?: string;
  uploadedImage: string | null;
  onImageSelected: (imageSrc: string | null) => void;
  onAnalysisSuccess: (
    analysis: AIStylistAnalysis,
    outfits: StructuredOutfitRecommendation[],
    imageSrc: string,
    userInput: UserOutfitInput
  ) => void;
  onBackToCategory: () => void;
  onChangeGender: () => void;
}

export const OutfitInputPage: React.FC<OutfitInputPageProps> = ({
  gender,
  category,
  initialSubStyle,
  uploadedImage,
  onImageSelected,
  onAnalysisSuccess,
  onBackToCategory,
  onChangeGender,
}) => {
  const categoryConfig = getCategoryConfig(gender, category);
  const isMale = gender === "male";

  // Outfit requirement inputs start clean and empty; user can type freely or click suggestions below
  const [upperWear, setUpperWear] = useState<string>("");
  const [bottomWear, setBottomWear] = useState<string>("");
  const [jacket, setJacket] = useState<string>("");
  const [shoes, setShoes] = useState<string>("");
  const [additionalRequirement, setAdditionalRequirement] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Scanning photo contours...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file (JPEG, PNG, WEBP).");
      return;
    }
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-purple-500", "bg-purple-950/20");
    }
  };

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-purple-500", "bg-purple-950/20");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleDragLeave();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedImage) {
      setErrorMessage("Please upload your photo first so the AI can tailor the outfit to your exact person.");
      return;
    }
    if (!upperWear.trim()) {
      setErrorMessage("Please specify what Upper Wear you would like.");
      return;
    }
    if (!bottomWear.trim() && category !== "Traditional / Festive Wear") {
      setErrorMessage("Please specify what Bottom Wear you would like.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const steps = [
      "Analyzing uploaded photograph & posture...",
      `Locking ${gender.toUpperCase()} identity constraints...`,
      `Applying ${category} silhouette architecture...`,
      "Generating 3 bespoke AI recommendations...",
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % steps.length;
      setStatusMessage(steps[stepIdx]);
    }, 1100);

    const userInput: UserOutfitInput = {
      gender,
      category,
      subStyle: initialSubStyle,
      upperWear: upperWear.trim(),
      bottomWear: bottomWear.trim(),
      jacket: jacket.trim() ? jacket.trim() : undefined,
      shoes: shoes.trim(),
      additionalRequirement: additionalRequirement.trim(),
    };

    try {
      let base64Data = uploadedImage;
      let mimeType = "image/jpeg";

      if (uploadedImage.startsWith("http")) {
        try {
          const resp = await fetch(uploadedImage);
          const blob = await resp.blob();
          mimeType = blob.type || "image/jpeg";
          const reader = new FileReader();
          base64Data = await new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          console.warn("Using remote image URL directly");
        }
      }

      const res = await fetch("/api/ai-outfit-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          imageMimeType: mimeType,
          gender,
          category,
          subStyle: initialSubStyle,
          upperWear: userInput.upperWear,
          bottomWear: userInput.bottomWear,
          jacket: userInput.jacket || "",
          shoes: userInput.shoes,
          additionalRequirement: userInput.additionalRequirement,
        }),
      });

      const json = await res.json();
      if (json.success && json.outfits && json.outfits.length > 0) {
        onAnalysisSuccess(json.analysis, json.outfits, uploadedImage, userInput);
      } else {
        throw new Error(json.error || "Failed to generate recommendations");
      }
    } catch (err: any) {
      console.error("Styling recommendation error:", err);
      setErrorMessage(err?.message || "Failed to generate AI recommendations. Please check your inputs and try again.");
    } finally {
      clearInterval(interval);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
      {/* Top Breadcrumbs & Profile Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#1b2238]">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={onChangeGender}
            className="px-3 py-1.5 rounded-lg bg-[#141a2c] hover:bg-[#1d253f] text-[#a1a8be] hover:text-white border border-[#252f4c] font-semibold transition-colors flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span className="capitalize">{gender} Profile</span>
            <span className="text-[10px] text-[#6e7790]">(Change)</span>
          </button>
          <span className="text-[#4e556e]">/</span>
          <button
            onClick={onBackToCategory}
            className="px-3 py-1.5 rounded-lg bg-[#141a2c] hover:bg-[#1d253f] text-[#a1a8be] hover:text-white border border-[#252f4c] font-semibold transition-colors"
          >
            <span>{category}</span>
            <span className="text-[10px] text-[#6e7790] ml-1">(Change)</span>
          </button>
          {initialSubStyle && (
            <>
              <span className="text-[#4e556e]">/</span>
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold">
                {initialSubStyle}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>OUTFIT SPECIFICATION & PHOTO UPLOAD</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Customize Your {category}
        </h1>
        <p className="text-sm sm:text-base text-[#9299ad] mt-2">
          Upload your photo and specify your exact outfit pieces. The AI will preserve your identity and curate 3 bespoke recommendations.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo Upload */}
        <div className="lg:col-span-5 bg-[#0e1322] border border-[#21283e] rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-white">Your Photo</h2>
              <p className="text-xs text-[#8c94a9]">Base image for virtual try-on</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Identity Locked
            </span>
          </div>

          <div
            ref={dropZoneRef}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[340px] ${
              uploadedImage
                ? "border-emerald-500/50 bg-[#080c18]"
                : "border-[#2b3552] hover:border-purple-500/70 bg-[#090d1a]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadedImage ? (
              <div className="relative w-full h-full flex flex-col items-center">
                <div className="relative w-full max-h-[360px] rounded-xl overflow-hidden border border-[#2b3554] bg-black">
                  <img
                    src={uploadedImage}
                    alt="Uploaded base photograph"
                    className="w-full h-full max-h-[360px] object-contain mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Photo Ready • Identity will be preserved</span>
                </div>
                <p className="text-[11px] text-[#717992] mt-1">
                  Click to replace photo
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-4 shadow-inner">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <span className="text-base font-bold text-white mb-1">
                  Upload your full-body or half-body photo
                </span>
                <p className="text-xs text-[#828ba3] max-w-xs leading-relaxed mb-4">
                  Drag and drop or browse from your device. Your exact face, body, pose, and background are strictly preserved.
                </p>
                <span className="px-4 py-2 rounded-xl bg-[#171e33] border border-[#2b3554] text-xs font-semibold text-purple-300 hover:bg-purple-600 hover:text-white transition-colors">
                  Browse Photo
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-[#12172a] border border-[#202740] text-[11px] text-[#868ea5] leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Strict Identity Preservation:</span>
            Your uploaded photo remains the permanent base. Virtual try-on replaces ONLY the requested clothing using Cloudinary geometry locking.
          </div>
        </div>

        {/* Right Column: Outfit Inputs (Upper, Bottom, Optional Jacket, Shoes, Additional Requirement) */}
        <div className="lg:col-span-7 bg-[#0e1322] border border-[#21283e] rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-white">Outfit Requirements</h2>
            <p className="text-xs text-[#8c94a9]">
              Tell the AI what garments you want to wear
            </p>
          </div>

          {/* 1. UPPER WEAR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300">
                1. Upper Wear <span className="text-rose-400">*</span>
              </label>
              <span className="text-[11px] text-[#6d758c]">Shirt, T-Shirt, Kurta, Top</span>
            </div>
            <input
              type="text"
              id="fx-input-upper-wear"
              value={upperWear}
              onChange={(e) => setUpperWear(e.target.value)}
              placeholder="e.g., Oversized black T-shirt, White formal shirt, Navy blue kurta"
              className="w-full px-4 py-3 rounded-xl bg-[#14192b] border border-[#27304e] focus:border-purple-500 focus:outline-none text-white text-sm placeholder-[#5a627a]"
              required
            />
            {categoryConfig && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-[#6a7288] py-1">Suggestions:</span>
                {categoryConfig.sampleSuggestions.upperWear.slice(0, 6).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setUpperWear(item)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#161c30] hover:bg-[#202742] text-[#9fa7bf] hover:text-white border border-[#252c46] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. BOTTOM WEAR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300">
                2. Bottom Wear {category === "Traditional / Festive Wear" ? (
                  <span className="text-[#8892aa] font-normal text-[11px]">(Optional — Churidar, Dhoti, Pajama, or auto-selected)</span>
                ) : (
                  <span className="text-rose-400">*</span>
                )}
              </label>
              <span className="text-[11px] text-[#6d758c]">
                {category === "Traditional / Festive Wear" ? "Churidar, Pajama, Dhoti, Saree" : "Jeans, Trousers, Pajama, Skirt"}
              </span>
            </div>
            <input
              type="text"
              id="fx-input-bottom-wear"
              value={bottomWear}
              onChange={(e) => setBottomWear(e.target.value)}
              placeholder={category === "Traditional / Festive Wear" ? "e.g., White Churidar, Silk Dhoti, Ivory Pajama (or leave empty)" : "e.g., Baggy blue jeans, Black straight-fit trousers, White pajama"}
              className="w-full px-4 py-3 rounded-xl bg-[#14192b] border border-[#27304e] focus:border-purple-500 focus:outline-none text-white text-sm placeholder-[#5a627a]"
              required={category !== "Traditional / Festive Wear"}
            />
            {categoryConfig && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-[#6a7288] py-1">Suggestions:</span>
                {categoryConfig.sampleSuggestions.bottomWear.slice(0, 5).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setBottomWear(item)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#161c30] hover:bg-[#202742] text-[#9fa7bf] hover:text-white border border-[#252c46] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. JACKET (OPTIONAL) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#9ba4bd]">
                3. Jacket / Outerwear <span className="text-[#646c84] font-normal">(Optional)</span>
              </label>
              {jacket && (
                <button
                  type="button"
                  onClick={() => setJacket("")}
                  className="text-[11px] text-rose-400 hover:underline"
                >
                  Clear Jacket
                </button>
              )}
            </div>
            <input
              type="text"
              id="fx-input-jacket"
              value={jacket}
              onChange={(e) => setJacket(e.target.value)}
              placeholder="Optional: leave empty if no jacket desired (e.g. Nehru jacket, Blazer)"
              className="w-full px-4 py-3 rounded-xl bg-[#14192b] border border-[#27304e] focus:border-purple-500 focus:outline-none text-white text-sm placeholder-[#5a627a]"
            />
            <p className="text-[11px] text-[#6a7288]">
              Leave empty if you do not want a jacket. The AI will strictly honor this choice.
            </p>
            {categoryConfig && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-[#6a7288] py-1">Suggestions:</span>
                {categoryConfig.sampleSuggestions.jackets.slice(0, 3).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setJacket(item.replace(" (Optional)", ""))}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#161c30] hover:bg-[#202742] text-[#9fa7bf] hover:text-white border border-[#252c46] transition-colors"
                  >
                    {item.replace(" (Optional)", "")}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. SHOES */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300">
                4. Shoes <span className="text-[#8892aa] font-normal text-[11px]">(Optional — User specified has highest priority, or auto-completed by AI)</span>
              </label>
              <span className="text-[11px] text-[#6d758c]">
                {category === "Traditional / Festive Wear" ? "Mojari, Jutti, Kolhapuri, Flats" : "Sneakers, Loafers, Formal"}
              </span>
            </div>
            <input
              type="text"
              id="fx-input-shoes"
              value={shoes}
              onChange={(e) => setShoes(e.target.value)}
              placeholder={category === "Traditional / Festive Wear" ? "Optional: e.g. Brown mojari, Black juttis, or leave empty for AI recommendation" : "e.g., White sneakers, Black loafers, Formal shoes"}
              className="w-full px-4 py-3 rounded-xl bg-[#14192b] border border-[#27304e] focus:border-purple-500 focus:outline-none text-white text-sm placeholder-[#5a627a]"
            />
            {categoryConfig && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-[#6a7288] py-1">Suggestions:</span>
                {categoryConfig.sampleSuggestions.shoes.slice(0, 3).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setShoes(item)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#161c30] hover:bg-[#202742] text-[#9fa7bf] hover:text-white border border-[#252c46] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. ADDITIONAL REQUIREMENT */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#9ba4bd] block">
                5. Additional Requirement
              </label>
              {additionalRequirement && (
                <button
                  type="button"
                  onClick={() => setAdditionalRequirement("")}
                  className="text-[11px] text-[#7d87a2] hover:text-purple-300 transition-colors"
                >
                  Clear text
                </button>
              )}
            </div>
            <textarea
              id="fx-input-additional-req"
              rows={2}
              value={additionalRequirement}
              onChange={(e) => setAdditionalRequirement(e.target.value)}
              placeholder="e.g., Maroon silk kurtha with same bottom wear, or pick a suggestion below..."
              className="w-full px-4 py-3 rounded-xl bg-[#14192b] border border-[#27304e] focus:border-purple-500 focus:outline-none text-white text-sm placeholder-[#5a627a] resize-none"
            />
            {/* Suggestions under the text box */}
            <div className="pt-1">
              <div className="text-[11px] font-semibold text-[#8b95b2] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Suggested Requirements (click to add):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Maroon silk kurtha with same bottom wear",
                  "Short kurtha with matching churidar",
                  "Tone-on-tone embroidery with Nehru vest",
                  "Dark rich festive color palette",
                  "Clean minimalist drape and silhouettes",
                  "Grand celebration wedding guest aesthetic",
                ].map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => {
                      setAdditionalRequirement((prev) =>
                        prev ? `${prev.trim().replace(/\.$/, "")}, ${sug}` : sug
                      );
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#14192c] hover:bg-[#212946] text-[#a4adcb] hover:text-white border border-[#252f4c] hover:border-purple-500/40 transition-all cursor-pointer text-left"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#6a7288] pt-1">
              The AI incorporates this requirement into all 3 recommendations while keeping bottom wear consistent.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="fx-generate-recommendations-btn"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-extrabold text-white text-base shadow-[0_4px_25px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-3 cursor-pointer ${
              isSubmitting
                ? "bg-purple-900/60 cursor-not-allowed text-purple-300"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_4px_30px_rgba(124,58,237,0.6)] active:scale-[0.99]"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-purple-300" />
                <span>{statusMessage}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate AI Recommendations</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

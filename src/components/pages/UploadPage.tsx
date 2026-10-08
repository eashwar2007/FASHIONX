import React, { useState, useRef } from "react";
import {
  UploadCloud,
  Camera,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  Layers,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { OCCASIONS, AESTHETICS, WEATHER_OPTIONS, FIT_PREFERENCES, PRESET_OUTFITS } from "../../data/presets";
import { StylingAnalysis, PresetOutfit } from "../../types";

interface UploadPageProps {
  uploadedImage: string | null;
  onImageSelected: (imageSrc: string | null) => void;
  onAnalysisSuccess: (result: StylingAnalysis, imageSrc: string) => void;
  onNavigate: (page: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({
  uploadedImage,
  onImageSelected,
  onAnalysisSuccess,
  onNavigate,
}) => {
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [aesthetic, setAesthetic] = useState(AESTHETICS[0]);
  const [weather, setWeather] = useState(WEATHER_OPTIONS[0]);
  const [genderFit, setGenderFit] = useState(FIT_PREFERENCES[0]);
  const [userNotes, setUserNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState("Analyzing color harmony & balance...");
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
      dropZoneRef.current.classList.add("border-purple-500", "bg-purple-950/15");
    }
  };

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-purple-500", "bg-purple-950/15");
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

  const handleSelectPreset = (preset: PresetOutfit) => {
    onImageSelected(preset.imageUrl);
    setOccasion(preset.occasion);
    setAesthetic(preset.aesthetic);
    setWeather(preset.weather);
  };

  const handleSubmitAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImage) {
      setErrorMessage("Please upload your outfit photo or pick a sample look first.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    const steps = [
      "Scanning outfit contours and silhouette proportions...",
      "Analyzing tonal values, color harmony & contrast matrix...",
      "Calculating fit ratings and tailoring break points...",
      "Formulating 4 complete bespoke AI outfit recommendations...",
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setAnalysisProgress(steps[stepIndex]);
    }, 1100);

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

      const res = await fetch("/api/analyze-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          imageMimeType: mimeType,
          occasion,
          aesthetic,
          weather,
          genderFit,
          userNotes,
        }),
      });

      const json = await res.json();
      if (json.data) {
        onAnalysisSuccess(json.data, uploadedImage);
        // Automatically route to Rating page with toast
        onNavigate("rating");
      } else {
        throw new Error(json.error || "Failed to analyze outfit");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Stylist engine encountered a brief hiccup. Please try again.");
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="py-12 px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <UploadCloud className="w-3.5 h-3.5" />
          PAGE 2 OF 5 • IMAGE UPLOAD & SILHOUETTE CONTEXT
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Upload Your Outfit Photo
        </h1>
        <p className="text-sm sm:text-base text-[#9299ad] mt-2 leading-relaxed">
          Provide your look and preferences. Our AI evaluates silhouette lines and generates multiple bespoke outfit recommendations.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between max-w-2xl mx-auto">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmitAnalysis} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Image Upload Card */}
        <div className="lg:col-span-6 bg-[#0e1322] border border-[#21283e] rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" />
              Outfit Photo
            </h2>
            {uploadedImage && (
              <button
                type="button"
                onClick={handleClearImage}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear Photo
              </button>
            )}
          </div>

          {/* Drag & Drop Zone */}
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden min-h-[360px] flex flex-col items-center justify-center p-6 text-center ${
              uploadedImage
                ? "border-purple-500/40 bg-black/40"
                : "border-[#28324a] bg-[#121727] hover:border-purple-500/60 hover:bg-[#151c30]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {uploadedImage ? (
              <div className="relative w-full h-[360px] rounded-xl overflow-hidden group">
                <img
                  src={uploadedImage}
                  alt="Outfit Preview"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                  <Camera className="w-8 h-8 text-white mb-2" />
                  <span className="text-sm font-semibold text-white">
                    Click to change photo
                  </span>
                  <span className="text-xs text-white/70 mt-1">or drag & drop a new image</span>
                </div>
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Evaluation
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[#a78bfa] flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  Drag & drop your outfit photo
                </h3>
                <p className="text-xs text-[#8c94a9] mb-4">
                  Full-body mirror selfie, flat lay, or mannequin snapshot (JPEG, PNG, WEBP)
                </p>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-[#1d2438] hover:bg-[#252e46] border border-[#2d3752] text-xs font-semibold text-white transition-colors"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Quick Presets for Demo / Instant Testing */}
          <div className="mt-6 pt-5 border-t border-[#1e253a]">
            <div className="text-xs font-semibold text-[#8b92a6] uppercase tracking-wider mb-3">
              Or pick an inspiration look to test:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_OUTFITS.slice(0, 3).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="p-2 rounded-xl bg-[#131828] hover:bg-[#1a2136] border border-[#21293e] text-left transition-colors flex items-center gap-2 group"
                >
                  <img
                    src={preset.imageUrl}
                    alt={preset.title}
                    className="w-8 h-8 rounded-lg object-cover object-top shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-white truncate group-hover:text-purple-300">
                      {preset.aesthetic}
                    </div>
                    <div className="text-[9px] text-[#788096] truncate">
                      {preset.occasion}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Styling Context & Submission */}
        <div className="lg:col-span-6 bg-[#0e1322] border border-[#21283e] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Styling Context & Preferences
          </h2>

          {/* Occasion */}
          <div>
            <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
              Target Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#131828] border border-[#22293e] text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              {OCCASIONS.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Aesthetic */}
          <div>
            <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
              Desired Aesthetic Direction
            </label>
            <select
              value={aesthetic}
              onChange={(e) => setAesthetic(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#131828] border border-[#22293e] text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            >
              {AESTHETICS.map((aes) => (
                <option key={aes} value={aes}>
                  {aes}
                </option>
              ))}
            </select>
          </div>

          {/* Weather & Season */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                Weather / Season
              </label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#131828] border border-[#22293e] text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {WEATHER_OPTIONS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender / Cut */}
            <div>
              <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                Silhouette Cut
              </label>
              <select
                value={genderFit}
                onChange={(e) => setGenderFit(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#131828] border border-[#22293e] text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              >
                {FIT_PREFERENCES.map((fit) => (
                  <option key={fit} value={fit}>
                    {fit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
              Specific Goals or Notes (Optional)
            </label>
            <textarea
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="e.g., 'Looking for loose formal pants with great drape' or 'Prefer baggy skater denim'..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#131828] border border-[#22293e] text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 placeholder:text-[#676f84]"
            />
          </div>

          {/* Silhouette Architecture Callout */}
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 text-purple-200">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
              Stylist Silhouette Standards
            </div>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              We apply proper, clean silhouettes: <strong>Loose-Fit Formals</strong> with fluid trousers for elevated occasions, <strong>Baggy Streetwear & Jeans</strong> for relaxed looks, and <strong>Straight-Fit Formals</strong> strictly for business.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAnalyzing || !uploadedImage}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_25px_rgba(124,58,237,0.45)] hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-base"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>{analysisProgress}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-white" />
                <span>Analyze Outfit & Generate Recommendations</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

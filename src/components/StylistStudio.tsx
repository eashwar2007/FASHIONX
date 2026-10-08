import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  HelpCircle,
  Wand2,
} from "lucide-react";
import { OCCASIONS, AESTHETICS, WEATHER_OPTIONS, FIT_PREFERENCES, PRESET_OUTFITS } from "../data/presets";
import { StylingAnalysis, PresetOutfit } from "../types";
import { AnalysisResults } from "./AnalysisResults";

interface StylistStudioProps {
  selectedPreset?: PresetOutfit | null;
}

export const StylistStudio: React.FC<StylistStudioProps> = ({ selectedPreset }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(
    selectedPreset?.imageUrl || PRESET_OUTFITS[0].imageUrl
  );
  const [occasion, setOccasion] = useState(selectedPreset?.occasion || OCCASIONS[0]);
  const [aesthetic, setAesthetic] = useState(selectedPreset?.aesthetic || AESTHETICS[0]);
  const [weather, setWeather] = useState(selectedPreset?.weather || WEATHER_OPTIONS[0]);
  const [genderFit, setGenderFit] = useState(FIT_PREFERENCES[0]);
  const [userNotes, setUserNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<StylingAnalysis | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState("Analyzing color harmony & balance...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Sync if preset changes from Lookbook
  React.useEffect(() => {
    if (selectedPreset) {
      setImageSrc(selectedPreset.imageUrl);
      setOccasion(selectedPreset.occasion);
      setAesthetic(selectedPreset.aesthetic);
      setWeather(selectedPreset.weather);
      setAnalysisResult(null);
    }
  }, [selectedPreset]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file (JPEG, PNG, WEBP).");
      return;
    }
    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add("border-[#8b5cf6]");
    }
  };

  const handleDragLeave = () => {
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove("border-[#8b5cf6]");
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

  const handleSelectPreset = (preset: PresetOutfit) => {
    setImageSrc(preset.imageUrl);
    setOccasion(preset.occasion);
    setAesthetic(preset.aesthetic);
    setWeather(preset.weather);
    setAnalysisResult(null);
  };

  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageSrc(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageSrc) {
      setErrorMessage("Please upload a photo or select an outfit preset first.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    // Progress step animations
    const steps = [
      "Extracting garment contours and silhouettes...",
      "Analyzing color harmony, tonal values & contrasts...",
      "Evaluating occasion appropriateness & tailoring balance...",
      "Curating footwear, outerwear & jewelry pairings...",
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setAnalysisProgress(steps[stepIndex]);
    }, 1200);

    try {
      // Determine if imageSrc is already a base64 or URL
      let base64Data = imageSrc;
      let mimeType = "image/jpeg";

      if (imageSrc.startsWith("http")) {
        // Fetch and convert image to base64 for Gemini vision
        try {
          const resp = await fetch(imageSrc);
          const blob = await resp.blob();
          mimeType = blob.type || "image/jpeg";
          const reader = new FileReader();
          base64Data = await new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        } catch (e) {
          console.warn("Could not fetch remote image to base64, passing URL context");
        }
      }

      const res = await fetch("/api/analyze-outfit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        setAnalysisResult(json.data);
        // Smooth scroll to results
        setTimeout(() => {
          const el = document.getElementById("results");
          el?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        throw new Error(json.error || "Failed to analyze outfit");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage("Stylist engine encountered a hiccup. Please try again.");
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="stylist" className="py-16 px-[5%] lg:px-[8%] relative">
      <div className="max-w-[1150px] mx-auto">
        <h2 className="text-3xl sm:text-[34px] font-extrabold text-center mb-3 tracking-tight text-white">
          AI Outfit Analysis & Recommendation
        </h2>
        <p className="text-center text-[#9299ad] text-sm sm:text-base mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload your look, choose your occasion, and let our AI curate the perfect ensemble with instant color theory and bespoke accessory pairings.
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="text-rose-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* The 2-Column Stylist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px]">
          
          {/* Left Card: Upload & Preview */}
          <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-6 sm:p-[25px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#8b5cf6]" />
                  <span>Outfit Photo</span>
                </h3>
                {imageSrc && (
                  <button
                    onClick={handleClearImage}
                    className="text-xs text-[#9299ad] hover:text-rose-400 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear Image</span>
                  </button>
                )}
              </div>

              {/* Upload Drop Area */}
              <div
                ref={dropZoneRef}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="h-[280px] border-2 border-dashed border-[#3c4560] hover:border-[#8b5cf6] rounded-[18px] flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden bg-[#0c111d] transition-all relative group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {imageSrc ? (
                  <div className="w-full h-full relative group/img">
                    <img
                      id="preview"
                      src={imageSrc}
                      alt="Outfit Preview"
                      className="w-full h-full object-cover block"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                      <Camera className="w-8 h-8 text-[#a78bfa]" />
                      <span className="text-xs font-semibold">Click or Drop to Replace Photo</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-[#151b2c] border border-[#293047] flex items-center justify-center text-[#8b5cf6] mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7" />
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">
                      Drop your outfit photo here
                    </div>
                    <p className="text-xs text-[#9299ad] max-w-[240px]">
                      Supports full outfits, tops, jackets, dresses, or flat-lays (PNG, JPG, WEBP)
                    </p>
                  </div>
                )}
              </div>

              {/* Pre-styled Quick Selectors */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-[#aeb4c7] mb-2.5 font-medium">
                  <span>Or test with a pre-styled outfit:</span>
                  <span className="text-[11px] text-[#8b5cf6]">Click to load</span>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {PRESET_OUTFITS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`relative aspect-square rounded-xl overflow-hidden border transition-all ${
                        imageSrc === preset.imageUrl
                          ? "border-[#8b5cf6] ring-2 ring-[#8b5cf6]/40 scale-105"
                          : "border-[#242b3d] hover:border-[#3c4560] opacity-80 hover:opacity-100"
                      }`}
                      title={preset.title}
                    >
                      <img
                        src={preset.imageUrl}
                        alt={preset.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1d2334] flex items-center justify-between text-xs text-[#78829d]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Multi-garment Detection</span>
              </span>
              <span className="text-[#aeb4c7] font-mono text-[11px]">FASHIONX-v2</span>
            </div>
          </div>

          {/* Right Card: Styling Preferences Form */}
          <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-6 sm:p-[25px] flex flex-col justify-between">
            <form onSubmit={handleAnalyze} className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>Styling Context & Goals</span>
                </h3>

                {/* Form Group: Target Occasion */}
                <div className="form-group">
                  <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                    Target Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c111d] border border-[#242b3d] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8b5cf6] cursor-pointer"
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Group: Desired Aesthetic */}
                <div className="form-group">
                  <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                    Aesthetic / Vibe
                  </label>
                  <select
                    value={aesthetic}
                    onChange={(e) => setAesthetic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c111d] border border-[#242b3d] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8b5cf6] cursor-pointer"
                  >
                    {AESTHETICS.map((aes) => (
                      <option key={aes} value={aes}>
                        {aes}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Group: Gender / Fit Preference */}
                <div className="form-group">
                  <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Target Gender / Silhouette</span>
                    <span className="text-[11px] text-[#8b5cf6] font-normal">
                      Matches generated photo
                    </span>
                  </label>
                  <select
                    value={genderFit}
                    onChange={(e) => setGenderFit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c111d] border border-[#242b3d] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8b5cf6] cursor-pointer"
                  >
                    {FIT_PREFERENCES.map((fit) => (
                      <option key={fit} value={fit}>
                        {fit}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Group: Weather / Climate */}
                <div className="form-group">
                  <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                    Weather / Climate
                  </label>
                  <select
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c111d] border border-[#242b3d] text-white text-xs sm:text-sm focus:outline-none focus:border-[#8b5cf6] cursor-pointer"
                  >
                    {WEATHER_OPTIONS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form Group: Specific Styling Question */}
                <div className="form-group">
                  <label className="block text-xs font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Specific Question (Optional)</span>
                    <span className="text-[11px] text-[#7d859d] lowercase font-normal">
                      e.g. shoes, jewelry, jacket
                    </span>
                  </label>
                  <input
                    type="text"
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="e.g. What footwear and jacket go best with this?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c111d] border border-[#242b3d] text-white text-xs sm:text-sm placeholder-[#5a627a] focus:outline-none focus:border-[#8b5cf6]"
                  />
                </div>
              </div>

              {/* Action button */}
              <div className="mt-6 pt-4 border-t border-[#1d2334]">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full py-3.5 px-6 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_10px_30px_#4f46e533] hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(79,70,229,0.4)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{analysisProgress}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#c4b5fd]" />
                      <span>Analyze Outfit with AI Stylist</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Deep Analysis Results Display */}
        {analysisResult && (
          <AnalysisResults
            analysis={analysisResult}
            uploadedImage={imageSrc}
            occasion={occasion}
            aesthetic={aesthetic}
          />
        )}
      </div>
    </section>
  );
};

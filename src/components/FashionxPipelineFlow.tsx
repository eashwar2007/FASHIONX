import React from "react";
import {
  Camera,
  Cpu,
  Sparkles,
  MousePointerClick,
  Wand2,
  UserCheck,
  Split,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface FashionxPipelineFlowProps {
  currentStage?: "upload" | "analysis" | "recommendations" | "select" | "tryon" | "result";
  userUploadedImage?: string | null;
  activeLookTitle?: string;
}

export const FashionxPipelineFlow: React.FC<FashionxPipelineFlowProps> = ({
  currentStage = "tryon",
  userUploadedImage,
  activeLookTitle = "Selected Outfit",
}) => {
  const steps = [
    {
      id: "upload",
      number: "01",
      title: "Upload Photo",
      subtitle: "Person's source photo",
      icon: Camera,
      badge: userUploadedImage ? "Source Active" : "Waiting",
      isComplete: Boolean(userUploadedImage),
      isActive: currentStage === "upload",
    },
    {
      id: "analysis",
      number: "02",
      title: "Gemini Vision",
      subtitle: "Understand photo + request",
      icon: Cpu,
      badge: "Proportions & Cut",
      isComplete: true,
      isActive: currentStage === "analysis",
    },
    {
      id: "recommendations",
      number: "03",
      title: "Outfit Recommendations",
      subtitle: "Curated 4 silhouettes",
      icon: Sparkles,
      badge: "4 Looks Ready",
      isComplete: true,
      isActive: currentStage === "recommendations",
    },
    {
      id: "select",
      number: "04",
      title: 'Click "Try This Look"',
      subtitle: "User selects outfit",
      icon: MousePointerClick,
      badge: activeLookTitle,
      isComplete: true,
      isActive: currentStage === "select" || currentStage === "tryon",
    },
    {
      id: "tryon",
      number: "05",
      title: "Virtual Try-On AI",
      subtitle: "AI edits ORIGINAL photo",
      icon: Wand2,
      badge: "Image-to-Image",
      isComplete: true,
      isActive: currentStage === "tryon",
    },
    {
      id: "result",
      number: "06",
      title: "Original Person + New Outfit",
      subtitle: "Same face, body & background",
      icon: UserCheck,
      badge: "Zero Model Swap",
      isComplete: true,
      isActive: true,
    },
    {
      id: "slider",
      number: "07",
      title: "Before / After Slider",
      subtitle: "Interactive wipe comparison",
      icon: Split,
      badge: "Instant Comparison",
      isComplete: true,
      isActive: true,
    },
  ];

  return (
    <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#0e1322] to-[#090d18] border border-[#232b42] shadow-2xl relative overflow-hidden mb-8">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#1c2237]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-md">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400">
                FASHIONX VIRTUAL TRY-ON PIPELINE
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                ✓ Identity Preserved
              </span>
            </div>
            <p className="text-xs text-[#8d95ab]">
              The uploaded photo is the source image. Clothes are generated directly on the <strong className="text-white">same person</strong> without model replacement.
            </p>
          </div>
        </div>

        {userUploadedImage && (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-[#14192b] px-3 py-1.5 rounded-xl border border-[#252d45]">
            <img
              src={userUploadedImage}
              alt="Source"
              className="w-6 h-6 rounded-md object-cover object-top border border-white/20"
            />
            <div className="text-[11px] font-medium text-white/90">
              Source Photo Active
            </div>
          </div>
        )}
      </div>

      {/* Horizontal / Grid Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-3 rounded-2xl relative transition-all border flex flex-col justify-between ${
                step.isActive
                  ? "bg-[#151c32] border-purple-500/60 shadow-[0_0_15px_rgba(139,92,246,0.2)] ring-1 ring-purple-500/40"
                  : "bg-[#0d1120] border-[#1d2439] opacity-90"
              }`}
            >
              {/* Step number and badge */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-black text-purple-400 font-mono">
                  {step.number}
                </span>
                {step.isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>

              {/* Icon & Title */}
              <div>
                <div className="w-7 h-7 rounded-lg bg-[#182035] border border-[#27324e] flex items-center justify-center text-purple-300 mb-2">
                  <StepIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-[#868ea5] mt-1 leading-snug line-clamp-2">
                  {step.subtitle}
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-2.5 pt-2 border-t border-[#1a2135]">
                <span className="text-[9px] font-semibold text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40 truncate block text-center">
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

interface HeroProps {
  onStartStyling: () => void;
  onExploreLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartStyling, onExploreLookbook }) => {
  return (
    <div className="relative min-h-[520px] flex flex-col lg:flex-row items-center justify-between px-[6%] lg:px-[8%] py-16 bg-[radial-gradient(circle_at_80%_40%,#35206b55,transparent_35%),radial-gradient(circle_at_20%_30%,#164e6350,transparent_30%)] border-b border-[#202536]/60 overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Left Content */}
      <div className="max-w-[640px] z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#6d45c6] rounded-[30px] text-[#c4b5fd] mb-5 text-[13px] font-medium bg-[#151226]/60 backdrop-blur-sm shadow-[0_0_20px_rgba(109,69,198,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#a78bfa] animate-spin" style={{ animationDuration: "6s" }} />
          <span>Next-Gen AI Wardrobe Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold leading-[1.05] mb-5 tracking-tight">
          Your AI Personal{" "}
          <span className="bg-gradient-to-r from-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent">
            Stylist & Wardrobe
          </span>{" "}
          Guide
        </h1>

        <p className="text-[#aeb4c7] leading-[1.7] text-[16px] sm:text-[17px] mb-8 max-w-[560px]">
          Elevate your daily presence. Upload any outfit or garment to receive instant high-fashion critique, color harmony scoring, occasion adaptability, and tailored accessory pairings in seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
          <button
            onClick={onStartStyling}
            className="px-6 py-3.5 rounded-[12px] text-white font-bold text-[15px] bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_10px_30px_#4f46e533] hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(79,70,229,0.45)] active:translate-y-0 transition-all flex items-center gap-2.5 group"
          >
            <span>Style My Outfit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreLookbook}
            className="px-6 py-3.5 rounded-[12px] text-[#c4b5fd] font-semibold text-[15px] border border-[#293047] hover:border-[#8b5cf6]/60 bg-[#101522]/80 hover:bg-[#151b2c] transition-all flex items-center gap-2"
          >
            <span>Explore Lookbook</span>
          </button>
        </div>

        {/* Value props pill badges */}
        <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#9299ad]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Computer Vision Color Theory</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#a78bfa]" />
            <span>Occasion Appropriateness Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#38bdf8]" />
            <span>Trend & Proportion Balance</span>
          </div>
        </div>
      </div>

      {/* Hero Card Visual (Right) */}
      <div className="mt-12 lg:mt-0 z-10 flex justify-center">
        <div className="relative group">
          {/* Ambient rim glow behind the card */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#7c3aed]/40 to-[#38bdf8]/40 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

          <div className="w-[330px] sm:w-[350px] h-[410px] rounded-[28px] border border-[#293047] bg-gradient-to-br from-[#151b2c] via-[#101522] to-[#0c101b] p-6 flex flex-col justify-between shadow-[0_20px_80px_#0008] relative overflow-hidden">
            
            {/* Top row of card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">
                  Live AI Stylist
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                9.4 Score
              </div>
            </div>

            {/* Visual outfit illustration / image showcase */}
            <div className="relative my-auto w-full h-[200px] rounded-2xl overflow-hidden border border-[#242b3d] bg-[#0c111d] flex items-center justify-center group/img">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80"
                alt="Curated look"
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1b] via-transparent to-transparent" />
              
              {/* Floating tag inside card */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-medium text-white px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
                  Quiet Luxury Silhouette
                </span>
                <span className="text-[11px] text-[#c4b5fd] font-mono">
                  Smart Casual
                </span>
              </div>
            </div>

            {/* Bottom mini breakdown */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#aeb4c7]">
                <span>Color Harmony Palette</span>
                <span className="text-white font-medium">96% Cohesion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-[#242b3d] overflow-hidden flex">
                  <div className="h-full w-[40%] bg-[#2B2F3A]" title="Midnight Slate" />
                  <div className="h-full w-[25%] bg-[#EAE6DF]" title="Ecru Cashmere" />
                  <div className="h-full w-[20%] bg-[#8C4A2F]" title="Cognac Leather" />
                  <div className="h-full w-[15%] bg-[#38BDF8]" title="Sky Cyan Accent" />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[#9299ad]">
                <span>Outerwear: Structured Lapel</span>
                <span className="text-emerald-400 font-semibold">Ready to Style</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

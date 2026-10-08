import React, { useState } from "react";
import { Sparkles, ArrowUpRight, Compass, Filter } from "lucide-react";
import { PRESET_OUTFITS } from "../data/presets";
import { PresetOutfit } from "../types";

interface LookbookGalleryProps {
  onSelectLook: (preset: PresetOutfit) => void;
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({ onSelectLook }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Quiet Luxury", "Clean Minimalist", "Streetwear & Techwear", "Classic Tailored", "Bohemian Relaxed"];

  const filteredLooks =
    activeFilter === "All"
      ? PRESET_OUTFITS
      : PRESET_OUTFITS.filter((item) => item.aesthetic === activeFilter);

  return (
    <section id="lookbook" className="py-16 px-[5%] lg:px-[8%] border-t border-[#202536]/60 bg-[#080b14]">
      <div className="max-w-[1150px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171b2a] border border-[#262e43] text-xs text-[#a78bfa] mb-2 font-medium">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Inspiration</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Inspiration Lookbook
            </h2>
            <p className="text-xs sm:text-sm text-[#9299ad] mt-1 max-w-xl">
              Explore trend-forward silhouettes curated by fashion directors. Click any look to examine its anatomy and run AI styling diagnostics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === cat
                    ? "bg-[#7c3aed] border-[#7c3aed] text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                    : "bg-[#101522] border-[#242b3d] text-[#aeb4c7] hover:text-white hover:border-[#38435d]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Lookbook items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLooks.map((look) => (
            <div
              key={look.id}
              className="group bg-[#101522] border border-[#242b3d] hover:border-[#8b5cf6]/50 rounded-[22px] overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0c111d]">
                <img
                  src={look.imageUrl}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101522] via-transparent to-transparent opacity-80" />

                {/* Floating tags */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-white px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {look.aesthetic}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono text-[#c4b5fd] text-[11px] bg-[#1a132e]/80 px-2 py-0.5 rounded border border-[#4c3182]">
                    {look.occasion}
                  </span>
                  <span className="text-[11px] text-[#9299ad]">
                    {look.weather}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#a78bfa] transition-colors">
                    {look.title}
                  </h3>
                  <p className="text-xs text-[#9299ad] leading-relaxed line-clamp-2 mb-4">
                    {look.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectLook(look);
                    const el = document.getElementById("stylist");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#151b2c] hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#2563eb] border border-[#293047] hover:border-transparent transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#a78bfa]" />
                  <span>Send to Stylist Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

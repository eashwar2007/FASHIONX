import React from "react";
import {
  Sparkles,
  UploadCloud,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Compass,
  Bookmark,
  TrendingUp,
} from "lucide-react";
import { LookbookGallery } from "../LookbookGallery";

interface InterfacePageProps {
  onNavigate: (page: string) => void;
  hasAnalysis: boolean;
  savedCount: number;
}

export const InterfacePage: React.FC<InterfacePageProps> = ({
  onNavigate,
  hasAnalysis,
  savedCount,
}) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="px-[5%] lg:px-[8%] max-w-[1250px] mx-auto text-center pt-8 sm:pt-14 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>PAGE 1 OF 5 • FASHIONX SILHOUETTE BLUEPRINT</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
          Architect Clean Silhouettes. <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
            Elevate Every Outfit.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-[#9da5bc] max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload any outfit photo to evaluate your proportion lines, receive a comprehensive styling scorecard, and unlock multiple bespoke AI recommendations tailored to our strict silhouette architecture.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onNavigate("upload")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_25px_rgba(124,58,237,0.4)] hover:opacity-95 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-base"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Upload Outfit to Start</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          {hasAnalysis ? (
            <button
              onClick={() => onNavigate("recommendations")}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-purple-300 hover:text-white bg-[#141a2c] hover:bg-[#1c243c] border border-[#28314e] transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>View Your 4 Recommendations</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate("wardrobe")}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-[#aeb4c7] hover:text-white bg-[#121626] hover:bg-[#192036] border border-[#22293e] transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Bookmark className="w-4 h-4 text-purple-400" />
              <span>Wardrobe Vault ({savedCount})</span>
            </button>
          )}
        </div>
      </section>

      {/* The 4 Silhouette Pillars Showcase */}
      <section className="px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Design Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Strict Silhouette Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#8f96aa] mt-1.5">
            Every style demands an intentional silhouette cut rather than generic defaults.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Loose-Fit Formals */}
          <div className="p-6 rounded-3xl bg-[#0e1322] border border-[#21283e] relative overflow-hidden flex flex-col justify-between">
            <div className="h-44 rounded-2xl overflow-hidden mb-5 bg-black border border-[#232b42]">
              <img
                src="/generated-looks/male_loose_formal_1789627829940.jpg"
                alt="Loose-Fit Formals"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                Elevated & Formal
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">
                Loose-Fit Formals & Drape
              </h3>
              <p className="text-xs text-[#8f97ab] leading-relaxed">
                High-rise double-pleated wool trousers and fluid drape coats. Replaces generic blazers & straight pants with effortless statuesque volume.
              </p>
            </div>
          </div>

          {/* Pillar 2: Baggy Streetwear & Jeans */}
          <div className="p-6 rounded-3xl bg-[#0e1322] border border-[#21283e] relative overflow-hidden flex flex-col justify-between">
            <div className="h-44 rounded-2xl overflow-hidden mb-5 bg-black border border-[#232b42]">
              <img
                src="/generated-looks/male_street_baggy_1789627797964.jpg"
                alt="Baggy Streetwear"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                Streetwear & Casual
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">
                Baggy Outfits & Relaxed Jeans
              </h3>
              <p className="text-xs text-[#8f97ab] leading-relaxed">
                Authentic wide-leg denim (carpenter, skater, or vintage raw) pooling cleanly over chunky court sneakers, anchored by a boxy cropped top.
              </p>
            </div>
          </div>

          {/* Pillar 3: Business Straight-Fit Formals */}
          <div className="p-6 rounded-3xl bg-[#0e1322] border border-[#21283e] relative overflow-hidden flex flex-col justify-between">
            <div className="h-44 rounded-2xl overflow-hidden mb-5 bg-black border border-[#232b42]">
              <img
                src="/generated-looks/male_business_suit_1789627869775.jpg"
                alt="Business Straight Suiting"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                Corporate Authority
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">
                Straight-Fit Business Formals
              </h3>
              <p className="text-xs text-[#8f97ab] leading-relaxed">
                Crisp razor-creased straight wool trousers strictly reserved for corporate boardroom presentations, executive meetings, and business purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Page User Journey */}
      <section className="px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e1322] border border-[#21283e]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Interactive Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Four Dedicated Stylist Pages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1: Upload */}
            <div
              onClick={() => onNavigate("upload")}
              className="p-5 rounded-2xl bg-[#121727] hover:bg-[#171d31] border border-[#20273d] hover:border-purple-500/50 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wide mb-1">
                Page 1 • Upload
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Upload Outfit Photo</h4>
              <p className="text-xs text-[#8c94a9]">
                Provide your photo, occasion, aesthetic, and weather context.
              </p>
            </div>

            {/* Step 2: Rating */}
            <div
              onClick={() => onNavigate("rating")}
              className="p-5 rounded-2xl bg-[#121727] hover:bg-[#171d31] border border-[#20273d] hover:border-purple-500/50 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1">
                Page 2 • Rating
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Score & Analysis</h4>
              <p className="text-xs text-[#8c94a9]">
                Evaluate silhouette contours, color harmony, and stylist upgrades.
              </p>
            </div>

            {/* Step 3: Recommendations */}
            <div
              onClick={() => onNavigate("recommendations")}
              className="p-5 rounded-2xl bg-[#121727] hover:bg-[#171d31] border border-[#20273d] hover:border-purple-500/50 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-sky-400 uppercase tracking-wide mb-1">
                Page 3 • Recommendations
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Multiple AI Looks</h4>
              <p className="text-xs text-[#8c94a9]">
                Explore 4 complete outfits: Loose Formals, Baggy Jeans, and more.
              </p>
            </div>

            {/* Step 4: Wardrobe */}
            <div
              onClick={() => onNavigate("wardrobe")}
              className="p-5 rounded-2xl bg-[#121727] hover:bg-[#171d31] border border-[#20273d] hover:border-purple-500/50 cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Bookmark className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                Page 4 • Wardrobe
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Personal Wardrobe</h4>
              <p className="text-xs text-[#8c94a9]">
                Save looks, manage capsule essentials, and test mix-and-match pieces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Gallery */}
      <section className="px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
        <LookbookGallery />
      </section>

      {/* Bottom CTA */}
      <section className="px-[5%] lg:px-[8%] max-w-[1000px] mx-auto text-center pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1b1535] via-[#101933] to-[#0f1d2e] border border-purple-500/30 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Ready to Perfect Your Outfit?
          </h2>
          <p className="text-xs sm:text-sm text-[#a5aebd] max-w-lg mx-auto mb-6">
            Upload your photo to test our strict silhouette engine and get 4 complete recommended looks.
          </p>
          <button
            onClick={() => onNavigate("upload")}
            className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_25px_rgba(124,58,237,0.4)] hover:opacity-95 transition-all inline-flex items-center gap-2"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Go to Upload Page</span>
          </button>
        </div>
      </section>
    </div>
  );
};

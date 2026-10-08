import React from "react";
import { User, Sparkles } from "lucide-react";
import { Gender } from "../types";

interface GenderSelectionScreenProps {
  onSelectGender: (gender: Gender) => void;
}

export const GenderSelectionScreen: React.FC<GenderSelectionScreenProps> = ({
  onSelectGender,
}) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl text-center">
        {/* Brand Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>FASHIONX</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          FASHIONX
        </h1>

        <p className="text-lg sm:text-xl font-medium text-purple-300/90 mt-2 tracking-wide">
          AI Personal Stylist
        </p>

        <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto my-6 rounded-full" />

        <p className="text-sm sm:text-base text-[#9aa3be] max-w-md mx-auto mb-10 leading-relaxed font-normal">
          Choose your fashion profile
        </p>

        {/* Gender Selection Cards / Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md mx-auto">
          {/* Male Profile Selection */}
          <button
            id="fx-select-male-btn"
            onClick={() => onSelectGender("male")}
            className="group relative p-6 sm:p-7 rounded-2xl bg-[#0e1322] border border-[#20273f] hover:border-purple-500/80 hover:bg-[#131a30] transition-all duration-200 shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] flex flex-col items-center text-center cursor-pointer active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200 mb-4 shadow-inner">
              <User className="w-7 h-7" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-white tracking-wide group-hover:text-purple-200">
              Male
            </span>
            <span className="text-xs text-[#828ba3] mt-1 group-hover:text-[#a5b0cb]">
              Menswear Profile & Tailoring
            </span>
            <div className="mt-4 px-4 py-2 rounded-xl bg-[#171f36] border border-[#2b3554] text-xs font-bold text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-colors w-full">
              Select Male
            </div>
          </button>

          {/* Female Profile Selection */}
          <button
            id="fx-select-female-btn"
            onClick={() => onSelectGender("female")}
            className="group relative p-6 sm:p-7 rounded-2xl bg-[#0e1322] border border-[#20273f] hover:border-purple-500/80 hover:bg-[#131a30] transition-all duration-200 shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] flex flex-col items-center text-center cursor-pointer active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-200 mb-4 shadow-inner">
              <User className="w-7 h-7" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold text-white tracking-wide group-hover:text-purple-200">
              Female
            </span>
            <span className="text-xs text-[#828ba3] mt-1 group-hover:text-[#a5b0cb]">
              Womenswear Profile & Styling
            </span>
            <div className="mt-4 px-4 py-2 rounded-xl bg-[#171f36] border border-[#2b3554] text-xs font-bold text-white group-hover:bg-purple-600 group-hover:border-purple-500 transition-colors w-full">
              Select Female
            </div>
          </button>
        </div>

        {/* Reassurance Footer */}
        <p className="text-[11px] text-[#6d758d] mt-8">
          Strict Gender Lock • Clothes are tailored exclusively to your selected fashion profile.
        </p>
      </div>
    </div>
  );
};

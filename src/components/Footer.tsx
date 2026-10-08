import React from "react";
import { Shirt, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#202536] bg-[#0b0f1b] py-12 px-[5%] lg:px-[8%] text-xs text-[#9299ad]">
      <div className="max-w-[1150px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7c3aed] to-[#38bdf8] flex items-center justify-center">
            <Shirt className="w-4 h-4 text-white" />
          </div>
          <div className="text-lg font-extrabold tracking-[2px] text-white">
            FASHION<span className="text-[#8b5cf6]">X</span>
          </div>
          <span className="text-[#3c4560] mx-1">|</span>
          <span>AI Personal Stylist & Color Theory Intelligence</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#c4b5fd]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Gemini Multimodal Vision</span>
          </span>
          <span className="text-[#5a627a]">© {new Date().getFullYear()} FASHIONX Studio</span>
        </div>
      </div>
    </footer>
  );
};

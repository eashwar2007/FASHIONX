import React from "react";
import {
  Sparkles,
  Shirt,
  User,
  LayoutGrid,
  Wand2,
  Bookmark,
  Smartphone,
  Monitor,
} from "lucide-react";
import { APP_PAGES } from "../data/pages";

interface NavbarProps {
  onNavigate: (pageId: string) => void;
  activePage: string;
  hasAnalysis: boolean;
  savedCount: number;
  isMobileSimulated?: boolean;
  onToggleMobileSimulated?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activePage,
  hasAnalysis,
  savedCount,
  isMobileSimulated,
  onToggleMobileSimulated,
}) => {
  const currentPage = APP_PAGES.find((p) => p.id === activePage) || APP_PAGES[0];

  return (
    <header className="h-[68px] flex items-center justify-between px-4 sm:px-[5%] lg:px-[6%] border-b border-[#202536] bg-[#0b0f1b]/95 backdrop-blur-md sticky top-0 z-50">
      {/* Brand Logo & Mobile Current Page Badge */}
      <div className="flex items-center gap-2.5">
        <div
          onClick={() => onNavigate("gender")}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#38bdf8] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
            <Shirt className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-xl sm:text-[22px] font-extrabold tracking-[1.2px] text-white">
            FASHION<span className="text-[#8b5cf6]">X</span>
          </div>
        </div>

        {/* Mobile Page Pill */}
        <div className="md:hidden flex items-center gap-1.5 ml-1">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/70 border border-purple-500/40 text-purple-300">
            P{currentPage.number}/5
          </span>
        </div>
      </div>

      {/* Primary Desktop Page Navigation Tabs with Clear Page Numbers */}
      <nav className="hidden md:flex items-center gap-1 text-[12px] lg:text-[13px] bg-[#0e1322] p-1 rounded-2xl border border-[#21283e]">
        {/* Page 1: Gender */}
        <button
          onClick={() => onNavigate("gender")}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activePage === "gender"
              ? "bg-[#7c3aed] text-white font-bold shadow-sm"
              : "text-[#9da4b8] hover:text-white"
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">
            1
          </span>
          <span>Gender</span>
        </button>

        {/* Page 2: Category */}
        <button
          onClick={() => onNavigate("category")}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activePage === "category"
              ? "bg-[#7c3aed] text-white font-bold shadow-sm"
              : "text-[#9da4b8] hover:text-white"
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">
            2
          </span>
          <span>Category</span>
        </button>

        {/* Page 3: Outfit Input */}
        <button
          onClick={() => onNavigate("outfit-input")}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activePage === "outfit-input"
              ? "bg-[#7c3aed] text-white font-bold shadow-sm"
              : "text-[#9da4b8] hover:text-white"
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">
            3
          </span>
          <span>Outfit Input</span>
        </button>

        {/* Page 4: Recommendations */}
        <button
          onClick={() => onNavigate("recommendations")}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activePage === "recommendations"
              ? "bg-[#7c3aed] text-white font-bold shadow-sm"
              : "text-[#9da4b8] hover:text-white"
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">
            4
          </span>
          <span>AI Looks</span>
          {hasAnalysis && (
            <span className="px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-300 text-[10px] font-bold">
              3 Looks
            </span>
          )}
        </button>

        {/* Page 5: Wardrobe */}
        <button
          onClick={() => onNavigate("wardrobe")}
          className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activePage === "wardrobe"
              ? "bg-[#7c3aed] text-white font-bold shadow-sm"
              : "text-[#9da4b8] hover:text-white"
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">
            5
          </span>
          <span>Wardrobe</span>
          {savedCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#10b981]/20 text-emerald-400 text-[10px] font-bold">
              {savedCount}
            </span>
          )}
        </button>
      </nav>

      {/* Right Actions: Mobile Mode Toggle & Next/Action CTA */}
      <div className="flex items-center gap-2">
        {onToggleMobileSimulated && (
          <button
            onClick={onToggleMobileSimulated}
            title={isMobileSimulated ? "Switch to standard desktop layout" : "Preview mobile app page layout"}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-[#141b2d] hover:bg-[#1c263e] border border-[#232c45] text-[#9ca5bc] hover:text-white transition-all cursor-pointer"
          >
            {isMobileSimulated ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px]">Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px]">Mobile Frame</span>
              </>
            )}
          </button>
        )}

        {hasAnalysis ? (
          <button
            onClick={() => onNavigate("recommendations")}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:opacity-95 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Page 4:</span>
            <span>3 Looks</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate("outfit-input")}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:opacity-95 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Page 3:</span>
            <span>Style Me</span>
          </button>
        )}
      </div>
    </header>
  );
};

import React from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Bookmark, UploadCloud, Home, Lock } from "lucide-react";
import { APP_PAGES, PageDefinition } from "../data/pages";

interface MobilePageHeaderProps {
  activePage: string;
  onNavigate: (pageId: string) => void;
  hasAnalysis: boolean;
  savedCount: number;
}

export const MobilePageHeader: React.FC<MobilePageHeaderProps> = ({
  activePage,
  onNavigate,
  hasAnalysis,
  savedCount,
}) => {
  const currentIndex = APP_PAGES.findIndex((p) => p.id === activePage);
  const currentPage = APP_PAGES[currentIndex] || APP_PAGES[0];
  const prevPage = currentIndex > 0 ? APP_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < APP_PAGES.length - 1 ? APP_PAGES[currentIndex + 1] : null;

  return (
    <div className="md:hidden sticky top-[64px] z-40 bg-[#090d19]/95 backdrop-blur-md border-b border-[#21283e] px-4 py-2.5 shadow-md">
      {/* 5-Segment Progress Bar */}
      <div className="flex items-center gap-1.5 mb-2.5">
        {APP_PAGES.map((page, idx) => {
          const isActive = page.id === activePage;
          const isPassed = idx < currentIndex;
          const isLocked = page.id === "recommendations" && !hasAnalysis;

          return (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className="flex-1 flex flex-col items-center group py-0.5"
              title={page.title}
            >
              <div
                className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                    : isPassed
                    ? "bg-purple-900/80"
                    : "bg-[#1b2133]"
                }`}
              />
              <span
                className={`text-[9px] font-mono mt-0.5 tracking-tight font-medium ${
                  isActive ? "text-purple-300 font-bold" : "text-[#555d73]"
                }`}
              >
                P{page.number}
              </span>
            </button>
          );
        })}
      </div>

      {/* Page Title & Quick Prev/Next Page Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => prevPage && onNavigate(prevPage.id)}
          disabled={!prevPage}
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg border transition-all ${
            prevPage
              ? "text-purple-300 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 active:scale-95"
              : "text-[#475066] border-transparent cursor-not-allowed opacity-40"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex flex-col items-center text-center px-1">
          <div className="inline-flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Page {currentPage.number} of {APP_PAGES.length}
            </span>
          </div>
          <h2 className="text-xs font-bold text-white tracking-wide mt-0.5">
            {currentPage.title}
          </h2>
        </div>

        <button
          onClick={() => nextPage && onNavigate(nextPage.id)}
          disabled={!nextPage}
          className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg border transition-all ${
            nextPage
              ? "text-purple-300 bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 active:scale-95"
              : "text-[#475066] border-transparent cursor-not-allowed opacity-40"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface MobilePageFooterStepperProps {
  activePage: string;
  onNavigate: (pageId: string) => void;
  hasAnalysis: boolean;
}

export const MobilePageFooterStepper: React.FC<MobilePageFooterStepperProps> = ({
  activePage,
  onNavigate,
  hasAnalysis,
}) => {
  const currentIndex = APP_PAGES.findIndex((p) => p.id === activePage);
  const currentPage = APP_PAGES[currentIndex] || APP_PAGES[0];
  const prevPage = currentIndex > 0 ? APP_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < APP_PAGES.length - 1 ? APP_PAGES[currentIndex + 1] : null;

  return (
    <div className="md:hidden mt-10 mb-6 px-4">
      <div className="p-4 rounded-2xl bg-[#0e1322] border border-[#21283e] shadow-lg">
        <div className="flex items-center justify-between text-[11px] text-[#788299] mb-3">
          <span className="font-mono uppercase font-bold text-purple-400">
            Page {currentPage.number} of {APP_PAGES.length}
          </span>
          <span>{currentPage.shortLabel} View</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {prevPage ? (
            <button
              onClick={() => onNavigate(prevPage.id)}
              className="px-3 py-2.5 rounded-xl bg-[#141a2e] hover:bg-[#1a223c] border border-[#27304a] text-left transition-all flex flex-col active:scale-95"
            >
              <span className="text-[10px] text-[#818ba4] flex items-center gap-1 font-mono">
                <ChevronLeft className="w-3 h-3" /> Page {prevPage.number}
              </span>
              <span className="text-xs font-bold text-white truncate mt-0.5">
                {prevPage.shortLabel}
              </span>
            </button>
          ) : (
            <div className="px-3 py-2.5 rounded-xl bg-[#101524]/50 border border-[#1b2236] text-left opacity-40">
              <span className="text-[10px] text-[#5b647c] font-mono">Start of Flow</span>
              <span className="text-xs font-bold text-[#5b647c] block mt-0.5">First Page</span>
            </div>
          )}

          {nextPage ? (
            <button
              onClick={() => onNavigate(nextPage.id)}
              className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 hover:from-purple-900/70 hover:to-indigo-900/70 border border-purple-500/40 text-right transition-all flex flex-col items-end active:scale-95"
            >
              <span className="text-[10px] text-purple-300 flex items-center gap-1 font-mono">
                Page {nextPage.number} <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-xs font-bold text-white truncate mt-0.5">
                {nextPage.shortLabel}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate("upload")}
              className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 text-right transition-all flex flex-col items-end active:scale-95"
            >
              <span className="text-[10px] text-purple-300 font-mono">Completed</span>
              <span className="text-xs font-bold text-white truncate mt-0.5">Scan Another</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

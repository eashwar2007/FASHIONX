import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MobilePageHeader, MobilePageFooterStepper } from "./components/MobilePageBar";
import { GenderSelectionScreen } from "./components/GenderSelectionScreen";
import { CategoryDashboard } from "./components/CategoryDashboard";
import { OutfitInputPage } from "./components/pages/OutfitInputPage";
import { RecommendationsPage } from "./components/pages/RecommendationsPage";
import { WardrobePage } from "./components/pages/WardrobePage";
import {
  Gender,
  MainCategory,
  UserOutfitInput,
  StructuredOutfitRecommendation,
  AIStylistAnalysis,
  OutfitRecommendationItem,
  SavedWardrobeOutfit,
} from "./types";
import { APP_PAGES } from "./data/pages";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Layers,
} from "lucide-react";

export default function App() {
  // Navigation & Page State (default to Page 1: Gender selection)
  const [activePage, setActivePage] = useState<string>("gender");
  const [direction, setDirection] = useState<number>(0);
  const [isMobileSimulated, setIsMobileSimulated] = useState<boolean>(false);

  // Core FASHIONX User Flow State
  const [gender, setGender] = useState<Gender>("male");
  const [category, setCategory] = useState<MainCategory>("Casual Wear");
  const [selectedSubStyle, setSelectedSubStyle] = useState<string | undefined>(undefined);
  const [userInput, setUserInput] = useState<UserOutfitInput | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIStylistAnalysis | null>(null);
  const [outfits, setOutfits] = useState<StructuredOutfitRecommendation[]>([]);
  const [recommendationItems, setRecommendationItems] = useState<OutfitRecommendationItem[]>([]);

  // Saved Wardrobe State
  const [savedWardrobeOutfits, setSavedWardrobeOutfits] = useState<SavedWardrobeOutfit[]>(() => {
    try {
      const stored = localStorage.getItem("fashionx_saved_wardrobe");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Touch swipe handling for mobile page swiping
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Persist saved wardrobe in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("fashionx_saved_wardrobe", JSON.stringify(savedWardrobeOutfits));
    } catch (e) {
      console.warn("Unable to persist wardrobe to localStorage", e);
    }
  }, [savedWardrobeOutfits]);

  const currentIndex = APP_PAGES.findIndex((p) => p.id === activePage);
  const currentPage = APP_PAGES[currentIndex] || APP_PAGES[0];

  const handleNavigate = (pageId: string) => {
    const newIdx = APP_PAGES.findIndex((p) => p.id === pageId);
    setDirection(newIdx >= currentIndex ? 1 : -1);
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (currentIndex < APP_PAGES.length - 1) {
      handleNavigate(APP_PAGES[currentIndex + 1].id);
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      handleNavigate(APP_PAGES[currentIndex - 1].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleAnalysisSuccess = (
    analysis: AIStylistAnalysis,
    newOutfits: StructuredOutfitRecommendation[],
    imageSrc: string,
    input: UserOutfitInput
  ) => {
    setAnalysisResult(analysis);
    setOutfits(newOutfits);
    setUploadedImage(imageSrc);
    setUserInput(input);

    // Build recommendation items for virtual try-on viewer
    const items: OutfitRecommendationItem[] = newOutfits.map((o, idx) => {
      const recItem = (o as any).recommendationItem;
      if (recItem) return recItem;

      return {
        id: o.id || `rec-look-${idx + 1}`,
        title: o.name,
        styleCategory: category.toLowerCase().includes("business")
          ? "business-straight"
          : category.toLowerCase().includes("street") || category.toLowerCase().includes("casual")
          ? "baggy-streetwear"
          : "loose-formal",
        badge: `Look ${idx + 1} • ${category}`,
        imageUrl: imageSrc,
        referenceImageUrl: imageSrc,
        isUserPhoto: true,
        silhouetteDescription: `${o.upperWear} paired with ${o.bottomWear}${o.jacket ? ` and ${o.jacket}` : ""}, completed with ${o.shoes}.`,
        whyItWorks: o.reason,
        pieces: {
          top: o.upperWear,
          bottom: o.bottomWear,
          outerwear: o.jacket || "",
          footwear: o.shoes,
          accessories: "Curated jewelry & accents",
        },
        colorPalette: o.colors || [],
        stylingAdvice: (o.stylingTips || []).join(" "),
        keyRule: `Identity Lock: Preserves original ${gender} photograph.`,
      };
    });

    setRecommendationItems(items);
    handleNavigate("recommendations");
  };

  const handleToggleSaveOutfit = (outfit: OutfitRecommendationItem) => {
    setSavedWardrobeOutfits((prev) => {
      const exists = prev.some((s) => s.recommendation.id === outfit.id);
      if (exists) {
        return prev.filter((s) => s.recommendation.id !== outfit.id);
      } else {
        const newEntry: SavedWardrobeOutfit = {
          id: `saved-${Date.now()}`,
          recommendation: outfit,
          savedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        };
        return [newEntry, ...prev];
      }
    });
  };

  const handleRemoveSavedOutfit = (id: string) => {
    setSavedWardrobeOutfits((prev) => prev.filter((s) => s.id !== id));
  };

  // Render content of the current page
  const renderActivePageComponent = () => {
    switch (activePage) {
      case "gender":
        return (
          <GenderSelectionScreen
            onSelectGender={(selectedGender) => {
              setGender(selectedGender);
              handleNavigate("category");
            }}
          />
        );
      case "category":
        return (
          <CategoryDashboard
            gender={gender}
            onSelectCategory={(selectedCat, subStyle) => {
              setCategory(selectedCat);
              setSelectedSubStyle(subStyle);
              handleNavigate("outfit-input");
            }}
            onChangeGender={() => handleNavigate("gender")}
          />
        );
      case "outfit-input":
        return (
          <OutfitInputPage
            gender={gender}
            category={category}
            initialSubStyle={selectedSubStyle}
            uploadedImage={uploadedImage}
            onImageSelected={setUploadedImage}
            onAnalysisSuccess={handleAnalysisSuccess}
            onBackToCategory={() => handleNavigate("category")}
            onChangeGender={() => handleNavigate("gender")}
          />
        );
      case "recommendations":
        return (
          <RecommendationsPage
            gender={gender}
            category={category}
            userInput={userInput}
            outfits={outfits}
            recommendationItems={recommendationItems}
            analysisResult={analysisResult}
            uploadedImage={uploadedImage}
            onNavigate={handleNavigate}
            savedOutfits={savedWardrobeOutfits}
            onToggleSaveOutfit={handleToggleSaveOutfit}
            onChangeOutfitInputs={() => handleNavigate("outfit-input")}
          />
        );
      case "wardrobe":
        return (
          <WardrobePage
            savedOutfits={savedWardrobeOutfits}
            onRemoveSavedOutfit={handleRemoveSavedOutfit}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <GenderSelectionScreen
            onSelectGender={(selectedGender) => {
              setGender(selectedGender);
              handleNavigate("category");
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white flex flex-col font-sans selection:bg-purple-600 selection:text-white pb-20 md:pb-0">
      {/* Top Main Navigation Bar */}
      <Navbar
        onNavigate={handleNavigate}
        activePage={activePage}
        hasAnalysis={!!analysisResult}
        savedCount={savedWardrobeOutfits.length}
        isMobileSimulated={isMobileSimulated}
        onToggleMobileSimulated={() => setIsMobileSimulated((prev) => !prev)}
      />

      {/* Mobile Page Header Bar with 5-segment indicators and Prev/Next buttons */}
      <MobilePageHeader
        activePage={activePage}
        onNavigate={handleNavigate}
        hasAnalysis={!!analysisResult}
        savedCount={savedWardrobeOutfits.length}
      />

      {/* Simulated Phone Frame Mode for Desktop */}
      {isMobileSimulated ? (
        <div className="flex-1 flex flex-col items-center justify-start py-6 px-4 bg-[#05070d]">
          <div className="w-full max-w-[420px] bg-[#090d18] border-[6px] border-[#22293e] rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative min-h-[750px]">
            {/* Phone Speaker & Camera Notch */}
            <div className="h-6 bg-[#090d18] flex items-center justify-center pt-2 select-none">
              <div className="w-20 h-3.5 bg-[#171e31] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#2a344f]" />
              </div>
            </div>

            {/* Mobile App Header Inside Frame */}
            <div className="bg-[#0b101e] border-b border-[#20273c] px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  PAGE {currentPage.number} OF {APP_PAGES.length}
                </span>
                <span className="text-xs font-bold text-white truncate max-w-[150px]">
                  {currentPage.shortLabel}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevPage}
                  disabled={currentIndex === 0}
                  className="p-1 rounded bg-[#161d31] hover:bg-[#202944] text-[#8e98b0] disabled:opacity-30"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentIndex === APP_PAGES.length - 1}
                  className="p-1 rounded bg-[#161d31] hover:bg-[#202944] text-[#8e98b0] disabled:opacity-30"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Mobile Page Body */}
            <div
              className="flex-1 overflow-y-auto px-3 py-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 40 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderActivePageComponent()}
                  <MobilePageFooterStepper
                    activePage={activePage}
                    onNavigate={handleNavigate}
                    hasAnalysis={!!analysisResult}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Tab Bar Inside Frame */}
            <div className="bg-[#0b0f1b] border-t border-[#202536] px-2 py-2 flex items-center justify-around z-10">
              {APP_PAGES.map((page) => {
                const isActive = activePage === page.id;
                return (
                  <button
                    key={page.id}
                    onClick={() => handleNavigate(page.id)}
                    className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[9px] ${
                      isActive ? "text-purple-400 font-bold" : "text-[#7b8398]"
                    }`}
                  >
                    <span className="font-mono text-[9px]">{page.number}</span>
                    <span>{page.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Standard Responsive App with Smooth Animated Pages & Mobile Swipe */
        <main
          className="flex-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="w-full"
            >
              {renderActivePageComponent()}

              {/* Mobile Page Stepper Navigation Card (appears at bottom on mobile) */}
              <MobilePageFooterStepper
                activePage={activePage}
                onNavigate={handleNavigate}
                hasAnalysis={!!analysisResult}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      )}

      {/* Mobile Bottom Navigation Bar with clear labels & active states */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b0f1b]/95 backdrop-blur-xl border-t border-[#202536] px-1 py-1.5 flex items-center justify-around shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        {APP_PAGES.map((page) => {
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => handleNavigate(page.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? "text-purple-400 font-bold bg-purple-500/15"
                  : "text-[#7b8398] hover:text-white"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-4 h-4 rounded-full bg-white/10 text-[9px] font-mono flex items-center justify-center font-bold">
                  {page.number}
                </span>
                {page.id === "recommendations" && outfits.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-1 animate-pulse" />
                )}
                {page.id === "wardrobe" && savedWardrobeOutfits.length > 0 && (
                  <span className="px-1 rounded-full bg-purple-600 text-white text-[8px] font-bold absolute -top-1.5 -right-2">
                    {savedWardrobeOutfits.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 font-medium">{page.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      <Footer />
    </div>
  );
}

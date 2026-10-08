import React from "react";
import {
  Sparkles,
  ArrowRight,
  User,
  Crown,
  Coffee,
  Briefcase,
  Compass,
} from "lucide-react";
import { Gender, MainCategory } from "../types";
import { getCategoriesForGender } from "../data/fashionData";

interface CategoryDashboardProps {
  gender: Gender;
  onSelectCategory: (category: MainCategory, subStyle?: string) => void;
  onChangeGender: () => void;
}

const CATEGORY_ICONS: Record<MainCategory, React.ReactNode> = {
  "Traditional / Festive Wear": <Crown className="w-6 h-6 text-amber-400" />,
  "Casual Wear": <Coffee className="w-6 h-6 text-emerald-400" />,
  "Business Professional": <Briefcase className="w-6 h-6 text-sky-400" />,
  "Western Wear": <Compass className="w-6 h-6 text-purple-400" />,
};

export const CategoryDashboard: React.FC<CategoryDashboardProps> = ({
  gender,
  onSelectCategory,
  onChangeGender,
}) => {
  const categories = getCategoriesForGender(gender);
  const isMale = gender === "male";

  return (
    <div className="py-10 px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-[#1b2238]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-purple-400">
                ACTIVE PROFILE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <h2 className="text-lg font-extrabold text-white capitalize">
              {gender} Fashion Interface
            </h2>
          </div>
        </div>

        <button
          id="fx-switch-gender-btn"
          onClick={onChangeGender}
          className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#141a2c] hover:bg-[#1d253f] text-[#a1a8be] hover:text-white border border-[#252f4c] transition-colors flex items-center gap-1.5"
        >
          <span>Switch to {isMale ? "Female" : "Male"} Profile</span>
        </button>
      </div>

      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>FASHIONX CATEGORY SELECTION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Select Your Category
        </h1>
        <p className="text-sm sm:text-base text-[#9299ad] mt-2">
          Explore {isMale ? "men's" : "women's"} silhouettes across our four foundational categories.
        </p>
      </div>

      {/* 4 Main Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            id={`fx-category-card-${idx}`}
            className="group relative bg-[#0e1322] border border-[#21283e] hover:border-purple-500/60 rounded-3xl p-6 sm:p-7 shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#161c30] border border-[#27304e] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {CATEGORY_ICONS[cat.id]}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">
                      CATEGORY {idx + 1} OF 4
                    </span>
                    <h3 className="text-xl font-extrabold text-white group-hover:text-purple-200 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#8c94a9] mb-5 leading-relaxed">
                {cat.description}
              </p>

              {/* Sub-styles Chips */}
              <div className="mb-6">
                <span className="text-[11px] font-semibold text-[#6f7790] uppercase tracking-wider block mb-2">
                  Featured Silhouettes & Cuts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cat.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => onSelectCategory(cat.id, opt)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[#14192a] hover:bg-purple-600 hover:text-white text-[#a8b0c7] border border-[#232a42] hover:border-purple-500 transition-all cursor-pointer font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              id={`fx-choose-category-btn-${idx}`}
              onClick={() => onSelectCategory(cat.id)}
              className="w-full py-3.5 px-4 rounded-xl bg-[#161d33] hover:bg-purple-600 text-white font-bold text-xs sm:text-sm border border-[#283253] hover:border-purple-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)] cursor-pointer"
            >
              <span>Continue with {cat.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

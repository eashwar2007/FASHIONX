import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle,
  ArrowRightLeft,
  Shirt,
  Sun,
  Moon,
  CloudRain,
  Lightbulb,
  Copy,
  Check,
  Send,
  MessageSquare,
  Bookmark,
  Share2,
} from "lucide-react";
import { StylingAnalysis, ChatMessage } from "../types";
import { VisualOutfitRecommendationCard } from "./VisualOutfitRecommendationCard";

interface AnalysisResultsProps {
  analysis: StylingAnalysis;
  uploadedImage: string | null;
  occasion: string;
  aesthetic: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  uploadedImage,
  occasion,
  aesthetic,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "stylist",
      text: `Hello! I've completed your fashion evaluation for this **${occasion}** look in **${aesthetic}**. Feel free to ask me anything—from alternative shoe colors to fragrance pairings or event-specific adjustments!`,
      timestamp: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [savedLook, setSavedLook] = useState(false);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isAsking) return;

    const userMsgText = chatInput.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userMsgText,
      timestamp: "Just now",
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsAsking(true);

    try {
      const res = await fetch("/api/stylist-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          outfitContext: {
            vibeTitle: analysis.vibeTitle,
            occasion,
            aesthetic,
            score: analysis.score,
            colorPalette: analysis.colorPalette,
          },
          history: chatMessages.slice(-4),
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "stylist",
            text: data.reply,
            timestamp: "Just now",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "stylist",
          text: "I recommend keeping the base minimalist and playing with textural contrast—such as combining matte wool with a semi-gloss leather accessory!",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div id="results" className="mt-12 space-y-8 animate-fadeIn">
      {/* Top Banner with Score & Title */}
      <div className="rounded-[24px] border border-[#242b3d] bg-gradient-to-br from-[#13192b] via-[#101522] to-[#0c101b] p-6 lg:p-8 relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#a78bfa] tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
              <span>AI Stylist Dossier</span>
              <span className="text-[#3c4560]">•</span>
              <span className="text-[#9299ad]">{occasion}</span>
              {analysis.detectedGender && (
                <>
                  <span className="text-[#3c4560]">•</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    analysis.detectedGender === "male"
                      ? "bg-indigo-950 text-indigo-300 border border-indigo-500/30"
                      : "bg-pink-950 text-pink-300 border border-pink-500/30"
                  }`}>
                    {analysis.detectedGender === "male" ? "👔 Menswear Silhouette" : "👗 Womenswear Silhouette"}
                  </span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {analysis.vibeTitle}
            </h2>

            <p className="text-[#aeb4c7] text-sm sm:text-base leading-relaxed">
              {analysis.overallVerdict}
            </p>
          </div>

          {/* Score Display */}
          <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start bg-[#0b0f1b]/80 border border-[#202536] px-5 py-4 rounded-2xl">
            <div>
              <div className="text-[11px] font-semibold text-[#9299ad] uppercase tracking-wider">
                Stylist Score
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black bg-gradient-to-r from-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent">
                  {analysis.score.toFixed(1)}
                </span>
                <span className="text-sm font-semibold text-[#5a627a]">/ 10</span>
              </div>
            </div>

            <div className="h-10 w-[1px] bg-[#202536] mx-1" />

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setSavedLook(!savedLook)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  savedLook
                    ? "bg-purple-600/20 border-purple-500 text-purple-300"
                    : "bg-[#151b2c] border-[#293047] text-[#aeb4c7] hover:text-white"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{savedLook ? "Saved to Wardrobe" : "Save Look"}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Look link copied to clipboard!");
                }}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#151b2c] border border-[#293047] text-[#aeb4c7] hover:text-white transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Metric Progress Bars */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#202536]">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#aeb4c7]">Color Harmony</span>
              <span className="text-white font-bold">{analysis.ratings.colorHarmony}/10</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1c2235] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000"
                style={{ width: `${Math.min(100, analysis.ratings.colorHarmony * 10)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#aeb4c7]">Fit & Silhouette</span>
              <span className="text-white font-bold">{analysis.ratings.fitAndSilhouette}/10</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1c2235] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000"
                style={{ width: `${Math.min(100, analysis.ratings.fitAndSilhouette * 10)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#aeb4c7]">Occasion Fit</span>
              <span className="text-white font-bold">{analysis.ratings.occasionAppropriateness}/10</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1c2235] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-1000"
                style={{ width: `${Math.min(100, analysis.ratings.occasionAppropriateness * 10)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#aeb4c7]">Versatility</span>
              <span className="text-white font-bold">{analysis.ratings.trendVersatility}/10</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1c2235] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000"
                style={{ width: `${Math.min(100, analysis.ratings.trendVersatility * 10)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Visualized Transformation Card */}
      {analysis.visualRecommendation && (
        <VisualOutfitRecommendationCard
          visualRecommendation={analysis.visualRecommendation}
          referenceImage={uploadedImage}
          aesthetic={aesthetic}
          occasion={occasion}
          analysis={analysis}
        />
      )}

      {/* Grid: Color Palette Theory + Key Pieces */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Palette Card */}
        <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                Color Harmony & Swatches
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#1c2336] text-[#c4b5fd] border border-[#2e374f]">
                {analysis.colorPalette.harmonyType}
              </span>
            </div>

            <p className="text-xs text-[#9299ad] leading-relaxed mb-5">
              {analysis.colorPalette.notes}
            </p>

            {/* Dominant Swatches */}
            <div className="mb-4">
              <div className="text-[11px] font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                Dominant Foundation Tones
              </div>
              <div className="flex flex-wrap gap-2.5">
                {analysis.colorPalette.dominant.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(color.hex)}
                    className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0c111d] border border-[#202536] hover:border-[#8b5cf6] transition-all text-left"
                  >
                    <span
                      className="w-5 h-5 rounded-lg shadow-sm border border-white/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <div className="text-xs font-medium text-white">{color.name}</div>
                      <div className="text-[10px] font-mono text-[#7d859d]">{color.hex}</div>
                    </div>
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-[#5a627a] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Swatches */}
            <div>
              <div className="text-[11px] font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                Recommended Accent Contrasts
              </div>
              <div className="flex flex-wrap gap-2.5">
                {analysis.colorPalette.accents.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(color.hex)}
                    className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#0c111d] border border-[#202536] hover:border-[#38bdf8] transition-all text-left"
                  >
                    <span
                      className="w-5 h-5 rounded-lg shadow-sm border border-white/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <div className="text-xs font-medium text-white">{color.name}</div>
                      <div className="text-[10px] font-mono text-[#7d859d]">{color.hex}</div>
                    </div>
                    {copiedHex === color.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-[#5a627a] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pieces Identified & Flattering Elements */}
        <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Shirt className="w-4 h-4 text-[#38bdf8]" />
              Identified Garments & Proportion Strengths
            </h3>

            <div className="mb-4">
              <div className="text-[11px] font-semibold text-[#aeb4c7] uppercase tracking-wider mb-2">
                Anatomy of the Outfit
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.keyPiecesIdentified.map((piece, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#151b2c] border border-[#293047] text-white"
                  >
                    {piece}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                What Makes This Look Work
              </div>
              <ul className="space-y-2.5">
                {analysis.whatWorksWell.map((point, idx) => (
                  <li key={idx} className="text-xs text-[#aeb4c7] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Keep vs Swap / Upgrade Card */}
      {analysis.whatToSwapOrUpgrade && analysis.whatToSwapOrUpgrade.length > 0 && (
        <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <ArrowRightLeft className="w-4 h-4 text-amber-400" />
            Stylist Upgrades: What to Swap & Refine
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.whatToSwapOrUpgrade.map((swap, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0c111d] border border-[#202536] flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-semibold border border-rose-500/20">
                      Current: {swap.item}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5">
                    <span>↳ Upgrade to: {swap.replacement}</span>
                  </div>
                  <p className="text-xs text-[#9299ad] leading-relaxed">
                    {swap.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4-Piece Curated Pairings (Shoes, Outerwear, Accessories, Jewelry) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
            Curated Match Pairings
          </h3>
          <span className="text-xs text-[#9299ad]">Handpicked to complement this specific silhouette</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysis.pairingRecommendations.map((pairing, idx) => (
            <div
              key={idx}
              className="bg-[#101522] border border-[#242b3d] hover:border-[#8b5cf6]/50 transition-all rounded-[18px] p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#a78bfa] bg-[#1a152e] px-2.5 py-1 rounded-md border border-[#3e2b6b]">
                    {pairing.category}
                  </span>
                  <span className="text-[11px] text-[#9299ad] font-medium">{pairing.color}</span>
                </div>

                <h4 className="text-base font-bold text-white mt-2 mb-1 group-hover:text-[#c4b5fd] transition-colors">
                  {pairing.name}
                </h4>

                <p className="text-xs text-[#aeb4c7] leading-relaxed mb-3">
                  {pairing.stylingAdvice}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1d2334] text-[11px] text-[#78829d]">
                <span className="text-[#9299ad] font-medium">Stylist Tip: </span>
                {pairing.shopTip}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style Transformations: Dress Up vs Dress Down */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300 mb-2">
            <Moon className="w-4 h-4" />
            <span>Dress It Up (Evening / Gala)</span>
          </div>
          <p className="text-xs text-[#aeb4c7] leading-relaxed">
            {analysis.styleVariations.dressUp}
          </p>
        </div>

        <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-sky-300 mb-2">
            <Sun className="w-4 h-4" />
            <span>Dress It Down (Weekend / Casual)</span>
          </div>
          <p className="text-xs text-[#aeb4c7] leading-relaxed">
            {analysis.styleVariations.dressDown}
          </p>
        </div>

        <div className="bg-[#101522] border border-[#242b3d] rounded-[20px] p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-teal-300 mb-2">
            <CloudRain className="w-4 h-4" />
            <span>Weather & Layering Defense</span>
          </div>
          <p className="text-xs text-[#aeb4c7] leading-relaxed">
            {analysis.styleVariations.weatherLayering}
          </p>
        </div>
      </div>

      {/* Master Stylist Rule of Thumb */}
      <div className="rounded-[20px] bg-gradient-to-r from-[#17142b] to-[#0f172a] border border-[#3b2b6b] p-5 flex items-start gap-4 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center shrink-0 text-[#c4b5fd]">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#a78bfa] mb-1">
            Stylist Golden Rule
          </div>
          <p className="text-sm text-white font-medium leading-relaxed">
            "{analysis.stylistProTip}"
          </p>
        </div>
      </div>

      {/* Interactive Stylist Follow-up Q&A Chat */}
      <div className="bg-[#101522] border border-[#242b3d] rounded-[24px] p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#202536]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-[#a78bfa]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Ask Your AI Stylist</h4>
              <p className="text-[11px] text-[#9299ad]">
                Ask questions about accessories, shoes, hairstyles, or budget alternatives
              </p>
            </div>
          </div>
        </div>

        {/* Message feed */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1 mb-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white"
                    : "bg-[#0c111d] border border-[#202536] text-[#c4b5fd]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isAsking && (
            <div className="flex justify-start">
              <div className="bg-[#0c111d] border border-[#202536] text-[#9299ad] rounded-2xl px-4 py-3 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-150" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300" />
                <span>AI Stylist is composing fashion advice...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            "How should I style loose-fit formal trousers?",
            "What baggy jeans go best with street wear?",
            "When should I use straight-fit formals?",
            "What footwear would elevate this look?",
            "Can I style this with jewelry?",
          ].map((promptText, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setChatInput(promptText)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#151b2c] hover:bg-[#1f2840] border border-[#242b3d] text-[#aeb4c7] hover:text-white transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask a question about this outfit..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#0c111d] border border-[#242b3d] text-white text-xs placeholder-[#5a627a] focus:outline-none focus:border-[#8b5cf6]"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isAsking}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white text-xs font-semibold hover:opacity-90 disabled:opacity-40 flex items-center gap-1.5 transition-all"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

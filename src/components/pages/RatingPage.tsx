import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  MessageSquare,
  Send,
  Loader2,
  TrendingUp,
  Palette,
  Layers,
  HelpCircle,
  Scissors,
  Check,
} from "lucide-react";
import { StylingAnalysis, ChatMessage } from "../../types";

interface RatingPageProps {
  analysisResult: StylingAnalysis | null;
  uploadedImage: string | null;
  onNavigate: (page: string) => void;
}

export const RatingPage: React.FC<RatingPageProps> = ({
  analysisResult,
  uploadedImage,
  onNavigate,
}) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "stylist",
      text: "Hello! I've completed the silhouette and color analysis of your outfit. Feel free to ask me anything about accessorizing, alternative cuts, or tailored upgrades!",
      timestamp: "Just now",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatSending, setIsChatSending] = useState(false);

  // EMPTY STATE: If user has not uploaded an outfit photo yet
  if (!analysisResult || !uploadedImage) {
    return (
      <div className="py-20 px-[5%] lg:px-[8%] max-w-[1000px] mx-auto text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0e1322] border border-[#232a3f] shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[#a78bfa] mx-auto flex items-center justify-center mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b2135] text-[#c4b5fd] text-xs font-semibold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            PAGE 3 OF 5 • OUTFIT RATING (AWAITING UPLOAD)
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            No Outfit Evaluated Yet
          </h2>

          <p className="text-[#9299ad] text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            The outfit rating scorecard is computed only when you upload a photo and request recommendations. We evaluate silhouette balance, color theory, tailoring breaks, and occasion harmony.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("upload")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:opacity-95 transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-5 h-5" />
              Upload Outfit Photo Now
            </button>
            <button
              onClick={() => onNavigate("interface")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-[#aeb4c7] hover:text-white bg-[#151a2b] hover:bg-[#1b2238] border border-[#262e45] transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatSending) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: chatInput,
      timestamp: "Just now",
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsChatSending(true);

    try {
      const res = await fetch("/api/stylist-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          outfitContext: analysisResult,
        }),
      });
      const data = await res.json();
      const replyText =
        data.reply ||
        "Consider pairing this with an unstructured fluid layer and low-profile leather footwear for effortless balance.";

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "stylist",
          text: replyText,
          timestamp: "Just now",
        },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "stylist",
          text: "For clean silhouettes, prioritize intentional leg drape: loose-fit formals for elevated occasions, baggy relaxed jeans for streetwear, and straight-fit formals strictly for business.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsChatSending(false);
    }
  };

  return (
    <div className="py-12 px-[5%] lg:px-[8%] max-w-[1250px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#20263b]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              PAGE 3 OF 5 • OUTFIT RATING & SCORECARD
            </span>
            <span className="text-xs text-[#858da3]">•</span>
            <span className="text-xs text-[#9aa2b8]">{analysisResult.vibeTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Outfit Rating & Scorecard
          </h1>
          <p className="text-sm text-[#9299ad] mt-1">
            Comprehensive evaluation across silhouette contours, color harmony, and tailoring balance.
          </p>
        </div>

        {/* CTA to Next Step: Multiple Recommendations */}
        <button
          onClick={() => onNavigate("recommendations")}
          className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-[0_4px_15px_rgba(124,58,237,0.35)] hover:opacity-95 transition-all flex items-center gap-2"
        >
          <span>View AI Recommendations (4 Looks)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Left Column (Uploaded photo + Score), Right Column (Detailed Metrics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Uploaded Photo & Score Block */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Uploaded Outfit Card */}
          <div className="p-4 rounded-3xl bg-[#0e1322] border border-[#21283e] shadow-xl">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-black mb-4 border border-[#22293e]">
              <img
                src={uploadedImage}
                alt="Uploaded outfit"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white">
                Uploaded Outfit
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8b93a8]">
                Evaluated Aesthetic
              </span>
              <span className="text-xs font-bold text-purple-300">
                {analysisResult.vibeTitle}
              </span>
            </div>
          </div>

          {/* Master Score Hero Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#141a2c] to-[#0e1322] border border-purple-500/30 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-purple-500/10 blur-2xl pointer-events-none" />
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
              Overall Aesthetic Rating
            </div>
            <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-2">
              {analysisResult.score}
              <span className="text-xl text-[#7c859d] font-normal"> / 10.0</span>
            </div>
            <p className="text-xs text-[#9aa2b8] max-w-xs mx-auto leading-relaxed">
              {analysisResult.overallVerdict}
            </p>
          </div>
        </div>

        {/* Right Column: 4-Metric Sliders & In-Depth Breakdowns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Dimensional Breakdown */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0e1322] border border-[#21283e] shadow-xl">
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Dimensional Rating Breakdown
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fit & Silhouette */}
              <div className="p-4 rounded-2xl bg-[#121728] border border-[#1f263c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#aeb4c7]">
                    Fit & Silhouette Architecture
                  </span>
                  <span className="text-sm font-bold text-white">
                    {analysisResult.ratings.fitAndSilhouette} / 10
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1b2135] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{
                      width: `${(analysisResult.ratings.fitAndSilhouette / 10) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#868fa6]">
                  Evaluates proportion, drape breaks, and proper silhouette lines.
                </span>
              </div>

              {/* Color Harmony */}
              <div className="p-4 rounded-2xl bg-[#121728] border border-[#1f263c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#aeb4c7]">
                    Color Harmony & Tonal Balance
                  </span>
                  <span className="text-sm font-bold text-white">
                    {analysisResult.ratings.colorHarmony} / 10
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1b2135] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{
                      width: `${(analysisResult.ratings.colorHarmony / 10) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#868fa6]">
                  Assesses value contrast, skin undertone sync, and palette depth.
                </span>
              </div>

              {/* Occasion Appropriateness */}
              <div className="p-4 rounded-2xl bg-[#121728] border border-[#1f263c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#aeb4c7]">
                    Occasion Appropriateness
                  </span>
                  <span className="text-sm font-bold text-white">
                    {analysisResult.ratings.occasionAppropriateness} / 10
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1b2135] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{
                      width: `${(analysisResult.ratings.occasionAppropriateness / 10) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#868fa6]">
                  Calibrated to formality, context, and venue expectations.
                </span>
              </div>

              {/* Trend Versatility */}
              <div className="p-4 rounded-2xl bg-[#121728] border border-[#1f263c]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#aeb4c7]">
                    Trend Versatility
                  </span>
                  <span className="text-sm font-bold text-white">
                    {analysisResult.ratings.trendVersatility} / 10
                  </span>
                </div>
                <div className="w-full h-2 bg-[#1b2135] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-400 rounded-full"
                    style={{
                      width: `${(analysisResult.ratings.trendVersatility / 10) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] text-[#868fa6]">
                  Measures longevity, timeless appeal, and capsule reusability.
                </span>
              </div>
            </div>
          </div>

          {/* Color Palette Analysis */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0e1322] border border-[#21283e] shadow-xl">
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-purple-400" />
              Extracted Color Palette & Harmony
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {analysisResult.colorPalette.dominant.map((color, i) => (
                <div
                  key={`dom-${i}`}
                  className="p-3 rounded-xl bg-[#131828] border border-[#20273d] flex flex-col items-center text-center"
                >
                  <div
                    className="w-full h-10 rounded-lg shadow-inner mb-2 border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-bold text-white truncate w-full">
                    {color.name}
                  </span>
                  <span className="text-[10px] text-[#71788e]">{color.hex}</span>
                  <span className="text-[9px] uppercase tracking-wider text-purple-400 mt-0.5">
                    Dominant
                  </span>
                </div>
              ))}
              {analysisResult.colorPalette.accents.map((color, i) => (
                <div
                  key={`acc-${i}`}
                  className="p-3 rounded-xl bg-[#131828] border border-[#20273d] flex flex-col items-center text-center"
                >
                  <div
                    className="w-full h-10 rounded-lg shadow-inner mb-2 border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-bold text-white truncate w-full">
                    {color.name}
                  </span>
                  <span className="text-[10px] text-[#71788e]">{color.hex}</span>
                  <span className="text-[9px] uppercase tracking-wider text-amber-400 mt-0.5">
                    Accent
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#9199ae] leading-relaxed">
              <strong className="text-white">Harmony Type: </strong>
              {analysisResult.colorPalette.harmonyType} — {analysisResult.colorPalette.notes}
            </p>
          </div>

          {/* What Works Well & What to Swap/Upgrade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What Works */}
            <div className="p-6 rounded-3xl bg-[#0e1322] border border-[#21283e] shadow-xl">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                What Works Well
              </h3>
              <ul className="space-y-2.5">
                {analysisResult.whatWorksWell.map((point, i) => (
                  <li key={i} className="text-xs text-[#aeb4c7] flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Swap */}
            <div className="p-6 rounded-3xl bg-[#0e1322] border border-[#21283e] shadow-xl">
              <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Scissors className="w-4 h-4" />
                Silhouette Upgrades
              </h3>
              <div className="space-y-3">
                {analysisResult.whatToSwapOrUpgrade.map((swap, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#131828] border border-[#20273d]">
                    <div className="text-[11px] text-[#f87171] line-through font-medium">
                      {swap.item}
                    </div>
                    <div className="text-xs font-semibold text-purple-300 mt-0.5">
                      → {swap.replacement}
                    </div>
                    <div className="text-[10px] text-[#868fa6] mt-1">{swap.reason}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stylist Pro Tip */}
          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-800/30 text-purple-200">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Master Stylist Rule
            </div>
            <p className="text-xs leading-relaxed text-purple-200/90">
              {analysisResult.stylistProTip}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Stylist Chat Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1322] border border-[#21283e] shadow-xl mb-12">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Ask AI Stylist About This Outfit</h3>
            <p className="text-xs text-[#8c94a9]">
              Inquire about jewelry pairings, pant hemlines, or alternative colorways.
            </p>
          </div>
        </div>

        {/* Chat History Box */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4 p-4 rounded-2xl bg-[#0a0e18] border border-[#1a2033]">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white"
                    : "bg-[#141a2c] text-[#cbd5e1] border border-[#22293e]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isChatSending && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-[#141a2c] text-xs text-[#8c94a9] flex items-center gap-2 border border-[#22293e]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                <span>AI stylist is curating guidance...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about shoes, jewelry, loose-fit formals, or baggy streetwear..."
            className="flex-1 px-4 py-3 rounded-xl bg-[#131828] border border-[#22293e] text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 placeholder:text-[#6a7288]"
          />
          <button
            type="submit"
            disabled={isChatSending || !chatInput.trim()}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>

      {/* Bottom Floating Banner to Next Page */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">
            Ready to explore your recommended outfits?
          </div>
          <p className="text-xs text-[#b8c0d9] mt-0.5">
            We've generated 4 distinct complete silhouettes matching your evaluated photo.
          </p>
        </div>
        <button
          onClick={() => onNavigate("recommendations")}
          className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] shadow-lg hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
        >
          <span>View AI Recommendations Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

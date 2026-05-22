import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowLeft, Paintbrush, Activity, HelpCircle, FileSpreadsheet, Share2 } from "lucide-react";
import { TATTOO_STYLES, ARTISTS } from "../data";

interface StyleQuizProps {
  onPreFillBooking: (prefill: {
    styleId: string;
    placement: string;
    size: string;
    concept: string;
    artistId: string;
  }) => void;
}

const PLACEMENTS = [
  { id: "forearm", name: "Forearm / Sleeve Wrap", pain: "Low-Medium", healingIdx: "9/10 (Easy care)" },
  { id: "outer-arm", name: "Outer Arm / Shoulder", pain: "Low", healingIdx: "10/10 (Highly durable)" },
  { id: "collarbone", name: "Chest / Collarbone", pain: "Medium-High", healingIdx: "8/10 (Delicate skin)" },
  { id: "back-spine", name: "Upper Back / Spine Flow", pain: "Medium", healingIdx: "7/10 (Hard to reach)" },
  { id: "ribs", name: "Ribcage / Torso Flow", pain: "Extremely High", healingIdx: "6/10 (Friction prone)" },
  { id: "leg-ankle", name: "Thigh or Ankle Wrap", pain: "Medium-High", healingIdx: "9/10 (Very durable)" },
];

const SIZES = [
  { id: "small", name: "Micro / Fine Signatures (Under 5cm)", scale: "Accent detail", sessionEst: "1 - 2 Hours" },
  { id: "medium", name: "Medium Statement Piece (5 - 15cm)", scale: "Focal placement", sessionEst: "2 - 4 Hours" },
  { id: "large", name: "Large Concept / Semi-Sleeve", scale: "Full anatomy wrap", sessionEst: "Full Day Session" },
];

export default function StyleQuiz({ onPreFillBooking }: StyleQuizProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedPlacement, setSelectedPlacement] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [conceptText, setConceptText] = useState<string>("");
  const [preferredArtist, setPreferredArtist] = useState<string>("roy");

  const resetQuiz = () => {
    setStep(1);
    setSelectedStyle("");
    setSelectedPlacement("");
    setSelectedSize("");
    setConceptText("");
    setPreferredArtist("roy");
  };

  const handleCreateBrief = () => {
    onPreFillBooking({
      styleId: selectedStyle,
      placement: selectedPlacement,
      size: selectedSize,
      concept: conceptText,
      artistId: preferredArtist,
    });
  };

  const currentStyleData = TATTOO_STYLES.find(s => s.id === selectedStyle);
  const currentPlacementData = PLACEMENTS.find(p => p.id === selectedPlacement);
  const currentSizeData = SIZES.find(sz => sz.id === selectedSize);
  const currentArtistData = ARTISTS.find(a => a.id === preferredArtist);

  return (
    <section id="styles" className="relative bg-black py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-[0.55em] text-amber-500 uppercase">
            VIP ART PLANNING STUDIO
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tight leading-none uppercase">
            Bespoke <span className="font-extrabold text-white">Concept Planner</span>
          </h2>
          <p className="text-xs text-neutral-400 font-mono tracking-widest max-w-lg mx-auto">
            Design your custom flow in Bali. Align style, placement & custom vision.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="backdrop-blur-md bg-stone-950/65 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative">
          
          {/* Progress Indicators */}
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/[0.04]">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs transition-colors duration-300 ${
                    step >= num
                      ? "bg-amber-500 text-black font-bold"
                      : "bg-neutral-900 text-neutral-500 border border-white/5"
                  }`}
                >
                  {num}
                </div>
                {num < 5 && (
                  <div
                    className={`h-[1px] w-8 md:w-16 transition-colors duration-300 ${
                      step > num ? "bg-amber-500" : "bg-neutral-900"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            
            {/* STEP 1: STYLE SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-sans text-white uppercase tracking-tight font-extrabold mb-1 flex items-center gap-2">
                    <Paintbrush className="w-5 h-5 text-amber-500" />
                    Step 1: Choose Your Core Ink Style
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">Select a signature specialty style practiced in our Kerobokan sanctuary.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TATTOO_STYLES.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        selectedStyle === style.id
                          ? "border-amber-500 bg-amber-500/[0.05]"
                          : "border-white/5 bg-neutral-900/40 hover:border-white/10 hover:bg-neutral-900/70"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-sans font-extrabold text-white uppercase tracking-tight">
                          {style.name}
                        </span>
                        {selectedStyle === style.id && (
                          <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-black stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light mb-4 text-left line-clamp-2">
                        {style.description}
                      </p>
                      
                      {/* Specs badges inline */}
                      <div className="flex flex-wrap gap-2 text-[9px] font-mono tracking-wider">
                        <span className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-white/5">
                          Pain: {style.traits.averagePain}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-white/5">
                          Session: {style.traits.sessionType}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-white/[0.04]">
                  <button
                    disabled={!selectedStyle}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-white text-black font-mono text-xs font-bold rounded-lg cursor-pointer hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed uppercase"
                  >
                    CONTINUE TO PLACEMENT
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PLACEMENT SELECTION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-sans text-white uppercase tracking-tight font-extrabold mb-1 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-500" />
                    Step 2: Anatomy & Healing Placements
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">Select where on the body canvas you envision the piece. Care details are estimated for Bali's weather.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {PLACEMENTS.map((place) => (
                    <div
                      key={place.id}
                      onClick={() => setSelectedPlacement(place.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                        selectedPlacement === place.id
                          ? "border-amber-500 bg-amber-500/[0.05]"
                          : "border-white/5 bg-neutral-900/40 hover:border-white/10 hover:bg-neutral-900/75"
                      }`}
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-xs font-sans font-bold text-white uppercase tracking-wider block">
                          {place.name}
                        </span>
                        <div className="flex gap-2 text-[9px] font-mono text-neutral-400">
                          <span>Pain Level: <strong className="text-white">{place.pain}</strong></span>
                          <span>•</span>
                          <span>Care Index: <strong className="text-white">{place.healingIdx}</strong></span>
                        </div>
                      </div>
                      {selectedPlacement === place.id && (
                        <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-black stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/[0.04]">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </button>
                  <button
                    disabled={!selectedPlacement}
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-white text-black font-mono text-xs font-bold rounded-lg cursor-pointer hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed uppercase"
                  >
                    CONTINUE TO SIZE
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SIZE ESTIMATOR */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-sans text-white uppercase tracking-tight font-extrabold mb-1 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    Step 3: Approximate Canvas Dimensions
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">This allows our masters to calibrate precise density, stencil parameters, and drafting times.</p>
                </div>

                <div className="space-y-3">
                  {SIZES.map((sz) => (
                    <div
                      key={sz.id}
                      onClick={() => setSelectedSize(sz.id)}
                      className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex justify-between items-center ${
                        selectedSize === sz.id
                          ? "border-amber-500 bg-amber-500/[0.05]"
                          : "border-white/5 bg-neutral-900/40 hover:border-white/10 hover:bg-neutral-900/75"
                      }`}
                    >
                      <div className="space-y-1 text-left">
                        <span className="text-sm font-sans font-extrabold text-white uppercase tracking-tight block">
                          {sz.name}
                        </span>
                        <div className="flex gap-4 text-[10px] font-mono text-neutral-400">
                          <span>Structure: <strong className="text-white">{sz.scale}</strong></span>
                          <span>Time Estimate: <strong className="text-amber-400">{sz.sessionEst}</strong></span>
                        </div>
                      </div>
                      {selectedSize === sz.id && (
                        <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-black stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/[0.04]">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </button>
                  <button
                    disabled={!selectedSize}
                    onClick={() => setStep(4)}
                    className="px-6 py-3 bg-white text-black font-mono text-xs font-bold rounded-lg cursor-pointer hover:bg-neutral-200 transition-colors duration-300 disabled:opacity-20 disabled:cursor-not-allowed uppercase"
                  >
                    CONTINUE TO BRIEF
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONCEPT DESCRIPTION */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg md:text-xl font-sans text-white uppercase tracking-tight font-extrabold mb-1 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                    Step 4: Express Your Artistic Narrative
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">Describe the feelings, elements, or journey symbols (e.g., Balinese waves, a geometric compass, abstract lunar designs) you want integrated.</p>
                </div>

                <div className="space-y-5 text-left">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">CONCEPT DESC / STORY BRIEF</label>
                    <textarea
                      value={conceptText}
                      onChange={(e) => setConceptText(e.target.value)}
                      placeholder="e.g., I want an fine-line ornamental mandala on my forearm. I want a small crescent moon embedded, reflecting a clean geometry look without too much dark saturation...."
                      rows={4}
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl p-4 text-xs font-sans text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block">SELECT ARTIST SPECIALIST</label>
                    <div className="grid grid-cols-1 gap-3">
                      {ARTISTS.map((artist) => (
                        <div
                          key={artist.id}
                          onClick={() => setPreferredArtist(artist.id)}
                          className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                            preferredArtist === artist.id
                              ? "border-amber-500 bg-amber-500/[0.05]"
                              : "border-white/5 bg-neutral-900/40 hover:border-white/10"
                          }`}
                        >
                          <span className="text-xs font-sans font-bold text-white uppercase block leading-tight">{artist.name}</span>
                          <span className="text-[8px] font-mono text-neutral-400 uppercase block mt-1 line-clamp-1">{artist.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/[0.04]">
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                  </button>
                  <button
                    disabled={!conceptText.trim()}
                    onClick={() => setStep(5)}
                    className="px-6 py-3 bg-amber-500 text-black font-mono text-xs font-bold rounded-lg cursor-pointer hover:bg-amber-600 transition-colors duration-300 disabled:opacity-25 disabled:cursor-not-allowed uppercase"
                  >
                    COMPILE ART TICKET
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: TICKET SUMMARY & PRE-FILL REDIRECTION */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 text-center"
              >
                {/* Simulated luxury Ticket wrapper with jagged border effects */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-950 border-2 border-dashed border-amber-500/40 p-6 md:p-8 space-y-6">
                  
                  {/* Luxury Seals */}
                  <div className="flex justify-between items-start">
                    <div className="text-left font-mono text-[9px] text-amber-500 tracking-[0.2em] uppercase">
                      VIP CONSULTATION RECORD
                      <span className="block text-[8px] text-neutral-500 tracking-normal font-sans mt-0.5">DEV-BALI-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <div className="px-2 py-1 rounded bg-amber-500 text-black font-mono text-[8px] font-bold uppercase tracking-wider">
                      CONFIRMED READY
                    </div>
                  </div>

                  {/* Body grid detailing alignment */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-y border-white/[0.05] py-5">
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-neutral-500 block uppercase">STYLING DIRECTIVE</span>
                      <strong className="text-[11px] font-sans text-neutral-100 uppercase tracking-tight block mt-0.5">{currentStyleData?.name || "Premium Custom"}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-neutral-500 block uppercase">PLACEMENT AREA</span>
                      <strong className="text-[11px] font-sans text-neutral-100 uppercase tracking-tight block mt-0.5">{currentPlacementData?.name || "Anatomy Frame"}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-neutral-500 block uppercase">SIZE CATEGORY</span>
                      <strong className="text-[11px] font-sans text-amber-400 uppercase block mt-0.5">{currentSizeData?.name.split(" ")[0] || "Custom"}</strong>
                    </div>
                    <div>
                      <span className="font-mono text-[8px] tracking-wider text-neutral-500 block uppercase">PREFERRED ARTIST</span>
                      <strong className="text-[11px] font-sans text-neutral-100 block mt-0.5">{currentArtistData?.name || "Studio Master"}</strong>
                    </div>
                  </div>

                  {/* Story section */}
                  <div className="text-left space-y-1.5 bg-black/45 p-4 rounded border border-white/[0.03]">
                    <span className="font-mono text-[8px] tracking-wider text-amber-500 uppercase block">CONCEPT BRIEF TRANSCRIPT</span>
                    <p className="text-xs text-neutral-300 font-sans font-light italic leading-relaxed">
                      "{conceptText}"
                    </p>
                  </div>

                  {/* Recovery parameters */}
                  <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                    <span>Est. Sessions: <strong className="text-white">{currentSizeData?.sessionEst || "1 Session"}</strong></span>
                    <span>Sanctuary Unit: <strong className="text-amber-400">Kerobokan Lounge 3</strong></span>
                  </div>

                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider block">
                    Lock In This Concept Briefing In Bali
                  </h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto font-sans font-light">
                    Submit this completed design layout to our scheduling system to pre-prepare our drawing drafts immediately.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={resetQuiz}
                      className="px-5 py-3 border border-white/10 hover:border-white/20 text-white font-mono text-xs tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      RESET PLANNER
                    </button>
                    <button
                      onClick={handleCreateBrief}
                      id="btn-quiz-lock-booking"
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-mono text-xs font-bold tracking-widest rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      PRE-FILL BOOKING FORM
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

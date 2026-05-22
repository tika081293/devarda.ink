import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, Globe } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="bg-neutral-950 py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03] relative overflow-hidden">
      
      {/* Absolute blur assets */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        
        {/* Title layout */}
        <div className="text-center space-y-3">
          <span className="font-mono text-[10px] tracking-[0.55em] text-red-500 uppercase block">
            VISITOR FEEDBACK
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white uppercase tracking-tight">
            Client <span className="font-sans font-extrabold text-white">Endorsements</span>
          </h2>
          <p className="text-xs text-neutral-400 font-sans font-light max-w-sm mx-auto">
            Unfiltered thoughts from international travelers and resident nomads who experienced our Kerobokan sanctuary.
          </p>
        </div>

        {/* Carousel slide box container */}
        <div className="relative p-8 md:p-14 bg-neutral-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Sizable quote decorator */}
          <Quote className="absolute top-6 left-6 w-12 h-12 text-white/[0.03] pointer-events-none stroke-[1.5]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-center"
            >
              
              {/* Rating stars */}
              <div className="flex justify-center gap-1 text-amber-500">
                {[...Array(activeReview.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                ))}
              </div>

              {/* Quote review body */}
              <blockquote className="text-sm md:text-lg text-neutral-200 font-sans font-light italic leading-relaxed max-w-2xl mx-auto">
                "{activeReview.quote}"
              </blockquote>

              {/* Client info */}
              <div className="space-y-1.5 pt-3">
                <h4 className="text-xs text-white font-mono font-bold tracking-widest uppercase">
                  {activeReview.name}
                </h4>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono tracking-wider">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-red-400" />
                    {activeReview.country}
                  </span>
                  <span>•</span>
                  <span>{activeReview.role}</span>
                  <span>•</span>
                  <span className="text-[9px] text-amber-500/80">{activeReview.date}</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation Triggers */}
          <div className="flex items-center justify-between mt-10 max-w-xs mx-auto pt-6 border-t border-white/[0.04]">
            
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500/30 transition-all active:scale-95 cursor-pointer bg-neutral-950/60"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono text-neutral-500 select-none">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-amber-500 hover:border-amber-500/30 transition-all active:scale-95 cursor-pointer bg-neutral-950/60"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

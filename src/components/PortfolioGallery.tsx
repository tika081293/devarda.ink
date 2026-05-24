import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Sparkles } from "lucide-react";
import { PORTFOLIO_ITEMS } from "../data";

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; style: string; artist: string } | null>(null);

  const filterCategories = ["All", "Blackwork", "Minimalist", "Realism", "Color"];

  const filteredItems = activeFilter === "All"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(it => it.style === activeFilter);

  return (
    <section id="portfolio" className="bg-neutral-950 py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.55em] text-gold-500 uppercase block">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tight leading-none uppercase">
              Masterpiece <span className="font-extrabold text-white">Archives</span>
            </h2>
          </div>

          {/* Filter list premium pills */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full border text-[10px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-neutral-400 border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masterpieces Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Asymmetric bento spacing for ultra-modern curation
              let gridSpan = "aspect-[4/5]";
              if (filteredItems.length > 2) {
                if (index === 0) {
                  gridSpan = "md:col-span-2 lg:row-span-2 aspect-square md:aspect-[16/11] lg:aspect-[1.1]";
                } else if (index === 3) {
                  gridSpan = "md:col-span-2 aspect-[16/10]";
                }
              }

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 cursor-pointer ${gridSpan}`}
                  onClick={() => setLightboxImage({
                    url: item.imageUrl,
                    title: item.title,
                    style: item.style,
                    artist: item.artistName
                  })}
                >
                  {/* Subtle brand tag for premium feeling */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-mono tracking-[0.2em] text-neutral-400 uppercase transition-all duration-300 group-hover:text-gold-400 group-hover:border-gold-500/20">
                    SENSORY NO. 0{index + 1}
                  </div>

                  {/* Product/Design Preview Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Grid Overlay Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Grid text markers */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {item.style}
                    </span>
                    
                    <h4 className="text-lg font-sans font-extrabold text-white uppercase tracking-tight mb-1">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs font-mono text-neutral-400">
                      By {item.artistName} • Studio Master
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[9px] font-mono text-neutral-300 tracking-widest">EXPAND CLOSE-UP</span>
                      <Maximize2 className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty status */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-neutral-500 font-mono text-xs">
            No matching custom pieces in this filter section.
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <div
                className="relative max-w-4xl w-full flex flex-col md:flex-row bg-stone-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Photo Frame */}
                <div className="flex-1 max-h-[80vh] md:max-h-none overflow-hidden aspect-square md:aspect-[4/5]">
                  <img
                    src={lightboxImage.url}
                    alt={lightboxImage.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right Side: Curator Specs panel */}
                <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between text-left space-y-6">
                  <div>
                    <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block mb-2">
                      PORTFOLIO ENTRY APPROVED
                    </span>
                    <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white uppercase tracking-tight mb-3">
                      {lightboxImage.title}
                    </h3>
                    <div className="h-[2px] w-12 bg-gold-500 my-4" />
                    
                    <div className="space-y-3 font-mono text-xs text-neutral-400">
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase">STYLING SECTOR</span>
                        <strong className="text-white font-sans text-sm uppercase">{lightboxImage.style}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-500 block uppercase">EXECUTING MASTER</span>
                        <strong className="text-white font-sans text-sm">{lightboxImage.artist}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.05] space-y-3 font-sans font-light text-xs text-neutral-400">
                    <p>Designed and inked in Kerobokan lounge, Bali. Using EO gas-sterilized single cartridges and hypoallergenic midnight-black formula.</p>
                    <button
                      onClick={() => setLightboxImage(null)}
                      className="w-full py-2.5 bg-white text-black font-mono font-bold text-[10px] tracking-widest text-center rounded-lg hover:bg-neutral-200 transition-colors uppercase cursor-pointer"
                    >
                      RETURN TO ARCHIVES
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

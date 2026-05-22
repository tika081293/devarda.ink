import { motion } from "motion/react";
import { ArrowRight, Sparkles, MapPin, Anchor, Play, Pause, Waves, Instagram } from "lucide-react";
import { IMAGES } from "../data";
import AudioToggle from "./AudioToggle";

interface HeroSectionProps {
  onBookClick: () => void;
  onExplorePortfolioClick: () => void;
  onStartQuizClick: () => void;
}

export default function HeroSection({
  onBookClick,
  onExplorePortfolioClick,
  onStartQuizClick,
}: HeroSectionProps) {
  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-black flex flex-col justify-between">
      
      {/* Real Cinematic Background Video with Image Fallback */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-35 scale-105 filter brightness-50 contrast-125"
          poster={IMAGES.studioInterior}
        >
          {/* High-quality cinematic tattoo process close-up overlay */}
          <source
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f434aadef0c5e373a0ae23d6225e&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
          {/* Fallback source in case first option is blocked */}
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-hand-of-a-tattoo-artist-drawing-on-skin-41680-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Luxury Vignette, Radial Shadows, Glassmorphism gradients */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* Top Header Navigation Inside Hero */}
      <header className="relative z-10 w-full px-6 py-6 md:px-12 flex justify-between items-center bg-black/15 backdrop-blur-md border-b border-white/[0.04]">
        <div className="flex flex-col text-left">
          <span className="font-sans font-extrabold text-2xl tracking-[0.25em] text-white uppercase">
            DEVARDA<span className="text-red-500 font-light">.ink</span>
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.45em] text-neutral-400 mt-0.5">
            TATTOO STUDIO
          </span>
        </div>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
          <a href="#about" className="hover:text-red-400 transition-colors duration-300">ABOUT SANCTUARY</a>
          <a href="#styles" className="hover:text-amber-400 transition-colors duration-300">CONCEPT PLANNER</a>
          <a href="#portfolio" className="hover:text-red-400 transition-colors duration-300">PORTFOLIO</a>
          <a href="#testimonials" className="hover:text-red-400 transition-colors duration-300">TESTIMONIALS</a>
          <a href="#standards" className="hover:text-amber-400 transition-colors duration-300">HYGIENE</a>
          <a 
            href="https://instagram.com/devarda.ink" 
            target="_blank" 
            rel="noreferrer" 
            className="text-neutral-300 hover:text-red-400 transition-all flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-red-500/10 hover:border-red-500/30 NormalCase"
          >
            <Instagram className="w-3.5 h-3.5 text-red-500 shrink-0" /> INSTAGRAM
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Ambient sound toggle embedded neatly */}
          <div className="hidden sm:block">
            <AudioToggle />
          </div>

          <button
            onClick={onBookClick}
            className="px-5 py-2.5 bg-red-600/10 hover:bg-red-600 hover:text-white border border-red-500/40 text-red-400 rounded-full text-[9px] font-mono tracking-widest transition-all duration-300 active:scale-95 cursor-pointer uppercase"
          >
            ALIGN INK
          </button>
        </div>
      </header>

      {/* Main Copy Centered Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-24 max-w-5xl text-left">
        
        {/* Vibe badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-stone-900/85 border border-red-500/20 text-[9px] tracking-[0.25em] font-mono text-amber-400 uppercase mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-red-500 animate-[pulse_1.5s_infinite]" />
          BALI’S BEST TATTOO STUDIO
        </motion.div>

        {/* Main Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-8.5xl font-serif font-light text-white mb-6 uppercase leading-none tracking-tight"
        >
          Ink Your <br />
          <span className="font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-amber-500">
            Story in Bali
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xs sm:text-sm text-neutral-300 max-w-lg font-sans font-light tracking-wide mb-10 leading-relaxed"
        >
          Premium custom tattoos crafted by Bali’s finest artists.
          <span className="text-neutral-400 block mt-2">
            Wear Your Heart on Your Sleeve, and Your Art on Your Skin.
          </span>
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <button
            onClick={onBookClick}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs font-mono font-bold tracking-widest rounded-lg shadow-xl shadow-red-950/40 hover:shadow-red-600/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer uppercase"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onExplorePortfolioClick}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 text-white rounded-lg text-xs font-mono tracking-widest transition-all duration-300 cursor-pointer uppercase"
          >
            View Portfolio
          </button>

          <button
            onClick={onStartQuizClick}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.04] hover:bg-amber-500/10 text-amber-400 border border-amber-500/25 rounded-lg text-xs font-mono tracking-widest transition-all duration-300 cursor-pointer uppercase"
          >
            CONCEPTS PLANNER
          </button>
        </motion.div>
      </div>

      {/* Bottom Footer Info Row */}
      <div className="relative z-10 w-full px-6 py-6 md:px-12 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-t border-white/[0.04] bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>Jl. Raya Kerobokan No. 63 Bali, Indonesia</span>
        </div>

        {/* Ambient indicator for mobile sound */}
        <div className="sm:hidden w-full pb-2">
          <AudioToggle />
        </div>

        <div className="flex gap-6 text-[10px] font-mono tracking-wider text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Anchor className="w-3.5 h-3.5 text-neutral-600" />
            <span>TROPICAL BRUTALICS SANCTUARY</span>
          </div>
          <span>•</span>
          <span>09:00 AM - 09:00 PM WITA</span>
        </div>
      </div>
    </section>
  );
}

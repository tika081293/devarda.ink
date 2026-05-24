/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";

// Existing modules
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import StyleQuiz from "./components/StyleQuiz";
import PortfolioGallery from "./components/PortfolioGallery";
import StandardsSection from "./components/StandardsSection";
import BookingModal from "./components/BookingModal";

// New high-concept modules
import CinematicLoader from "./components/CinematicLoader";
import CustomCursor from "./components/CustomCursor";
import Testimonials from "./components/Testimonials";
import BaliExperience from "./components/BaliExperience";

// Data
import { GENERAL_FAQS } from "./data";

// Icons
import { 
  Calendar, 
  Trash2, 
  AlignJustify, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Compass, 
  ExternalLink,
  MessageSquare,
  Smartphone,
  ChevronRight,
  Clock,
  Waves
} from "lucide-react";

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preFilledBooking, setPreFilledBooking] = useState<{
    styleId: string;
    placement: string;
    size: string;
    concept: string;
    artistId: string;
  } | null>(null);

  const [localBookings, setLocalBookings] = useState<any[]>([]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Fetch local bookings
  const loadBookings = () => {
    try {
      const data = JSON.parse(localStorage.getItem("roy_bookings") || "[]");
      setLocalBookings(data);
    } catch (e) {
      setLocalBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePreFillBooking = (prefill: {
    styleId: string;
    placement: string;
    size: string;
    concept: string;
    artistId: string;
  }) => {
    setPreFilledBooking(prefill);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setPreFilledBooking(null);
    setIsBookingOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = localBookings.filter((b) => b.id !== id);
    localStorage.setItem("roy_bookings", JSON.stringify(updated));
    setLocalBookings(updated);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-gold-500 selection:text-black">
      
      {/* 1. Cinematic Loading Screen */}
      <CinematicLoader onComplete={() => setLoaderFinished(true)} />

      {/* 2. Custom Animated Mouse Follower Tracker */}
      <CustomCursor />

      {/* 3. Sticky Transparent Luxury Header (Triggers on scroll) */}
      <div
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 px-6 py-4 md:px-12 flex justify-between items-center ${
          isScrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/5 py-4 translate-y-0 shadow-lg"
            : "bg-transparent -translate-y-full"
        }`}
      >
        <a href="#hero-section" className="flex flex-col text-left">
          <span className="font-sans font-bold text-lg tracking-[0.2em] text-white">
            DEVARDA<span className="text-gold-500 font-light">.ink</span>
          </span>
        </a>

        {/* Desktop Anchor links */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-mono tracking-widest text-neutral-400">
          <a href="#about" className="hover:text-gold-500 transition-colors">ABOUT</a>
          <a href="#styles" className="hover:text-gold-500 transition-colors">PLANNER</a>
          <a href="#portfolio" className="hover:text-gold-500 transition-colors">PORTFOLIO</a>
          <a href="#testimonials" className="hover:text-gold-500 transition-colors">TESTIMONIALS</a>
          <a href="#standards" className="hover:text-gold-500 transition-colors">STANDARDS</a>
          <a 
            href="https://instagram.com/devarda.ink" 
            target="_blank" 
            rel="noreferrer" 
            className="text-neutral-300 hover:text-gold-400 transition-all flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-gold-500/10 hover:border-gold-500/30"
          >
            <Instagram className="w-3.5 h-3.5 text-gold-500 shrink-0" /> @DEVARDA.INK
          </a>
          {localBookings.length > 0 && (
            <a href="#vip-board" className="text-gold-400 hover:text-gold-500 font-extrabold transition-colors">
              MY BOARD ({localBookings.length})
            </a>
          )}
        </div>

        <button
          onClick={handleOpenGeneralBooking}
          className="px-4 py-2 border border-gold-500 bg-gold-500/10 hover:bg-gold-600 hover:text-black hover:font-semibold rounded text-[10px] font-mono tracking-widest transition-colors duration-300 cursor-pointer"
        >
          BOOK CONSULTATION
        </button>
      </div>

      {/* 4. Floating Sticky Instagram Button */}
      <a
        href="https://instagram.com/devarda.ink"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-gold-600 via-zinc-800 to-black hover:brightness-110 text-white shadow-xl shadow-gold-950/40 border border-gold-500/20 active:scale-95 transition-all group"
      >
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white rounded-full border-2 border-black animate-pulse flex items-center justify-center pointer-events-none">
          <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
        </span>
        
        {/* Slide-out tooltip helper */}
        <span className="absolute left-16 bg-stone-900 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-widest text-neutral-300 uppercase opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all origin-left pointer-events-none whitespace-nowrap shadow-xl">
          INSTAGRAM @DEVARDA.INK
        </span>
        
        <Instagram className="w-6 h-6 stroke-[2]" />
      </a>

      {/* 4. Floating Sticky WhatsApp Button with notification blinker */}
      <a
        href="https://api.whatsapp.com/send?phone=62895355596315&text=Hello%20Devarda.ink%20Bali!%20I'm%20interested%20in%20setting%20up%20a%20personal%20tattoo%20design%20consultation."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900 hover:bg-neutral-850 border border-gold-500/30 text-gold-400 shadow-xl shadow-gold-950/30 active:scale-95 transition-all group"
      >
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold-500 rounded-full border-2 border-black animate-pulse flex items-center justify-center pointer-events-none">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>
        
        {/* Slide-out tooltip helper */}
        <span className="absolute left-16 bg-stone-900 border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-widest text-neutral-300 uppercase opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all origin-left pointer-events-none whitespace-nowrap shadow-xl">
          QUICK WHATSAPP HELP
        </span>
        
        <Smartphone className="w-6 h-6 stroke-[2]" />
      </a>

      {/* 5. Floating Mobile Drawer Trigger */}
      <button
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gold-500 text-black font-semibold shadow-lg shadow-gold-950/40 active:scale-95 transition-all cursor-pointer hover:bg-gold-600"
      >
        {isMobileNavOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <AlignJustify className="w-5 h-5 stroke-[2.5]" />}
      </button>

      {/* 6. Mobile Drawer Full Screen Overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl flex flex-col justify-center items-center gap-6 text-base font-sans font-extrabold tracking-widest text-white uppercase text-center"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <span className="font-mono text-[9px] tracking-[0.45em] text-gold-500 mb-4 block">DEVARDA NAVIGATION</span>
            <a href="#about" className="hover:text-gold-400 py-1 transition-colors">ABOUT SANCTUARY</a>
            <a href="#styles" className="hover:text-gold-400 py-1 transition-colors">CONCEPT PLANNER</a>
            <a href="#portfolio" className="hover:text-gold-400 py-1 transition-colors">PORTFOLIO</a>
            <a href="#testimonials" className="hover:text-gold-400 py-1 transition-colors">TESTIMONIALS</a>
            <a href="#standards" className="hover:text-gold-400 py-1 transition-colors">HYGIENE</a>
            {localBookings.length > 0 && (
              <a href="#vip-board" className="text-gold-500 underline decoration-dashed py-1">
                MY VIP BOARDS ({localBookings.length})
              </a>
            )}
            <button
              onClick={handleOpenGeneralBooking}
              className="mt-6 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-semibold tracking-widest rounded-lg"
            >
              SECURE SLOT
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Intro */}
      <HeroSection
        onBookClick={handleOpenGeneralBooking}
        onExplorePortfolioClick={() => {
          const el = document.getElementById("portfolio");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onStartQuizClick={() => {
          const el = document.getElementById("styles");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Masonry Portfolio Grid (Moved to top with bento-grid presentation) */}
      <PortfolioGallery />

      {/* Interactive Review Slider Carousel */}
      <Testimonials />

      {/* About Section */}
      <AboutSection />

      {/* Cinematic Lifestyle Section */}
      <BaliExperience />

      {/* Sacred Styles Design Planner Quiz */}
      <StyleQuiz onPreFillBooking={handlePreFillBooking} />

      {/* Autoclave Sanitaries & Standards */}
      <StandardsSection />

      {/* Live VIP Bookings Board (Shows saved sessions retrieved locally) */}
      <section id="vip-board" className="bg-neutral-950 py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03] relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="font-mono text-[9px] tracking-[0.55em] text-gold-500 uppercase block">
              YOUR PERSONAL SPACE
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-light text-white uppercase">
              My VIP <span className="font-sans font-extrabold text-white">Board</span>
            </h2>
            <p className="text-xs text-neutral-400 font-mono max-w-sm mx-auto">
              Retrieved booking invoices stored on this device's memory.
            </p>
          </div>

          {localBookings.length > 0 ? (
            <div className="space-y-4">
              {localBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-xl bg-black border border-white/5 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6"
                >
                  <div className="space-y-3 flex-1 text-left">
                    <div className="flex gap-2 items-center flex-wrap">
                      <span className="px-2.5 py-0.5 rounded bg-gold-500 text-black font-semibold font-mono text-[9px] uppercase tracking-wider">
                        {b.id}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        Date Preferred: <strong className="text-neutral-200">{b.date}</strong> @ {b.timeSlot}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-1">
                      <div>
                        <span className="text-[9px] text-neutral-500 block">CLIENT</span>
                        <strong className="text-neutral-250 font-sans">{b.customerName}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block">WA TELEPHONE</span>
                        <strong className="text-neutral-300 font-sans text-[11px]">{b.customerPhone || "N/A"}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block">TARGET PLACEMENT</span>
                        <strong className="text-gold-500 font-sans">{b.placement || "Custom area"}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block">TIER FRAME</span>
                        <strong className="text-gold-500 text-[11px] truncate block max-w-full">{b.size}</strong>
                      </div>
                    </div>

                    {b.concept && (
                      <p className="text-xs text-neutral-400 font-sans bg-neutral-900/60 p-3.5 rounded italic border border-white/[0.02] max-w-2xl leading-relaxed">
                        Concept brief: "{b.concept}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Do you wish to delete/cancel proposal invoice ticket ${b.id}?`)) {
                          handleDeleteBooking(b.id);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900 border border-gold-500/20 hover:border-gold-500/60 hover:bg-gold-500/10 text-gold-400 text-[10px] font-mono tracking-widest rounded transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      CANCEL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-neutral-900/50 border border-white/[0.04] text-center max-w-md mx-auto space-y-4">
              <Calendar className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                No active ink slot invoices recovered on this session. Complete a design blueprint proposal to synchronise your booking.
              </p>
              <button
                onClick={handleOpenGeneralBooking}
                className="px-5 py-2.5 bg-neutral-900 border border-white/10 hover:border-white/25 text-white font-mono text-[9px] tracking-widest rounded-lg uppercase cursor-pointer"
              >
                REQUEST SLOT DISPATCH
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Accordeons Section */}
      <section className="bg-black py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03]">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.55em] text-gold-500 uppercase block">
              NOMAD ALIGNMENTS & INFO
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light uppercase text-white tracking-tight leading-none">
              FREQUENTLY ASKED <span className="font-sans font-extrabold text-white">CONCERNS</span>
            </h2>
          </div>

          <div className="space-y-4">
            {GENERAL_FAQS.map((faq, index) => {
              const works = expandedFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-white/5 bg-neutral-950 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center bg-transparent focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-sans font-bold text-white uppercase tracking-tight pr-4">
                      {faq.question}
                    </span>
                    <span className="text-gold-500 font-extrabold font-mono text-base ml-2 shrink-0">
                      {works ? "—" : "+"}
                    </span>
                  </button>

                  {works && (
                    <div className="px-6 pb-6 pt-1 border-t border-white/[0.02] text-left">
                      <p className="text-neutral-400 font-sans font-light leading-relaxed text-xs">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. Contact, Landmarks & Dark Google Map Footer */}
      <footer className="bg-black py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/[0.05] pb-16">
          
          {/* Col 1: About */}
          <div className="space-y-6 text-left">
            <div className="space-y-1">
              <span className="font-sans font-extrabold text-xl tracking-[0.25em] text-white uppercase">
                DEVARDA<span className="text-gold-500 font-light">.ink</span>
              </span>
              <p className="text-[10px] font-mono text-neutral-500 tracking-wider">KEROBOKAN, BALI</p>
            </div>
            
            <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
              Bespoke, surgical-grade tattoo alignments in Bali. Merging high-fashion Paris-inspired single needles with solid Balinese mathematical flow geometry.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com/devarda.ink"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500 transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:devardaink@gmail.com"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-gold-500 hover:border-gold-500 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="text-left py-2 text-[10px] text-neutral-500 font-mono">
              <span>HOURS: 09:00 AM - 09:00 PM WITA DAILY</span>
            </div>
          </div>

          {/* Col 2: Map landmarks & details */}
          <div className="space-y-6 text-left">
            <h4 className="font-sans font-extrabold text-xs tracking-wider text-white uppercase">
              SANCTUARY LANDMARKS
            </h4>
            
            <div className="space-y-4 text-neutral-400 font-sans font-light text-xs">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Jl. Raya Kerobokan No. 63 Bali, Indonesia</span>
              </div>
              
              {/* Grayscale styled Maps iframe embed */}
              <div className="w-full h-36 rounded-lg overflow-hidden border border-white/5 bg-neutral-950/60 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.4098906954!2d115.16016142602766!3d-8.65251642131976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23f668f4e24ef%3A0xe54dbe9fc3b6eb4e!2sJl.%20Raya%20Kerobokan%20No.63%2C%20Kerobokan%20Kelod%2C%20Kec.%20Kuta%20Utara%2C%20Kabupaten%20Badung%2C%20Bali%2080361!5e0!3m2!1sen!2sid!4v1716380601442!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) invert(0.95)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-50 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <div className="flex gap-2 items-start text-[11px] font-mono text-neutral-500 pl-1">
                <Compass className="w-3.5 h-3.5 text-neutral-600 shrink-0 mt-0.5" />
                <span>
                  7 minutes north of Canggu Beach surf strip and 5 minutes from Seminyak flagship boutiques.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Studio copyright footer line */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono tracking-wider text-neutral-600">
          <span>© 2026 DEVARDA.INK CUSTOM STUDIO • KEROBOKAN • ALL RIGHTS RESERVED.</span>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#about" className="hover:text-gold-500">TERMS & AUTOCLAVE PROTOCOLS</a>
            <span>•</span>
            <a href="#standards" className="hover:text-gold-500">HEALING MANUAL</a>
          </div>
        </div>

      </footer>

      {/* Booking Form Overlay Modal wrapper */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preFilledData={preFilledBooking}
        onBookingSuccess={loadBookings}
      />

    </div>
  );
}

import { motion } from "motion/react";
import { ShieldCheck, Heart, Sparkles, Activity, Coffee, Info } from "lucide-react";
import { SANCTUARY_STANDARDS, HOURLY_RATES } from "../data";

export default function StandardsSection() {
  return (
    <section id="standards" className="bg-neutral-950 py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Left Column: Core standard pitch */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.55em] text-gold-500 uppercase block">
                MEDICAL GRADE ASSURANCES
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tight leading-none uppercase">
                Sanctuary <br />
                <span className="font-extrabold text-white">Standards</span>
              </h2>
            </div>

            <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
              We operate above local specifications, maintaining surgical-grade sterile conditions. From air purification to vegan hypoallergenic formulas, every step of your skin alignment has been meticulously curated.
            </p>

            <div className="p-5 rounded-xl bg-stone-900/40 border border-white/5 space-y-4">
              <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">
                SPECIALTY PRICING MATRIX
              </span>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Custom Draft/Consult</span>
                  <strong className="text-[13px] tracking-widest font-extrabold text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2.5 py-0.5 rounded shadow-sm animate-pulse">FREE</strong>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Fine Line Precision Rate</span>
                  <strong className="text-white">{HOURLY_RATES.fineLineRate.split(" ")[1]} / Hr</strong>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Full Day Custom Session</span>
                  <strong className="text-gold-400">{HOURLY_RATES.customDayRate.split(" ")[1]} / Day</strong>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="pt-3.5 border-t border-white/5 space-y-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-gold-400 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" /> LIMITED PROMOTION
                </span>
                <p className="text-xs font-sans font-bold text-stone-100 tracking-wide">
                  Promotion 3 Small Tattoo Only 1 Million
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Grid list of standard details */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SANCTUARY_STANDARDS.map((std, idx) => (
              <motion.div
                key={std.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="p-6 rounded-xl bg-stone-900/40 border border-white/5 space-y-3 hover:border-gold-500/10 transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-gold-500/[0.04] border border-gold-500/20 flex items-center justify-center">
                  {idx === 0 && <ShieldCheck className="w-5 h-5 text-gold-500" />}
                  {idx === 1 && <Heart className="w-5 h-5 text-gold-500" />}
                  {idx === 2 && <Activity className="w-5 h-5 text-gold-500" />}
                  {idx === 3 && <Coffee className="w-5 h-5 text-gold-500" />}
                </div>

                <h3 className="text-sm font-sans font-extrabold text-white uppercase tracking-wider">
                  {std.title}
                </h3>
                
                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                  {std.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

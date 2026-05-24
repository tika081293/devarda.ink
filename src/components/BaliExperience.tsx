import { motion } from "motion/react";
import { Compass, Waves, Sun, Anchor } from "lucide-react";

export default function BaliExperience() {
  const experiences = [
    {
      icon: <Waves className="w-5 h-5 text-gold-500" />,
      label: "ELEMENTAL DRIFT",
      title: "Surfer Contours",
      desc: "Bali is sculpted by fierce tides. We map our geometric lines to wrap seamlessly with physical contours, capturing the fluid energy of southern ocean swells on your skin as a permanent emblem of freedom."
    },
    {
      icon: <Compass className="w-5 h-5 text-gold-500" />,
      label: "NOMAD PILGRIMAGE",
      title: "Wanderer Memory",
      desc: "For digital creators, travelers, and free spirits, a tattoo here is not just decoration. It serves as a modern talisman — a spiritual coordinates marker carrying the mystical wind of your Indonesian residency."
    },
    {
      icon: <Sun className="w-5 h-5 text-gold-500" />,
      label: "TROPICAL RITE",
      title: "Sacred Volcanic Ash",
      desc: "Under the shadow of Mt. Agung, we blend contemporary Parisian style-lines with deep traditional respects. It is a slow, therapeutic rite of passage, shaded inside a sterile black luxury oasis."
    }
  ];

  return (
    <section className="relative bg-black py-28 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/[0.03]">
      
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-gold-950/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-stone-900/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        
        {/* Editorial Title Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div className="space-y-4">
            <span className="font-mono text-[10px] tracking-[0.55em] text-gold-500 uppercase block">
              BALI LIFESTYLE & RITES
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tight leading-none uppercase">
              REBELLIOUS <br />
              <span className="font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                SOUL OF THE ISLAND
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed max-w-lg">
              Bali isn't a location, it is a spiritual tremor. The volcanic earth, heavy saltwater ocean currents, and constant incense-perfumed breeze change you. We freeze that transformation in surgical dark ink—marrying your private travel saga with pristine mathematical art.
            </p>
            <div className="flex gap-2 items-center font-hand text-xl text-neutral-500 lowercase">
              <span>inspired by Balinese currents, worn worldwide.</span>
            </div>
          </div>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-b from-stone-950 to-neutral-950 border border-white/5 overflow-hidden transition-all duration-500 hover:border-gold-500/20"
            >
              {/* Top luxury line accent */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/40 transition-all duration-700"></div>

              <div className="space-y-6">
                
                {/* Icon Circle */}
                <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-gold-500/30 group-hover:scale-105">
                  {exp.icon}
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-neutral-500 block">
                    {exp.label}
                  </span>
                  <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider">
                    {exp.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
                  {exp.desc}
                </p>

              </div>
              
              {/* Corner branding */}
              <span className="absolute bottom-4 right-4 font-mono text-[8px] tracking-wider text-white/[0.02] uppercase">
                DEVARDA LAB
              </span>
            </motion.div>
          ))}
        </div>

        {/* Fullwidth quote frame */}
        <div className="p-8 md:p-12 rounded-3xl bg-neutral-950/60 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
          <div className="space-y-2 max-w-xl text-left">
            <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">
              ADVISORY NOTE FOR ADVENTURERS
            </span>
            <h4 className="text-lg font-sans font-semibold text-white uppercase tracking-tight">
              Optimize post-ink recovery timeline
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans font-light leading-relaxed">
              To guarantee that high-end black carbon holds its flawless edge and sheen, we strictly advise planning large pieces toward the end of your Bali trip so surfing and sea spray don't interrupt early epidermal sealing.
            </p>
          </div>
          
          <a
            href="#styles"
            className="px-6 py-3.5 whitespace-nowrap bg-neutral-900 border border-white/10 hover:border-gold-500/20 text-white font-mono text-[10px] tracking-widest rounded-lg cursor-pointer transition-all duration-300 hover:text-gold-400 uppercase"
          >
            DISCOVER STYLE VIBES
          </a>
        </div>

      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { ShieldCheck, UserCheck } from "lucide-react";
import { IMAGES } from "../data";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-neutral-950 py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03] overflow-hidden">
      {/* Background radial soft gold lamp */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/[0.015] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Editorial Typography Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.55em] text-red-500 uppercase block">
                THE FOUNDATION OF DEVARDA.INK
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tight leading-tight uppercase">
                Redefining the <br />
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-amber-500">Skin Craft Experience</span>
              </h2>
              <span className="font-hand text-3xl text-amber-500/90 block lowercase tracking-widest mt-1">
                where tropical dust morphs into permanent sacred lines...
              </span>
            </div>

            <p className="text-neutral-300 font-sans font-light leading-relaxed text-sm md:text-base">
              Nestled at the vibrant intersection of Canggu and Seminyak at <strong className="text-white">Jl. Raya Kerobokan No. 63</strong>, Devarda.ink is more than a tattoo studio. It is a cinematic, dark luxury sanctuary created for digital nomads, passionate surfers, globetrotters, and those seeking spiritual or commemorative custom body art under absolute safe clinical standards.
            </p>

            <p className="text-neutral-400 font-sans font-light leading-relaxed text-sm">
              We specialize in taking abstract personal concepts—whether inspired by Bali's organic landscapes, a mathematical geometric pattern, or a highly delicate fine-line symbol—and mapping them beautifully to the human muscular anatomy, creating an elegant extension of your identity.
            </p>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/[0.04]">
              <div className="flex gap-4 items-start">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-1">CLINICAL SAFETY</h4>
                  <p className="text-[11px] text-neutral-400 font-sans font-light">Medical-grade autoclaving, 100% disposable systems, and premium vegan inks.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <UserCheck className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-white uppercase mb-1">NOMAD FRIENDLY</h4>
                  <p className="text-[11px] text-neutral-400 font-sans font-light">High speed fiber Wi-Fi network and active dermal wraps for swift beach healing.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Photo Frame Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Cinematic Large Image */}
            <div className="relative group overflow-hidden rounded-xl aspect-[4/3] border border-white/10 shadow-2xl">
              <img
                src={IMAGES.tattooProcess}
                alt="Finest Ink Crafting process"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-stone-900/65 border border-white/10 p-5 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-amber-400 uppercase block mb-1">OUR PHILOSOPHY</span>
                  <span className="text-sm font-sans font-bold text-white uppercase tracking-tight">"YOUR BODY, THE ENDURING CANVAS"</span>
                </div>
                <div className="font-mono text-xl font-extrabold text-amber-500">100%</div>
              </div>
            </div>

            {/* Behind floating gold-ish outline card */}
            <div className="absolute -bottom-4 -left-4 w-2/3 h-1/2 border-l border-b border-amber-500/20 rounded-bl-xl pointer-events-none z-[-1]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

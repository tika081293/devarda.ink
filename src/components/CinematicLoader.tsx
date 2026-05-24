import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Sparkles, Activity, Key } from "lucide-react";

const SYSTEM_LOGS = [
  { p: 12, text: "Sanctifying autoclave pressure chambers..." },
  { p: 34, text: "Calibrating surgical-grade fine needles..." },
  { p: 58, text: "Syncing non-allergen deep carbon pigments..." },
  { p: 82, text: "Perfecting Balinese natural flow geometry..." },
  { p: 95, text: "Vitals aligned. Elevating luxury lounge climate..." },
  { p: 100, text: "DEVARDA Sanctuary online." }
];

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState(SYSTEM_LOGS[0].text);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer: any;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait slightly on 100% for smooth slide-up
          timer = setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 800);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + step, 100);
        
        // Find matching status log text
        const matchedLog = [...SYSTEM_LOGS].reverse().find(log => next >= log.p);
        if (matchedLog) {
          setLogText(matchedLog.text);
        }
        return next;
      });
    }, 120);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1.0] }}
          className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Header element */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-base tracking-[0.3em] text-white">
                DEVARDA<span className="text-gold-500 font-light">.ink</span>
              </span>
              <span className="font-mono text-[8px] tracking-widest text-neutral-500 uppercase">
                KEROBOKAN, BALI
              </span>
            </div>

            <span className="font-mono text-[9px] text-gold-500/80 tracking-widest border border-gold-500/20 px-2.5 py-1 rounded bg-gold-500/[0.02]">
              CLINICAL SANCTUARY CODE • VIP
            </span>
          </div>

          {/* Centered cinematic branding */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="space-y-2"
            >
              <h2 className="font-serif text-4xl md:text-7xl font-light text-white tracking-[0.1em] uppercase leading-none">
                Symmetry <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 font-bold tracking-tight">
                  Meets Soul
                </span>
              </h2>
              <div className="flex items-center justify-center gap-1">
                <span className="font-hand text-2xl text-gold-500/90 mt-2 block lowercase">
                  indigenous whispers, luxury lines
                </span>
              </div>
            </motion.div>
          </div>

          {/* Footer loading tracker */}
          <div className="space-y-6 max-w-lg w-full mx-auto md:mx-0">
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-end font-mono">
                <span className="text-[10px] tracking-wider text-gold-500 font-medium h-4 inline-block duration-200">
                  {logText}
                </span>
                <span className="text-sm text-neutral-400 font-regular">{progress}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between text-[9px] font-mono text-neutral-600 tracking-wider text-left sm:items-center gap-2 pt-2 border-t border-white/[0.03]">
              <span>OUTLET: 8° 39' 51.5” S, 115° 9' 36.4” E</span>
              <span>ESTABLISHED 2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

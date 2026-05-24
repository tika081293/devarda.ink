import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);

  const startDrone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGainRef.current = masterGain;
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3.0); // Ultra-soft low atmospheric drone
      masterGain.connect(ctx.destination);

      // Deep celestial Bali chord: Low G, D, B notes
      const freqs = [73.42, 110.00, 146.83, 196.00];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const nodeGain = ctx.createGain();
        const biquad = ctx.createBiquadFilter();

        osc.type = idx === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow filter sweeps so it sounds like calm tide waves
        biquad.type = "lowpass";
        biquad.frequency.setValueAtTime(idx === 0 ? 250 : 400, ctx.currentTime);

        // Random panning/amplification offsets
        nodeGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.15, ctx.currentTime);

        osc.connect(nodeGain);
        nodeGain.connect(biquad);
        biquad.connect(masterGain);

        osc.start();
        oscillatorsRef.current.push(osc);
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn("AudioContext failing or blocked by browser:", e);
    }
  };

  const stopDrone = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      const g = masterGainRef.current;
      const ctx = audioCtxRef.current;
      g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0); // elegant fadeout
      
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        oscillatorsRef.current = [];
        try { ctx.close(); } catch(e) {}
        audioCtxRef.current = null;
        masterGainRef.current = null;
        setIsPlaying(false);
      }, 1100);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopDrone();
    } else {
      startDrone();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 p-2 px-3 rounded-full bg-stone-900/90 hover:bg-stone-850 border border-white/10 text-[10px] font-mono tracking-widest text-neutral-400 hover:text-gold-400 transition-all cursor-pointer shadow-lg active:scale-95 z-40"
    >
      {isPlaying ? (
        <>
          <span className="flex items-end gap-[2.5px] h-3 pr-1">
            <span className="w-[2.5px] h-1.5 bg-gold-500 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_200ms]"></span>
            <span className="w-[2.5px] h-3 bg-gold-500 rounded-full animate-[bounce_1.2s_infinite_ease-in-out_100ms]"></span>
            <span className="w-[2.5px] h-2 bg-gold-400 rounded-full animate-[bounce_1s_infinite_ease-in-out_350ms]"></span>
          </span>
          <span className="text-[9px]">SANCTUARY SOUNDS: ACTIVE</span>
          <Volume2 className="w-3.5 h-3.5 text-gold-500 ml-0.5" />
        </>
      ) : (
        <>
          <span className="text-[9px]">PLAY AMBIENT SCENERY</span>
          <VolumeX className="w-3.5 h-3.5 ml-0.5" />
        </>
      )}
    </button>
  );
}

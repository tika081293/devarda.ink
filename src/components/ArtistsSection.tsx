import { motion } from "motion/react";
import { Instagram, Languages, Award, ShieldAlert } from "lucide-react";
import { ARTISTS } from "../data";

export default function ArtistsSection() {
  return (
    <section id="artists" className="bg-black py-24 px-6 md:px-12 lg:px-24 border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header Title */}
        <div className="mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-[0.55em] text-amber-500 uppercase">
            RESIDENT MASTERS
          </span>
          <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-tight leading-none uppercase">
            The Artist <span className="font-extrabold text-white">Collective</span>
          </h2>
          <p className="text-xs text-neutral-400 font-mono tracking-widest max-w-lg mx-auto mt-2">
            International guest talent and local premium masters united by uncompromising standards.
          </p>
        </div>

        {/* Profiles Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-1 max-w-xl mx-auto gap-8 items-stretch text-left">
          {ARTISTS.map((artist, idx) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col h-full rounded-2xl bg-stone-950 border border-white/5 overflow-hidden transition-all duration-300 hover:border-amber-500/20 hover:shadow-2xl hover:shadow-amber-950/5 group"
            >
              
              {/* Profile Bio Photo */}
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Cover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                
                {/* Floating Title Inside Photo */}
                <div className="absolute bottom-6 left-6">
                  <span className="font-mono text-[9px] tracking-widest text-amber-500 uppercase block mb-1">
                    {artist.title}
                  </span>
                  <h3 className="text-2xl font-sans font-extrabold text-white uppercase tracking-tight">
                    {artist.name}
                  </h3>
                </div>
              </div>

              {/* Body details */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Bio brief */}
                  <p className="text-xs font-sans font-light text-neutral-400 leading-relaxed italic">
                    "{artist.bio}"
                  </p>

                  <div className="h-[1px] w-full bg-white/[0.04]" />

                  {/* Specialty points */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[9px] tracking-wider text-neutral-500 uppercase block">PRIMARY CAPABILITY</span>
                    <p className="text-xs font-sans font-medium text-neutral-200">
                      {artist.specialty}
                    </p>
                  </div>
                </div>

                {/* Footer Metadata row */}
                <div className="space-y-3 pt-4 border-t border-white/[0.04] text-[11px] font-mono">
                  
                  {/* Languages */}
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Languages className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>Speaks: <strong className="text-neutral-200">{artist.languages.join(", ")}</strong></span>
                  </div>

                  {/* Handle Link */}
                  <a
                    href={`https://instagram.com/${artist.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-amber-400 transition-colors duration-300 w-fit cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-neutral-500" />
                    <span>@{artist.instagram}</span>
                  </a>

                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

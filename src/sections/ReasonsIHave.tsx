import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { reasons, Reason } from "../data/reasons";
import { Sparkles, HeartHandshake, Eye, CheckCircle2 } from "lucide-react";

export default function ReasonsIHave() {
  const [selectedReason, setSelectedReason] = useState<Reason | null>(reasons[0]);

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden">
      {/* Dynamic background orbit circle guides */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-white/[0.03] animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[900px] h-[500px] md:h-[900px] rounded-full border border-white/[0.02] animate-spin-reverse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary font-sans text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Chapter III
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight italic">
            Reasons I Love You
          </h2>
          
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            In a universe of constant change, these are the absolute, unchanging anchors of my devotion.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Galaxy Workspace (7 cols) */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px] rounded-2xl border border-white/5 bg-[#0a0810]/20 backdrop-blur-md relative overflow-hidden shadow-xl p-4">
            
            {/* Ambient Galaxy core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-primary/10 to-secondary/15 rounded-full blur-3xl pointer-events-none" />

            {/* Pulsing galaxy star nodes mapped from reasons array */}
            {reasons.map((r) => {
              const isActive = selectedReason?.id === r.id;

              return (
                <div
                  key={r.id}
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.button
                    onClick={() => setSelectedReason(r)}
                    whileHover={{ scale: 1.3 }}
                    className="relative p-3 cursor-pointer group flex items-center justify-center"
                    aria-label={`Select Reason: ${r.title}`}
                  >
                    {/* Ring highlight if selected */}
                    {isActive && (
                      <motion.span
                        layoutId="activeStarRing"
                        className="absolute w-8 h-8 rounded-full border border-white/25 animate-spin-slow"
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                      />
                    )}

                    {/* Outer colored nebula glow matching star's energetic essence */}
                    <span
                      style={{ backgroundColor: r.color }}
                      className={`absolute w-6 h-6 rounded-full blur-sm opacity-40 transition-all duration-300 ${
                        isActive ? "scale-150 opacity-70" : "scale-75 group-hover:scale-110"
                      }`}
                    />

                    {/* Star Solid Core */}
                    <span
                      style={{ backgroundColor: r.color }}
                      className={`relative w-2.5 h-2.5 rounded-full shadow-lg ${
                        isActive ? "scale-125 ring-2 ring-white/60" : "group-hover:ring-1 group-hover:ring-white/40"
                      }`}
                    />

                    {/* Simple numeric label marker */}
                    <span className="absolute -bottom-4 text-[8px] font-mono font-semibold tracking-widest text-zinc-500 uppercase">
                      ST // {r.id}
                    </span>
                  </motion.button>
                </div>
              );
            })}

            {/* Quick Helper caption */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-sans">
              <Eye className="w-3.5 h-3.5 text-primary" />
              Hover or click stars to explore
            </div>
          </div>

          {/* Right Column: Information Display Panel (5 cols) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedReason ? (
                <motion.div
                  key={selectedReason.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel w-full p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[360px] bg-[#0d0c12]/90"
                >
                  {/* Color thematic glowing highlight under cards */}
                  <span
                    style={{ backgroundColor: selectedReason.color }}
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                  />

                  <div className="space-y-6">
                    {/* Panel Header */}
                    <div className="flex items-center gap-3">
                      <div
                        style={{ backgroundColor: `${selectedReason.color.replace("0.8", "0.15")}` }}
                        className="p-3 rounded-full border border-white/10 flex items-center justify-center text-white"
                      >
                        <HeartHandshake className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-primary font-semibold">
                          Celestial Anchor {selectedReason.id} of {reasons.length}
                        </span>
                        <h3 className="font-serif text-2xl text-white font-light italic tracking-tight mt-0.5">
                          {selectedReason.title}
                        </h3>
                      </div>
                    </div>

                    {/* Main messages description */}
                    <div className="space-y-4">
                      <p className="font-serif text-sm text-zinc-300 italic font-medium leading-relaxed">
                        "{selectedReason.shortDesc}"
                      </p>
                      <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                        {selectedReason.detailedMessage}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic stamp validation */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-sans">
                    <span className="flex items-center gap-1.5 text-primary">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-primary/10" />
                      Forever True
                    </span>
                    <span className="font-mono">
                      LAT // 30.06.26
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-panel w-full p-10 rounded-2xl text-center min-h-[350px] flex flex-col items-center justify-center text-zinc-400 bg-[#0d0c12]/90">
                  <HeartHandshake className="w-8 h-8 opacity-40 mb-3 text-primary" />
                  <p className="font-sans text-sm font-light">Select any star in the galaxy cluster to view details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

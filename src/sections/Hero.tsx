import { motion } from "motion/react";
import { ArrowDown, Heart, Sparkles } from "lucide-react";
import CosmicScene from "../components/CosmicScene";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* 3D Cosmic Background scene */}
      <div className="absolute inset-0 z-0">
        <CosmicScene fallbackType="hero" />
      </div>

      {/* Decorative top soft gradient */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050508] to-transparent pointer-events-none z-10" />

      {/* Header Info */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="font-serif text-2xl text-primary font-light italic tracking-tight flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
          Among The Stars
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="font-sans text-xs tracking-[0.25em] text-zinc-400 uppercase hidden sm:block font-light"
        >
          June 30, 2026
        </motion.div>
      </div>

      {/* Main Card/Overlay Text */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
          className="glass-panel max-w-2xl w-full p-8 md:p-12 text-center space-y-6 relative overflow-hidden group shadow-2xl"
        >
          {/* Celestial background aura */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-2xl pointer-events-none" />

          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="inline-flex p-3 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              <Heart className="w-6 h-6 fill-primary" />
            </motion.div>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-white font-light tracking-tight leading-tight italic">
            Happy Birthday <span className="not-italic text-primary">BUBU ❤️</span>
          </h1>

          <div className="space-y-3">
            <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed font-light">
              this is small gift from your beloved for you
            </p>
          </div>

          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreClick}
              className="px-8 py-3.5 rounded-full border border-primary/40 hover:border-primary/80 bg-primary/10 hover:bg-primary/20 text-white font-sans text-xs uppercase tracking-[0.25em] font-medium cursor-pointer transition-all duration-300 shadow-xl shadow-primary/10"
            >
              Begin Journey
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 w-full text-center pb-12">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: "easeInOut" }}
          className="inline-flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
          onClick={onExploreClick}
        >
          <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-light">
            Scroll to Explore
          </span>
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </section>
  );
}

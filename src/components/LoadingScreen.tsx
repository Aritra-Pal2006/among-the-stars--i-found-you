import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

interface LoadingScreenProps {
  onStart: () => void;
}

export default function LoadingScreen({ onStart }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] p-6 overflow-hidden">
      {/* Nebula glows matching the Artistic Flair theme */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(124,45,18,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(76,29,149,0.14)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center max-w-2xl relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-sans text-xs md:text-sm text-primary tracking-[0.3em] uppercase font-semibold"
        >
          June 30, 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.8, ease: "easeInOut" }}
          className="font-serif text-5xl md:text-7xl text-white font-light tracking-tight leading-tight italic"
        >
          A Story Written <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#fbbf24] to-secondary font-semibold font-sans not-italic text-4xl md:text-6xl tracking-wide uppercase block mt-2">
            Among The Stars
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8, duration: 1.5 }}
          className="font-sans text-sm md:text-base text-zinc-400 max-w-md mx-auto leading-relaxed font-light"
        >
          There are billions of stars in the night sky, but this is the tale of how I found the brightest one of all.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 1.0, type: "spring" }}
          className="pt-6"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#7c2d12] to-primary hover:from-primary hover:to-[#fa9144] text-white font-sans text-xs md:text-sm uppercase tracking-[0.2em] font-semibold shadow-2xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-white/10"
          >
            {/* Pulsing glow background effect */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Sparkles className="w-4 h-4 text-[#ffd700] animate-spin-slow" />
            Click To Begin
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Aesthetic bottom label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3.5, duration: 1.0 }}
        className="absolute bottom-8 text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-mono"
      >
        For My Universe • To Begin Click the Button
      </motion.div>
    </div>
  );
}

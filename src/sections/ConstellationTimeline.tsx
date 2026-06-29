import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { memories, Memory } from "../data/memories";
import { Calendar, Sparkles, X, ChevronRight, HelpCircle } from "lucide-react";
import VideoMemory from "../components/VideoMemory";

export default function ConstellationTimeline() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Generate SVG path coordinate string dynamically to connect the stars
  const getSvgPathString = () => {
    return memories
      .map((m, index) => `${index === 0 ? "M" : "L"} ${m.x}% ${m.y}%`)
      .join(" ");
  };

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden">
      {/* Background stardust glow matching the theme's palette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(124,45,18,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(76,29,149,0.06)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary font-sans text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Chapter I
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight italic">
            Our Constellation
          </h2>
          
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            Click on each glowing star to trace the constellation of memories that formed the beautiful shape of us.
          </p>
        </div>

        {/* Constellation Workspace Area */}
        <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl border border-white/5 bg-[#0a0810]/30 backdrop-blur-md p-6 overflow-hidden shadow-2xl">
          {/* Constellation Vector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d={getSvgPathString()}
              fill="none"
              stroke="rgba(242, 125, 38, 0.28)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            {/* Soft continuous gold line glow */}
            <motion.path
              d={getSvgPathString()}
              fill="none"
              stroke="rgba(242, 125, 38, 0.1)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Star Nodes */}
          {memories.map((memory, index) => {
            const isSelected = selectedMemory?.id === memory.id;

            return (
              <div
                key={memory.id}
                style={{ left: `${memory.x}%`, top: `${memory.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Node wrapper with tooltip/hover triggers */}
                <motion.button
                  whileHover={{ scale: 1.25 }}
                  onClick={() => setSelectedMemory(memory)}
                  className="relative group p-2 flex items-center justify-center cursor-pointer"
                  aria-label={`View memory: ${memory.title}`}
                >
                  {/* Glowing shockwave effect */}
                  <span className="absolute w-8 h-8 rounded-full bg-primary/10 scale-75 group-hover:scale-125 group-hover:bg-primary/20 transition-all duration-300 animate-ping-slow" />

                  {/* Star Core node */}
                  <span
                    className={`w-3.5 h-3.5 rounded-full shadow-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-white ring-4 ring-primary shadow-primary/60 scale-110"
                        : "bg-primary hover:bg-white ring-2 ring-primary/40 hover:ring-white/50 shadow-primary/40"
                    }`}
                  />

                  {/* Hover Tag labels */}
                  <span className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 bg-[#0f0e15] border border-white/10 px-3 py-1.5 rounded-md text-[10px] tracking-widest text-zinc-200 uppercase font-medium shadow-xl">
                    {memory.title}
                  </span>

                  {/* Order numbering annotation */}
                  <span className="absolute -top-6 text-[9px] font-mono font-semibold tracking-widest text-primary/70 uppercase">
                    0{index + 1}
                  </span>
                </motion.button>
              </div>
            );
          })}

          {/* Sparkly constellations indicator */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-sans">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            Click stars in sequence to trace our path
          </div>
        </div>
      </div>

      {/* Animated Modal Dialog Overlay */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blurring click-out shadow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
              className="absolute inset-0 bg-[#050508]/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 25 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="glass-panel w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10 grid grid-cols-1 md:grid-cols-12 bg-[#0d0c12]/90"
            >
              {/* Image/Video Banner Container (6 cols) */}
              <div className="md:col-span-6 relative h-64 md:h-full min-h-[250px] bg-[#121118] overflow-hidden flex items-center justify-center">
                {selectedMemory.video ? (
                  <VideoMemory
                    src={selectedMemory.video}
                    poster={selectedMemory.image}
                    className="w-full h-full"
                    autoPlay={true}
                  />
                ) : (
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#0d0c12]/20 to-[#0d0c12] pointer-events-none" />
              </div>

              {/* Memory Details Section (6 cols) */}
              <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Header info */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs text-secondary tracking-widest font-semibold uppercase font-sans">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        {selectedMemory.date}
                      </div>
                      <h3 className="font-serif text-2xl text-white font-light italic tracking-tight">
                        {selectedMemory.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setSelectedMemory(null)}
                      className="p-1.5 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/10"
                      aria-label="Close details"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Long descriptive text */}
                  <div className="space-y-3">
                    <p className="font-serif text-sm text-zinc-300 italic border-l-2 border-primary/50 pl-3 leading-relaxed">
                      "{selectedMemory.description}"
                    </p>
                    <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed max-h-[180px] overflow-y-auto pr-1 font-light">
                      {selectedMemory.details}
                    </p>
                  </div>
                </div>

                {/* Footer action button */}
                <div className="pt-2 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => {
                      // Automatically find next memory in list to navigate smoothly
                      const currentIndex = memories.findIndex((m) => m.id === selectedMemory.id);
                      const nextMemory = memories[(currentIndex + 1) % memories.length];
                      setSelectedMemory(nextMemory);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-[#fa9144] font-medium tracking-widest uppercase transition-colors group cursor-pointer font-sans"
                  >
                    Next Stardust Memory
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

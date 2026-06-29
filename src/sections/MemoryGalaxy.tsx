import { motion } from "motion/react";
import { memories } from "../data/memories";
import { Sparkles, Heart } from "lucide-react";
import VideoMemory from "../components/VideoMemory";

export default function MemoryGalaxy() {
  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,45,18,0.05)_0%,transparent_50%)]">
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Section Title Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-secondary font-sans text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Chapter II
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight italic">
            Our Memory Galaxy
          </h2>
          
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            Beautiful snippets of our timeline drifting in the cosmic canvas of my mind.
          </p>
        </div>

        {/* Bento Grid Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {memories.map((m, index) => {
            // Distribute bento grid column-spans beautifully
            // 0 -> col-span-7, 1 -> col-span-5, 2 -> col-span-5, 3 -> col-span-7, 4 -> col-span-12
            let colSpan = "md:col-span-6";
            if (index === 0 || index === 3) colSpan = "md:col-span-7";
            else if (index === 1 || index === 2) colSpan = "md:col-span-5";
            else if (index === 4) colSpan = "md:col-span-12";

            // Gentle unique floating drift timings
            const driftY = [0, index % 2 === 0 ? 8 : -8, 0];
            const duration = 4 + (index % 3) * 1.5;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                animate={{ y: driftY }}
                className={`${colSpan}`}
              >
                {/* Floating Bento Card */}
                <motion.div
                  transition={{ repeat: Infinity, duration: duration, ease: "easeInOut" }}
                  className="glass-panel group overflow-hidden rounded-2xl h-full flex flex-col justify-between border border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 duration-500 relative cursor-pointer"
                >
                  {/* Photo/Video container */}
                  <div className="relative overflow-hidden w-full h-64 md:h-80 bg-[#121118]">
                    {/* Zoom transition on hover */}
                    {m.video ? (
                      <VideoMemory
                        src={m.video}
                        poster={m.image}
                        className="w-full h-full"
                        autoPlay={true}
                      />
                    ) : (
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out filter brightness-[0.8] group-hover:brightness-[0.9]"
                      />
                    )}

                    {/* Gradient color overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/95 via-transparent to-transparent pointer-events-none" />

                    {/* Drifting tags overlay */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] uppercase font-semibold tracking-widest text-zinc-100 font-sans">
                      <Heart className="w-3 h-3 fill-primary text-primary animate-pulse" />
                      {m.date}
                    </div>
                  </div>

                  {/* Caption details panel */}
                  <div className="p-6 md:p-8 space-y-3 flex-grow bg-gradient-to-b from-[#0d0c12]/80 to-[#050508]/95">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="font-serif text-xl md:text-2xl text-white font-light italic tracking-tight">
                        {m.title}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-secondary/70">
                        MEM // 0{index + 1}
                      </span>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      {m.details}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

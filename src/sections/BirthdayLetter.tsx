import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { birthdayLetter } from "../data/letter";
import { Sparkles, Mail, ChevronUp, ChevronDown } from "lucide-react";
import CosmicScene from "../components/CosmicScene";

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(76,29,149,0.04)_0%,transparent_50%)]">
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Title Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-sans text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Chapter V
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight italic">
            The Lunar Letter
          </h2>
          
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            A letter written under the gaze of the moon. Click to open and unfold its parchment pages.
          </p>
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Moon Scene (5 cols) */}
          <div className="lg:col-span-5 h-[300px] md:h-[400px] flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/5 bg-[#0a0810]/15 backdrop-blur-md">
            <div className="absolute inset-0 pointer-events-auto">
              <CosmicScene fallbackType="moon" />
            </div>
            {/* Soft decorative label */}
            <div className="absolute bottom-4 text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-semibold font-sans">
              Interactive Lunar Halo
            </div>
          </div>

          {/* Right Column: Envelope and Unfolding Letter (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Wrapper Box */}
            <div className="relative w-full max-w-xl">
              
              {/* Envelope Container */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ y: -4 }}
                className={`w-full glass-panel p-8 rounded-2xl border transition-all duration-500 text-left shadow-2xl flex items-center justify-between cursor-pointer relative overflow-hidden ${
                  isOpen
                    ? "border-primary/40 bg-primary/10 shadow-primary/5"
                    : "border-white/10 hover:border-white/20 hover:bg-white/5"
                }`}
                aria-label="Toggle birthday letter envelope"
              >
                {/* Decorative background glow */}
                <span className="absolute -inset-10 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-4 relative z-10 font-sans">
                  <div className={`p-4 rounded-full border flex items-center justify-center transition-all ${
                    isOpen ? "bg-primary text-white border-primary/20 animate-pulse" : "bg-white/5 text-zinc-400 border-white/10"
                  }`}>
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-primary font-semibold">
                      Letter Delivery
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-white font-light italic mt-0.5">
                      To My Favorite Celestial Traveler
                    </h3>
                  </div>
                </div>

                <div className="text-zinc-400 p-2 hover:text-white relative z-10">
                  {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </div>
              </motion.button>

              {/* Unfolding Parchment Content slide transition */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="overflow-hidden w-full"
                  >
                    {/* Parchment Body Card Container */}
                    <div className="bg-gradient-to-b from-[#fdfbf7] to-[#f5f1e6] text-[#2c2a29] p-8 md:p-10 rounded-2xl border border-amber-100 shadow-xl space-y-6 relative">
                      {/* Subtle elegant paper lines background effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(44,42,41,0.03)_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none rounded-2xl" />

                      {/* Letter Salutation */}
                      <p className="font-serif text-lg md:text-xl font-medium tracking-tight text-[#5c2c16]">
                        {birthdayLetter.salutation}
                      </p>

                      {/* Letter Paragraphs mapped from dataset */}
                      <div className="space-y-4 font-serif text-sm md:text-base leading-relaxed text-[#3a3532] font-light">
                        {birthdayLetter.paragraphs.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>

                      {/* Letter Sign-Off Signature */}
                      <div className="pt-6 border-t border-[#3a3532]/10 flex flex-col items-end text-right">
                        <span className="font-serif italic text-sm text-[#5c2c16]">
                          {birthdayLetter.signOff}
                        </span>
                        <span className="font-serif font-bold text-lg text-[#5c2c16] mt-1 tracking-wide">
                          {birthdayLetter.author}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

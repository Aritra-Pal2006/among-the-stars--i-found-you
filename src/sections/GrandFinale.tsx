import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Send, CheckCircle2, Loader2 } from "lucide-react";
import CosmicScene from "../components/CosmicScene";
import eternalSkyImage from "@assets/photos/mybubu.jpg";

const FORMSPREE_FORM_ID = "mzdlvkvk";

export default function GrandFinale() {
  const [wish, setWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [starsShower, setStarsShower] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger custom magical full-screen stardust rain once the wish is launched!
  const handleSubmitWish = async (e: FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    // Send wish to Formspree
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new URLSearchParams({ wish: wish.trim() }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Formspree returned non-JSON. Your form may not be activated yet — check your email and confirm the form.");
      }
      if (!result.ok) throw new Error(result.error || "Form rejected");
    } catch (err) {
      console.error("Formspree error:", err);
      setSubmitError(true);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Generate beautiful starry trail nodes
    const showerNodes = Array.from({ length: 60 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100, // percentage horizontal
      y: Math.random() * 100, // percentage vertical
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));
    setStarsShower(showerNodes);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,45,18,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Floating stardust particle shower layer triggered on submission */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            {starsShower.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: -20, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  y: ["0vh", "110vh"],
                  x: [`${s.x}vw`, `${s.x + (Math.random() - 0.5) * 15}vw`],
                  scale: [0.5, 1.2, 0.5],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  delay: s.delay,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: s.size,
                  height: s.size,
                  backgroundColor: s.id % 2 === 0 ? "#F27D26" : "#fde047", // orange or gold stardust
                  borderRadius: "50%",
                  boxShadow: s.id % 2 === 0 ? "0 0 10px #F27D26" : "0 0 10px #fde047",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heart-shaped photo with star animation (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary font-sans text-[10px] uppercase tracking-[0.2em] font-medium">
              <Heart className="w-3.5 h-3.5 fill-primary" />
              My Eternal Sky
            </div>

            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#0a0810]/15 backdrop-blur-md">
              <svg className="absolute w-0 h-0">
                <defs>
                  <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                    <path d="M 0.5 0.15 C 0.35 0.02, 0.1 0.08, 0.08 0.25 C 0.04 0.48, 0.5 0.88, 0.5 0.88 C 0.5 0.88, 0.96 0.48, 0.92 0.25 C 0.9 0.08, 0.65 0.02, 0.5 0.15 Z" />
                  </clipPath>
                </defs>
              </svg>
              <img
                src={eternalSkyImage}
                alt="My Eternal Sky"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ clipPath: "url(#heartClip)" }}
              />
              <div className="absolute inset-0 pointer-events-auto">
                <CosmicScene fallbackType="finale" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Wish Box and final birthday greeting (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary font-sans text-[10px] uppercase tracking-[0.2em] font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-primary" />
                The Finale
              </motion.div>

              <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight italic">
                Into the Infinite
              </h2>

              <p className="font-sans text-sm md:text-base text-zinc-400 leading-relaxed font-light">
                We have walked through milestones, drifted in memories, unlocked deep secrets, and whispered lunar letters. Now, as the universe aligns for your birthday, make a wish of your own to release among the stars.
              </p>
            </div>

            {/* Interactive Wish Form Card */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="wish-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden bg-[#0d0c12]/90"
                >
                  <form onSubmit={handleSubmitWish} className="space-y-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="birthday-wish-input"
                        className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 font-sans"
                      >
                        Write your birthday wish...
                      </label>
                      <textarea
                        id="birthday-wish-input"
                        rows={3}
                        required
                        value={wish}
                        onChange={(e) => setWish(e.target.value)}
                        placeholder="I wish that our path always crosses..."
                        className="w-full bg-[#121118]/80 border border-white/10 focus:border-primary/40 rounded-xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 resize-none font-serif"
                      />
                    </div>

                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400/80 text-xs font-sans text-center"
                      >
                        Could not send wish. Check the browser console (F12) for details, and make sure you confirmed the Formspree form via email.
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Release to the Universe
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="wish-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel p-8 rounded-2xl border border-primary/30 bg-[#0d0c12]/95 text-center space-y-4 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.15)_0%,transparent_60%)] pointer-events-none" />
                  
                  <div className="flex justify-center">
                    <div className="p-3 bg-primary/15 rounded-full border border-primary/30 text-primary animate-bounce">
                      <CheckCircle2 className="w-8 h-8 fill-primary/10" />
                    </div>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h3 className="font-serif text-2xl text-white font-light italic tracking-tight">
                      Wish Released Safely ❤️
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      Your wish has been launched and is currently orbiting the galaxy. May all your dreams find their coordinates, today and forever.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setWish("");
                        setIsSubmitted(false);
                        setSubmitError(false);
                      }}
                      className="px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 text-[10px] tracking-widest text-zinc-400 hover:text-white uppercase font-bold cursor-pointer transition-colors font-sans"
                    >
                      Make Another Wish
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cinematic Ending note */}
            <div className="pt-6 border-t border-white/5 text-center lg:text-left text-[10px] tracking-widest text-zinc-500 uppercase font-sans font-semibold">
              Designed with love • Happy Birthday, My Universe
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

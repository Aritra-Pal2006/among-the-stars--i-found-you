import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Sparkles } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";
import CelestialBackground from "./components/CelestialBackground";
import AudioPlayer from "./components/AudioPlayer";
import Hero from "./sections/Hero";
import ConstellationTimeline from "./sections/ConstellationTimeline";
import MemoryGalaxy from "./sections/MemoryGalaxy";
import ReasonsIHave from "./sections/ReasonsIHave";
import SecretStar from "./sections/SecretStar";
import BirthdayLetter from "./sections/BirthdayLetter";
import GrandFinale from "./sections/GrandFinale";

const CORRECT_PASSWORD = "NIZAM";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleExploreClick = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508] p-6 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(124,45,18,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(76,29,149,0.14)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="glass-panel max-w-md w-full p-8 md:p-10 text-center space-y-6 relative z-10 shadow-2xl"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="p-4 rounded-full bg-primary/10 border border-primary/20"
            >
              <Lock className="w-8 h-8 text-primary" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl text-white font-light italic tracking-tight">
              Locked Message
            </h1>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
              Enter the password to open this gift
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter password"
                className="w-full bg-[#121118]/80 border border-white/10 focus:border-primary/40 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-center tracking-widest font-mono"
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400/80 text-xs font-sans"
                >
                  Wrong password. Try again.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-sans text-xs uppercase tracking-widest font-semibold shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Unlock
            </button>
          </form>

          <p className="font-sans text-[10px] text-zinc-500 leading-relaxed font-light italic">
            Hint: the place you accepted me (the name of the restaurant in caps)
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-on-background selection:bg-primary/30 selection:text-white font-sans overflow-x-hidden antialiased">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full"
          >
            {/* Cinematic background stargaze generator */}
            <CelestialBackground />

            {/* Float ambient love synthesizer controls */}
            <AudioPlayer />

            {/* Continuous cinematic interactive layout sections */}
            <div className="relative z-10 w-full">
              <Hero onExploreClick={handleExploreClick} />

              <div ref={timelineRef} id="timeline-section">
                <ConstellationTimeline />
              </div>

              <MemoryGalaxy />

              <ReasonsIHave />

              <SecretStar />

              <BirthdayLetter />

              <GrandFinale />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

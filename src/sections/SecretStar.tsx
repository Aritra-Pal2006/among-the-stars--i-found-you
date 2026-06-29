import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, Lock, Volume2, ShieldCheck, HelpCircle } from "lucide-react";
import CosmicScene from "../components/CosmicScene";
import voiceNote from "@assets/voice/bubu.m4a";

export default function SecretStar() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleVoicePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isVoicePlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.warn);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setVoiceProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio?.duration) setVoiceDuration(audio.duration);
  };

  const handleAudioEnd = () => {
    setIsVoicePlaying(false);
    setVoiceProgress(0);
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(76,29,149,0.06)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Title Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-secondary font-sans text-[10px] uppercase tracking-[0.2em] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
            Chapter IV
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light tracking-tight italic">
            The Secret Star
          </h2>
          
          <p className="font-sans text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            Deep in the dark space, there exists a locked coordinate. Click to wake the hidden star and uncover its secret transmission.
          </p>
        </div>

        {/* Workspace Canvas / Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Awakening Star Canvas (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square rounded-full border border-white/5 bg-[#0a0810]/15 backdrop-blur-md p-8 flex items-center justify-center shadow-xl">
              
              {/* Pulsing orbital guidelines */}
              <div className="absolute inset-4 rounded-full border border-dashed border-white/5 animate-spin-slow" />
              <div className="absolute inset-10 rounded-full border border-dashed border-secondary/10 animate-spin-reverse-slow" />

              {/* 3D Spline Scene wrapper inside container */}
              <div className="absolute inset-0 z-0 pointer-events-auto">
                <CosmicScene fallbackType="star" />
              </div>

              {/* Glowing Interactive Lock Star Button Core */}
              <motion.button
                onClick={() => setIsUnlocked(true)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-700 shadow-2xl cursor-pointer ${
                  isUnlocked
                    ? "bg-gradient-to-r from-primary/35 to-secondary/35 border border-primary/40 shadow-primary/30 scale-105"
                    : "bg-[#0d0c12]/90 hover:bg-[#121118] border border-white/10 hover:border-white/20 hover:shadow-white/5"
                }`}
                aria-label="Unlock the secret star"
              >
                <AnimatePresence mode="wait">
                  {isUnlocked ? (
                    <motion.div
                      key="unlocked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col items-center gap-1 font-sans"
                    >
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                      <span className="text-[9px] uppercase font-semibold tracking-widest text-primary">
                        Awake
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="locked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col items-center gap-1.5 font-sans"
                    >
                      <Lock className="w-8 h-8 text-zinc-500 group-hover:text-white" />
                      <span className="text-[9px] uppercase font-semibold tracking-widest text-zinc-500">
                        Unlock
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Right Column: Revealing Message Envelope (6 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isUnlocked ? (
                <motion.div
                  key="envelope"
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -35 }}
                  transition={{ type: "spring", damping: 20, stiffness: 120 }}
                  className="glass-panel w-full p-8 md:p-10 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/5 relative overflow-hidden flex flex-col gap-6 bg-[#0d0c12]/95"
                >
                  {/* Decorative corner tag info */}
                  <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-primary uppercase font-semibold pb-4 border-b border-white/5 font-sans">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      Encrypted Transmission Opened
                    </span>
                    <span>ST // 04.18</span>
                  </div>

                  {/* Secret romantic image mock visual */}
                  <div className="relative rounded-xl overflow-hidden h-40 bg-[#121118] border border-white/10 group">
                    <img
                      src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=800"
                      alt="Cosmic Night Stargazing"
                      className="w-full h-full object-cover group-hover:scale-105 duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c12] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Caption inside photo */}
                    <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 text-[10px] text-white font-medium bg-black/55 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/5 font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      "My favorite view is you."
                    </div>
                  </div>

                  {/* Simulated Audio/Voice note player widget */}
                  <div className="space-y-3 font-sans">
                    <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                      Play Voice note transcription
                    </span>

                    {/* Hidden audio element */}
                    <audio
                      ref={audioRef}
                      src={voiceNote}
                      onPlay={() => setIsVoicePlaying(true)}
                      onPause={() => setIsVoicePlaying(false)}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={handleAudioEnd}
                      preload="auto"
                    />

                    {/* Playbar Container */}
                    <div className="glass-panel-sub p-4 rounded-xl border border-white/5 flex items-center gap-4 bg-[#0a0810]/50">
                      <button
                        onClick={toggleVoicePlayback}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer border border-transparent transition-all duration-300 ${
                          isVoicePlaying
                            ? "bg-primary text-white hover:bg-[#fa9144]"
                            : "bg-[#121118] text-zinc-300 hover:bg-white/5 border-white/10"
                        }`}
                        aria-label="Toggle sound clip play state"
                      >
                        {isVoicePlaying ? (
                          <span className="w-3 h-3 bg-white rounded-sm" /> // Stop icon
                        ) : (
                          <span className="border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" /> // Play icon
                        )}
                      </button>

                      {/* Sound Wave slider tracking visual */}
                      <div className="flex-grow space-y-1">
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: `${voiceProgress}%` }}
                            transition={{ duration: 0.1 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                        <div className="flex justify-between text-[8px] text-zinc-500 font-semibold uppercase font-mono tracking-widest">
                          <span>{isVoicePlaying ? "Playing" : formatTime(audioRef.current?.currentTime || 0)}</span>
                          <span>{formatTime(voiceDuration)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive typewriter style secret message text */}
                    <p className="font-serif text-sm md:text-base text-zinc-300 italic leading-relaxed pt-2 border-t border-white/5">
                      "I hid this message here to tell you that long before we even met, my heart was looking for you. Finding you among the stars wasn't just luck—it was destiny written across the skies. Happy Birthday, my love."
                    </p>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="locked-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-panel w-full p-10 rounded-2xl text-center min-h-[350px] flex flex-col items-center justify-center space-y-4 border border-dashed border-white/10 bg-[#0d0c12]/90 font-sans"
                >
                  <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <Lock className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-light italic tracking-tight">
                    Secret Message Encrypted
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-zinc-400 max-w-xs leading-relaxed font-light">
                    Click and wake the interactive star on the left to decrypt the loving voice-envelope transmission.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

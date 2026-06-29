import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Play a soft, beautiful romantic chord progression (Cmaj7 -> Gsus4 -> Am7 -> Fmaj7)
  // Synthesizes a soothing music-box/celesta sound in key of C Major / A Minor
  const startSynth = () => {
    try {
      // Create audio context if it doesn't exist
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        const audioCtx = new AudioContextClass();
        audioCtxRef.current = audioCtx;

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime); // Master volume set safely low
        gainNode.connect(audioCtx.destination);
        gainNodeRef.current = gainNode;
      }

      const ctx = audioCtxRef.current;
      const masterGain = gainNodeRef.current;
      if (!ctx || !masterGain) return;

      // Resume context if suspended (browser security restriction)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [
        // Progression 1: Cmaj7 arpeggio
        [261.63, 329.63, 392.00, 493.88], // C4, E4, G4, B4
        // Progression 2: Gsus4 arpeggio
        [293.66, 392.00, 440.00, 587.33], // D4, G4, A4, D5
        // Progression 3: Am7 arpeggio
        [220.00, 261.63, 329.63, 392.00], // A3, C4, E4, G4
        // Progression 4: Fmaj7 arpeggio
        [349.23, 440.00, 523.25, 659.25], // F4, A4, C5, E5
      ];

      let chordIndex = 0;
      let stepIndex = 0;

      const playStep = () => {
        if (!isPlaying && audioCtxRef.current?.state === "running") {
          // Double check play state
        }

        const chord = notes[chordIndex];
        const noteFreq = chord[stepIndex % chord.length];

        // Synthesize single celesta sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const delay = ctx.createDelay();
        const feedback = ctx.createGain();

        // Music box oscillator configuration
        osc.type = "sine";
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        // Add a slight frequency modulation for retro space warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 1.8; // 1.8Hz wobble
        lfoGain.gain.value = 1.5; // slight detune
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        // Custom filter for soft, warm tone (cuts harsh high frequencies)
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, ctx.currentTime);

        // Celeste envelope: instant attack, long natural release decay
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

        // Spatial delay/echo node for deep stardust space feeling
        delay.delayTime.value = 0.45; // 450ms echo
        feedback.gain.value = 0.4;    // 40% feedback decay

        // Connections
        osc.connect(filter);
        filter.connect(gain);
        
        // Connect to delay line
        gain.connect(delay);
        delay.connect(feedback);
        feedback.connect(delay); // Loop
        
        // Connect both dry (clean) and wet (delayed) to master output
        gain.connect(masterGain);
        delay.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 3.2);
        lfo.stop(ctx.currentTime + 3.2);

        stepIndex++;
        if (stepIndex % 4 === 0) {
          // Switch to next chord in progression after 4 notes
          chordIndex = (chordIndex + 1) % notes.length;
        }
      };

      // Set beat rhythm timer (approx. 500ms per note, creating a slow beautiful arpeggio)
      const intervalId = window.setInterval(playStep, 550);
      synthIntervalRef.current = intervalId;

    } catch (e) {
      console.error("Web Audio API not supported or blocked: ", e);
    }
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    // Fade out audio node smoothly
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Small delay to allow gain resetting
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0.18, audioCtxRef.current.currentTime);
      }
      startSynth();
    } else {
      stopSynth();
    }

    return () => stopSynth();
  }, [isPlaying]);

  return (
    <button
      onClick={togglePlayback}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full border shadow-lg cursor-pointer transition-all duration-500 flex items-center justify-center gap-2 ${
        isPlaying
          ? "bg-primary/20 border-primary/40 text-primary hover:bg-primary/30 shadow-primary/20 scale-105"
          : "bg-surface-container-low/80 border-white/10 text-on-surface/60 hover:text-white hover:bg-white/5"
      }`}
      aria-label="Toggle ambient love music"
      title={isPlaying ? "Mute Cosmic Music" : "Play Cosmic Music"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-5 h-5 animate-pulse" />
          <span className="font-label-sm text-[10px] uppercase tracking-wider hidden sm:inline text-primary">
            Music Playing
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-5 h-5" />
          <span className="font-label-sm text-[10px] uppercase tracking-wider hidden sm:inline text-on-surface/50">
            Music Off
          </span>
        </>
      )}
    </button>
  );
}

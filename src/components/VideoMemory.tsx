import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";

interface VideoMemoryProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
}

export default function VideoMemory({
  src,
  poster,
  className = "",
  autoPlay = true,
}: VideoMemoryProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlay); // Default to muted if autoplaying
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  // Sync state if video handles autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const handleDurationChange = () => setDuration(video.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("ended", handleEnded);

    // Initial check (especially if autoplay was triggered instantly by the browser)
    setIsPlaying(!video.paused);
    setIsMuted(video.muted);
    if (video.duration) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  // Handle Play / Pause
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      if (hasEnded) {
        video.currentTime = 0;
        setHasEnded(false);
      }
      video.play().catch((err) => {
        console.warn("Autoplay or interaction play blocked: ", err);
      });
    }
  };

  // Handle Mute / Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Handle Scrubber/Timeline change
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const newPercentage = parseFloat(e.target.value);
    const newTime = (newPercentage / 100) * duration;
    video.currentTime = newTime;
    setProgress(newPercentage);
    setCurrentTime(newTime);
  };

  // Format Time
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Fullscreen trigger
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      id="video-memory-container"
      className={`relative w-full h-full overflow-hidden select-none bg-black group/video ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
    >
      {/* Actual HTML5 Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover cursor-pointer"
        autoPlay={autoPlay}
        loop={!hasEnded}
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />

      {/* Ambient shadow gradient at bottom (controls background) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Large play overlay center button */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
          !isPlaying || isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md cursor-pointer hover:bg-primary/20 hover:border-primary/40 active:scale-95 transition-all duration-300 pointer-events-auto shadow-lg"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {hasEnded ? (
            <RotateCcw className="w-6 h-6 text-primary" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
          )}
        </button>
      </div>

      {/* Customized Video Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-3 transition-all duration-300 transform backdrop-blur-sm bg-black/30 border-t border-white/5 ${
          isHovered || !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Progress Slider (Timeline Scrub) */}
        <div className="flex items-center gap-2 group/slider w-full">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleScrubChange}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary hover:h-1.5 transition-all outline-none"
            style={{
              background: `linear-gradient(to right, #F27D26 0%, #F27D26 ${progress}%, rgba(255, 255, 255, 0.2) ${progress}%, rgba(255, 255, 255, 0.2) 100%)`,
            }}
          />
        </div>

        {/* Playback Settings & Info Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause control */}
            <button
              onClick={togglePlay}
              className="text-zinc-300 hover:text-primary transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-zinc-300" />}
            </button>

            {/* Mute/Unmute control */}
            <button
              onClick={toggleMute}
              className="text-zinc-300 hover:text-primary transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Timestamps */}
            <span className="text-[10px] font-mono text-zinc-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Fullscreen control */}
            <button
              onClick={toggleFullscreen}
              className="text-zinc-300 hover:text-primary transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";

interface CosmicSceneProps {
  sceneUrl?: string; // Optional Spline Scene URL
  fallbackType: "hero" | "star" | "moon" | "finale";
}

export default function CosmicScene({ sceneUrl, fallbackType }: CosmicSceneProps) {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(!sceneUrl); // If no sceneUrl, go straight to beautiful WebGL
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // If we are using the Spline Viewer, load the external script dynamically
    if (sceneUrl && !useFallback) {
      const scriptId = "spline-viewer-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "module";
        script.src = "https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js";
        document.head.appendChild(script);
      }

      // Set a safety timeout: if Spline fails to load within 4.5 seconds, fall back gracefully
      const timer = setTimeout(() => {
        if (!isSplineLoaded) {
          setUseFallback(true);
        }
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [sceneUrl, useFallback, isSplineLoaded]);

  // Fallback WebGL Particle and Shape rendering for high-performance devices
  useEffect(() => {
    if (!useFallback) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 500;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    window.addEventListener("resize", handleResize);

    // Setup falling stars or interactive particles based on type
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay?: number;
      phase?: number;
      speedPhase?: number;
    }

    const particles: Particle[] = [];

    // Initialize scene particles
    if (fallbackType === "hero") {
      // Rotating galaxy cluster
      for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 180;
        particles.push({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          vx: angle, // Use vx as current angle
          vy: distance, // Use vy as original distance
          radius: Math.random() * 2 + 0.5,
          color: i % 3 === 0 ? "197, 192, 255" : i % 3 === 1 ? "250, 178, 208" : "253, 224, 71",
          alpha: Math.random() * 0.7 + 0.3,
          phase: Math.random() * Math.PI,
          speedPhase: 0.003 + Math.random() * 0.005,
        });
      }
    } else if (fallbackType === "star") {
      // Pulsing stardust nebula
      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 120;
        particles.push({
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 3 + 1,
          color: "197, 192, 255",
          alpha: Math.random() * 0.6 + 0.2,
          decay: 0.002 + Math.random() * 0.004,
        });
      }
    } else if (fallbackType === "moon") {
      // Floating stardust halo
      for (let i = 0; i < 80; i++) {
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: Math.cos(angle) * 110,
          y: Math.sin(angle) * 110,
          vx: angle,
          vy: 110 + (Math.random() - 0.5) * 20, // distance range
          radius: Math.random() * 1.5 + 0.5,
          color: "255, 255, 255",
          alpha: Math.random() * 0.5 + 0.2,
          speedPhase: 0.001 + Math.random() * 0.003,
        });
      }
    } else if (fallbackType === "finale") {
      // Floating glowing heart and lanterns
      for (let i = 0; i < 120; i++) {
        // Heart shape math: parametric equations
        const t = (i / 120) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        particles.push({
          x: x * 8, // scale factor
          y: -y * 8, // invert y for canvas drawing orientation
          vx: x,
          vy: y,
          radius: Math.random() * 2 + 1,
          color: i % 2 === 0 ? "250, 178, 208" : "197, 192, 255", // Pink/Lavender heart
          alpha: Math.random() * 0.5 + 0.5,
          phase: Math.random() * Math.PI,
        });
      }
    }

    // Interactive mouse tracking
    let mx = 0;
    let my = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left - width / 2;
      my = e.clientY - rect.top - height / 2;
    };
    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);

    let frame = 0;
    function draw() {
      frame++;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, width, height);

      // Translate origin to center of container
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Render custom artwork
      if (fallbackType === "hero") {
        // Render large glowing cosmic core in center
        const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 120);
        coreGlow.addColorStop(0, "rgba(109, 93, 252, 0.45)");
        coreGlow.addColorStop(0.5, "rgba(244, 114, 182, 0.15)");
        coreGlow.addColorStop(1, "rgba(5, 8, 22, 0)");
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 120, 0, Math.PI * 2);
        ctx.fill();

        // Rotate and draw galaxy particles
        particles.forEach((p) => {
          p.vx += p.speedPhase || 0.005; // increment angle
          const wobble = Math.sin((p.phase || 0) + frame * 0.01) * 8;
          const currentDist = p.vy + wobble;

          // Mouse attraction/repulsion
          const targetX = Math.cos(p.vx) * currentDist + mx * 0.12;
          const targetY = Math.sin(p.vx) * currentDist + my * 0.12;

          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(targetX, targetY, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (fallbackType === "star") {
        // Draw magical central pulsing star
        const pulse = 1 + Math.sin(frame * 0.03) * 0.15;
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 90 * pulse);
        grad.addColorStop(0, "rgba(253, 224, 71, 0.85)"); // Gold center
        grad.addColorStop(0.2, "rgba(250, 178, 208, 0.4)"); // Soft Pink halo
        grad.addColorStop(0.6, "rgba(109, 93, 252, 0.15)"); // Lavender edge
        grad.addColorStop(1, "rgba(5, 8, 22, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 90 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Magical star vectors (points)
        ctx.strokeStyle = "rgba(253, 224, 71, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Drawing a 4-point star lens flare
        ctx.moveTo(0, -120 * pulse);
        ctx.lineTo(0, 120 * pulse);
        ctx.moveTo(-120 * pulse, 0);
        ctx.lineTo(120 * pulse, 0);
        ctx.stroke();

        // Nebula drift particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          // Slow orbit
          const angle = 0.001;
          const rx = p.x * Math.cos(angle) - p.y * Math.sin(angle);
          const ry = p.x * Math.sin(angle) + p.y * Math.cos(angle);
          p.x = rx;
          p.y = ry;

          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x + mx * 0.15, p.y + my * 0.15, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (fallbackType === "moon") {
        // Stunning glowing moon with crater shading
        const size = 110;
        const pulse = Math.sin(frame * 0.015) * 3;

        // Moon outer glow
        const glow = ctx.createRadialGradient(0, 0, size - 20, 0, 0, size + 50);
        glow.addColorStop(0, "rgba(197, 192, 255, 0.35)");
        glow.addColorStop(1, "rgba(5, 8, 22, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, size + 50, 0, Math.PI * 2);
        ctx.fill();

        // Moon body (pearly lavender off-white)
        ctx.fillStyle = "#e2e1f5";
        ctx.shadowColor = "rgba(109, 93, 252, 0.5)";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw detailed moon craters
        ctx.fillStyle = "rgba(172, 168, 219, 0.4)";
        const craters = [
          { x: -35, y: -40, r: 18 },
          { x: 45, y: 35, r: 24 },
          { x: -50, y: 25, r: 12 },
          { x: 15, y: -65, r: 14 },
          { x: 55, y: -25, r: 10 },
          { x: -10, y: 10, r: 30 },
          { x: 10, y: 55, r: 8 },
        ];

        craters.forEach((crater) => {
          ctx.beginPath();
          // Add a tiny shadow on craters for 3D depth
          ctx.arc(crater.x, crater.y, crater.r, 0, Math.PI * 2);
          ctx.fill();

          // Highlight edge of crater
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(crater.x + 1.5, crater.y + 1.5, crater.r, 0.75 * Math.PI, 1.75 * Math.PI);
          ctx.stroke();
        });

        // Orbiting moon dust particles
        particles.forEach((p) => {
          p.vx += p.speedPhase || 0.002;
          const px = Math.cos(p.vx) * (p.vy + pulse) + mx * 0.08;
          const py = Math.sin(p.vx) * (p.vy + pulse) * 0.35 + my * 0.08; // elliptical squashed orbit

          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (fallbackType === "finale") {
        // Pulsing glowing heart constellation
        const pulse = 1 + Math.sin(frame * 0.025) * 0.06;

        particles.forEach((p, index) => {
          const wobble = Math.sin((p.phase || 0) + frame * 0.04) * 3;
          const px = p.x * pulse + wobble + mx * 0.1;
          const py = p.y * pulse + wobble + my * 0.1;

          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.radius + (wobble > 0 ? 0.5 : 0), 0, Math.PI * 2);
          ctx.fill();

          // Connect nodes occasionally with thin starlight threads
          if (index < particles.length - 1 && index % 6 === 0) {
            const nextP = particles[index + 6] || particles[0];
            const npx = nextP.x * pulse + mx * 0.1;
            const npy = nextP.y * pulse + my * 0.1;

            ctx.strokeStyle = "rgba(250, 178, 208, 0.12)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(npx, npy);
            ctx.stroke();
          }
        });

        // Floating lantern orbs drifting upwards
        ctx.fillStyle = "rgba(253, 224, 71, 0.03)";
        for (let i = 0; i < 3; i++) {
          const ly = ((frame * 0.8 + i * 150) % (height + 100)) - height / 2 - 50;
          const lx = Math.sin(frame * 0.005 + i) * 80 + (i - 1) * 120;
          const lanternGlow = ctx.createRadialGradient(lx, ly, 0, lx, ly, 40);
          lanternGlow.addColorStop(0, "rgba(253, 224, 71, 0.35)");
          lanternGlow.addColorStop(0.5, "rgba(239, 68, 68, 0.08)");
          lanternGlow.addColorStop(1, "rgba(5, 8, 22, 0)");

          ctx.fillStyle = lanternGlow;
          ctx.beginPath();
          ctx.arc(lx, ly, 40, 0, Math.PI * 2);
          ctx.fill();

          // Lantern flame core
          ctx.fillStyle = "rgba(255, 243, 205, 0.8)";
          ctx.beginPath();
          ctx.arc(lx, ly, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [useFallback, fallbackType]);

  if (useFallback) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain" />
      </div>
    );
  }

  // Spline Viewer implementation
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isSplineLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
          <span className="font-label-sm text-xs tracking-widest text-on-surface-variant uppercase">
            Loading Constellation...
          </span>
        </div>
      )}

      {/* spline-viewer is standard HTML component loaded from Spline unpkg library */}
      {/* @ts-ignore */}
      <spline-viewer
        url={sceneUrl}
        loading-events="true"
        onLoad={() => setIsSplineLoaded(true)}
        className="w-full h-full"
      />
    </div>
  );
}

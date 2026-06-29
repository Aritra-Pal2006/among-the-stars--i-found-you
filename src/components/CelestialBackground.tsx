import { useEffect, useRef } from "react";

export default function CelestialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Optimize for mobile screens
    const isMobile = width < 768;
    const starCount = isMobile ? 80 : 250;
    const nebulaCount = isMobile ? 2 : 4;

    interface Star {
      x: number;
      y: number;
      size: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
      speedY: number;
    }

    interface Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      active: boolean;
      angle: number;
    }

    // Generate stars
    const stars: Star[] = [];
    const colors = [
      "rgba(197, 192, 255, ", // Lavender
      "rgba(250, 178, 208, ", // Pink
      "rgba(253, 224, 71, ",  // Yellow/Gold
      "rgba(255, 255, 255, ", // White
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.2,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: (0.02 + Math.random() * 0.05) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    // Generate nebulae (giant soft glowing orbs)
    const nebulae: Nebula[] = [];
    const nebulaColors = [
      "rgba(76, 29, 149, 0.15)",   // Deep Violet (#4c1d95)
      "rgba(124, 45, 18, 0.12)",   // Deep Rust/Orange (#7c2d12)
      "rgba(30, 27, 75, 0.14)",    // Deep Purple-Blue (#1e1b4b)
      "rgba(69, 26, 3, 0.1)",      // Soft Copper/Amber (#451a03)
    ];

    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (isMobile ? 150 : 350) + Math.random() * (isMobile ? 100 : 250),
        color: nebulaColors[i % nebulaColors.length],
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    // Shooting star setup
    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      opacity: 0,
      active: false,
      angle: Math.PI / 4, // 45 degrees downward right
    };

    function triggerShootingStar() {
      shootingStar.x = Math.random() * width * 0.8;
      shootingStar.y = Math.random() * height * 0.4;
      shootingStar.length = 80 + Math.random() * 100;
      shootingStar.speed = 12 + Math.random() * 15;
      shootingStar.opacity = 1.0;
      shootingStar.active = true;
      shootingStar.angle = (Math.PI / 6) + Math.random() * (Math.PI / 6); // 30 to 60 degrees down-right
    }

    // Interactive cursor star trails setup
    interface TrailParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      angle: number;
      twinkleOffset: number;
    }

    const trailParticles: TrailParticle[] = [];
    const trailColors = [
      "rgba(242, 125, 38, ",  // Brand Orange/Gold (#F27D26)
      "rgba(253, 224, 71, ",  // Warm Yellow/Gold (#fde047)
      "rgba(197, 192, 255, ", // Lilac/Lavender (#c5c0ff)
      "rgba(250, 178, 208, ", // Pastel Pink (#fab2d0)
      "rgba(255, 255, 255, ", // Celestial White
    ];

    let realMouseX = -100;
    let realMouseY = -100;
    let lastMouseX = -100;
    let lastMouseY = -100;
    let mouseActive = false;

    // Mouse movement influence (subtle parallax)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
      realMouseX = e.clientX;
      realMouseY = e.clientY;
      mouseActive = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        targetMouseX = (touch.clientX - width / 2) * 0.05;
        targetMouseY = (touch.clientY - height / 2) * 0.05;
        realMouseX = touch.clientX;
        realMouseY = touch.clientY;
        mouseActive = true;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        realMouseX = touch.clientX;
        realMouseY = touch.clientY;
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
        mouseActive = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let frames = 0;
    function render() {
      frames++;
      if (!ctx || !canvas) return;

      // Soft trail for motion blur (adds deep cosmic feeling)
      ctx.fillStyle = "#050508";
      ctx.fillRect(0, 0, width, height);

      // Render Nebulae (Background Layer)
      nebulae.forEach((nebula) => {
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        // Bounce off bounds
        if (nebula.x < -nebula.radius) nebula.vx *= -1;
        if (nebula.x > width + nebula.radius) nebula.vx *= -1;
        if (nebula.y < -nebula.radius) nebula.vy *= -1;
        if (nebula.y > height + nebula.radius) nebula.vy *= -1;

        const grad = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );
        grad.addColorStop(0, nebula.color);
        grad.addColorStop(1, "rgba(5, 8, 22, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Render Twinkling Stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        star.y += star.speedY;

        // Wrap around bounds
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const brightness = Math.abs(Math.sin(star.phase));
        ctx.fillStyle = `${star.color}${brightness})`;

        ctx.beginPath();
        // Add mouse offset for star layers (deeper layers move slower)
        const depthFactor = star.size * 0.4;
        const drawX = (star.x + mouseX * depthFactor + width) % width;
        const drawY = (star.y + mouseY * depthFactor + height) % height;

        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Give key stellar elements a gentle lens-flare cross
        if (star.size > 1.6 && brightness > 0.8) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(brightness - 0.8) * 2})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(drawX - 4, drawY);
          ctx.lineTo(drawX + 4, drawY);
          ctx.moveTo(drawX, drawY - 4);
          ctx.lineTo(drawX, drawY + 4);
          ctx.stroke();
        }
      });

      // Handle and Render Shooting Stars
      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0) {
          shootingStar.active = false;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
          );
          ctx.stroke();

          // Subtle head glow
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (frames % 400 === 0 && Math.random() > 0.3) {
        // Occasionally trigger shooting star
        triggerShootingStar();
      }

      // Generate and update interactive star trails
      if (mouseActive && realMouseX !== -100 && realMouseY !== -100) {
        if (lastMouseX === -100 || lastMouseY === -100) {
          lastMouseX = realMouseX;
          lastMouseY = realMouseY;
        }

        const dx = realMouseX - lastMouseX;
        const dy = realMouseY - lastMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interpolate steps based on distance to maintain continuous trail
        const stepDist = isMobile ? 12 : 6;
        const steps = Math.min(Math.floor(distance / stepDist), isMobile ? 4 : 12);

        for (let i = 0; i <= steps; i++) {
          const ratio = steps === 0 ? 1 : i / steps;
          const px = lastMouseX + dx * ratio;
          const py = lastMouseY + dy * ratio;

          // Mobile responsive ceiling on particle counts for optimal performance
          const maxTrailCount = isMobile ? 25 : 85;
          if (trailParticles.length < maxTrailCount) {
            const angle = Math.random() * Math.PI * 2;
            const spreadSpeed = Math.random() * (isMobile ? 0.4 : 0.8) + 0.1;
            
            trailParticles.push({
              x: px,
              y: py,
              vx: Math.cos(angle) * spreadSpeed + (Math.random() - 0.5) * 0.1,
              vy: Math.sin(angle) * spreadSpeed - (Math.random() * 0.15 + 0.05), // drift slightly upwards
              size: Math.random() * (isMobile ? 1.5 : 2.8) + 0.6,
              color: trailColors[Math.floor(Math.random() * trailColors.length)],
              alpha: 1.0,
              decay: (0.015 + Math.random() * 0.02) * (isMobile ? 1.6 : 1.0),
              angle: Math.random() * Math.PI * 2,
              twinkleOffset: Math.random() * 1000,
            });
          }
        }

        lastMouseX = realMouseX;
        lastMouseY = realMouseY;
      }

      // Update and draw star trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.975;

        if (p.alpha <= 0 || p.size <= 0.2) {
          trailParticles.splice(i, 1);
          continue;
        }

        const twinkle = Math.abs(Math.sin((frames + p.twinkleOffset) * 0.1));
        const currentAlpha = p.alpha * (0.6 + twinkle * 0.4);

        // Subtly glowing atmospheric aura
        ctx.fillStyle = `${p.color}${currentAlpha * 0.22})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (isMobile ? 1.8 : 2.8), 0, Math.PI * 2);
        ctx.fill();

        // Shimmering core star
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Elegant cross star flare on desktop for high contrast elements
        if (!isMobile && p.size > 1.8 && p.alpha > 0.5 && i % 3 === 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y);
          ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4);
          ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: "#050508" }}
    />
  );
}

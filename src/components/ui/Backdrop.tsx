import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Fixed, site-wide atmosphere: drifting crimson aurora blobs, a faint grid,
 * and a film-grain overlay. Sits behind everything, never intercepts clicks.
 */
export const Backdrop = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
    {/* Aurora blobs */}
    <div className="absolute -top-[22rem] -left-[16rem] h-[46rem] w-[46rem] rounded-full bg-crimson-700/25 blur-[130px] animate-drift" />
    <div
      className="absolute top-[28%] -right-[18rem] h-[40rem] w-[40rem] rounded-full bg-crimson-500/16 blur-[140px] animate-drift"
      style={{ animationDelay: '-8s' }}
    />
    <div
      className="absolute bottom-[-16rem] left-[22%] h-[38rem] w-[38rem] rounded-full bg-orange-600/10 blur-[150px] animate-drift"
      style={{ animationDelay: '-15s' }}
    />

    {/* Structural grid */}
    <div className="absolute inset-0 bg-grid opacity-[0.55] mask-fade-b" />

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,10,0.9)_100%)]" />

    {/* Grain */}
    <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
  </div>
);

/** Thin crimson progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-crimson-700 via-crimson-400 to-orange-400 shadow-[0_0_18px_rgba(240,48,63,0.8)]"
    />
  );
};

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Lightweight particle-network canvas. Nodes drift, nearby nodes connect,
 * and the pointer pulls the mesh toward it. Pauses when off-screen.
 */
export const NeuralCanvas = ({ className = '', density = 0.00009 }: { className?: string; density?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(Math.max(width * height * density, 34), 110));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const linkDist = 148;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Pointer attraction
        const pdx = pointer.x - n.x;
        const pdy = pointer.y - n.y;
        const pd = Math.hypot(pdx, pdy);
        if (pd < 170 && pd > 1) {
          n.x += (pdx / pd) * 0.45;
          n.y += (pdy / pd) * 0.45;
        }
      }

      // Links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.4;
            ctx.strokeStyle = `rgba(240, 68, 82, ${String(alpha)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const near = Math.hypot(pointer.x - n.x, pointer.y - n.y) < 170;
        ctx.fillStyle = near ? 'rgba(255, 180, 186, 0.95)' : 'rgba(255, 120, 130, 0.6)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 2.4 : 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (visible) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 },
    );

    seed();
    observer.observe(canvas);
    window.addEventListener('resize', seed);
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', seed);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} />;
};

export default Backdrop;

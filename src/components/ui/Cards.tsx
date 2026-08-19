import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. 0 disables the 3D effect. */
  tilt?: number;
  /** Show the cursor-following spotlight. */
  spotlight?: boolean;
};

/**
 * Glass card with a cursor-tracked spotlight and optional 3D tilt.
 * Used for events, projects and team members.
 */
export const GlowCard = ({ children, className = '', tilt = 7, spotlight = true }: CardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const smx = useSpring(mx, { stiffness: 180, damping: 20 });
  const smy = useSpring(my, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(smy, [0, 1], [tilt, -tilt]);
  const rotateY = useTransform(smx, [0, 1], [-tilt, tilt]);

  const glowX = useTransform(mx, (v) => `${String(v * 100)}%`);
  const glowY = useTransform(my, (v) => `${String(v * 100)}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, rgba(240,48,63,0.22), transparent 65%)`;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={`group relative isolate h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-800/45 backdrop-blur-xl transition-colors duration-500 hover:border-crimson-500/40 ${className}`}
    >
      {/* Cursor spotlight */}
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Top hairline highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-linear-to-r from-transparent via-crimson-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
};

/** Small stat / metric tile. */
export const StatTile = ({ value, label, className = '' }: { value: ReactNode; label: string; className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 text-center backdrop-blur-sm transition-colors duration-500 hover:border-crimson-500/40 sm:px-6 sm:py-6 ${className}`}
  >
    <div className="font-display text-2xl leading-none font-bold text-gradient sm:text-4xl lg:text-5xl">{value}</div>
    <div className="mt-2 font-mono text-[0.55rem] tracking-[0.14em] text-ink-400 uppercase sm:text-[0.7rem] sm:tracking-[0.22em]">
      {label}
    </div>
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-crimson-500/50 to-transparent"
    />
  </div>
);

export default GlowCard;

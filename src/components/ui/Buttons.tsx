import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';

type Common = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

type MagneticProps = Common & {
  to?: string;
  href?: string;
  strength?: number;
};

/**
 * Button that leans toward the cursor. Renders as <Link>, <a> or <button>
 * depending on which navigation prop is supplied.
 */
export const Magnetic = ({ children, className = '', to, href, onClick, strength = 0.35 }: MagneticProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      whileTap={{ scale: 0.96 }}
    >
      {to ? (
        <Link to={to} onClick={onClick} className="contents">
          {inner}
        </Link>
      ) : href ? (
        <a
          href={href}
          onClick={onClick}
          className="contents"
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} className="contents cursor-pointer">
          {inner}
        </button>
      )}
    </motion.span>
  );
};

const baseBtn =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 ' +
  'font-medium tracking-tight transition-colors duration-300 cursor-pointer select-none';

/** Solid crimson button with a sheen sweep on hover. */
export const PrimaryButton = ({ children, className = '', to, href, onClick }: MagneticProps) => (
  <Magnetic
    to={to}
    href={href}
    onClick={onClick}
    className={`${baseBtn} bg-crimson-600 text-white shadow-[0_12px_40px_-12px] shadow-crimson-500/70 hover:bg-crimson-500 ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  </Magnetic>
);

/** Outlined button that fills from the bottom on hover. */
export const GhostButton = ({ children, className = '', to, href, onClick }: MagneticProps) => (
  <Magnetic
    to={to}
    href={href}
    onClick={onClick}
    className={`${baseBtn} border border-white/15 bg-white/5 text-ink-100 backdrop-blur-sm hover:border-crimson-400/60 hover:text-white ${className}`}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-linear-to-t from-crimson-600/50 to-crimson-500/10 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
  </Magnetic>
);

/** Small pill used for tech tags and filters. */
export const Chip = ({ children, active = false, onClick, className = '' }: Common & { active?: boolean }) => {
  const [ripple, setRipple] = useState(0);

  return (
    <motion.button
      type="button"
      onClick={() => {
        setRipple((r) => r + 1);
        onClick?.();
      }}
      whileTap={{ scale: 0.94 }}
      whileHover={{ y: -2 }}
      className={`relative cursor-pointer overflow-hidden rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide transition-colors duration-300 ${
        active
          ? 'border-crimson-500/70 bg-crimson-600/25 text-crimson-100'
          : 'border-white/10 bg-white/5 text-ink-300 hover:border-crimson-400/40 hover:text-white'
      } ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        key={ripple}
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 m-auto h-6 w-6 rounded-full bg-crimson-400/60"
      />
    </motion.button>
  );
};

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView } from 'motion/react';
import { Reveal } from './Reveal';

/** Monospace label with a leading crimson dash. */
export const Eyebrow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-3 eyebrow text-crimson-300/90 ${className}`}>
    <span className="h-px w-8 bg-linear-to-r from-crimson-500 to-transparent" />
    {children}
  </span>
);

/** Standard section header: eyebrow + big title + optional lede. */
export const SectionHeading = ({
  eyebrow,
  title,
  lede,
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: 'center' | 'left';
  className?: string;
}) => (
  <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'} ${className}`}>
    {eyebrow && (
      <Reveal direction="up">
        <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
      </Reveal>
    )}
    <Reveal direction="up" delay={0.08}>
      <h2 className="mt-5 text-section font-bold text-white text-balance">{title}</h2>
    </Reveal>
    {lede && (
      <Reveal direction="up" delay={0.16}>
        <p className="mt-5 text-lg leading-relaxed text-ink-300 text-pretty">{lede}</p>
      </Reveal>
    )}
  </div>
);

/** Number that counts up the first time it scrolls into view. */
export const Counter = ({ to, suffix = '', duration = 1.8 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(Math.round(v));
      },
    });
    return () => {
      controls.stop();
    };
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

/** Types a string out character by character, then blinks a caret. */
export const Typewriter = ({
  text,
  speed = 55,
  className = '',
  caret = true,
}: {
  text: string;
  speed?: number;
  className?: string;
  caret?: boolean;
}) => {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    setTyped('');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => {
      clearInterval(id);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {typed}
      {caret && <span className="ml-0.5 inline-block animate-blink font-light text-crimson-400">|</span>}
      <span className="sr-only">{text}</span>
    </span>
  );
};

/** Infinite horizontal ticker. Children are duplicated for a seamless loop. */
export const Marquee = ({
  items,
  className = '',
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) => (
  <div className={`group relative flex overflow-hidden mask-fade-x ${className}`}>
    <div
      className="flex min-w-max shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
      style={reverse ? { animationDirection: 'reverse' } : undefined}
    >
      {[...items, ...items].map((item, i) => (
        <span key={`${item}-${String(i)}`} className="flex items-center gap-10">
          <span className="font-display text-lg font-medium whitespace-nowrap text-ink-400 transition-colors duration-300 hover:text-crimson-300 sm:text-xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-600" />
        </span>
      ))}
    </div>
  </div>
);

/** Decorative corner brackets, for a HUD-ish framing. */
export const Brackets = ({ className = '' }: { className?: string }) => (
  <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
    {[
      'left-0 top-0 border-l border-t',
      'right-0 top-0 border-r border-t',
      'left-0 bottom-0 border-l border-b',
      'right-0 bottom-0 border-r border-b',
    ].map((pos) => (
      <span key={pos} className={`absolute h-4 w-4 border-crimson-500/50 ${pos}`} />
    ))}
  </span>
);

/** Page-level fade/slide wrapper for route transitions. */
export const PageShell = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

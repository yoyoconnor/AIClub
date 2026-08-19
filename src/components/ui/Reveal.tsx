import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { staggerItem, staggerParent } from './variants';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

const offsets: Record<Direction, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 44 },
  right: { x: -44 },
  scale: { scale: 0.92 },
  blur: { y: 18, filter: 'blur(14px)' },
};

type RevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
};

/** Scroll-triggered entrance wrapper used across the whole site. */
export const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  className,
  once = true,
  amount = 0.2,
}: RevealProps) => {
  const from = offsets[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(0px)', ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number;
};

export const Stagger = ({ children, className, amount = 0.15 }: StaggerProps) => (
  <motion.div
    className={className}
    variants={staggerParent}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);

/** Splits a string into words that fly up one after another. */
export const RevealWords = ({
  text,
  className,
  delay = 0,
  wordClassName,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}) => (
  <span className={className}>
    {text.split(' ').map((word, i, arr) => (
      <span key={`${word}-${String(i)}`}>
        <motion.span
          className={`inline-block ${wordClassName ?? ''}`}
          initial={{ opacity: 0, y: '0.55em', rotateX: -55 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.85, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
        {i < arr.length - 1 ? ' ' : ''}
      </span>
    ))}
  </span>
);

export default Reveal;

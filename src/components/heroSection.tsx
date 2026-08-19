import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { NeuralCanvas } from './ui/Backdrop';
import { RevealWords } from './ui/Reveal';
import { GhostButton, PrimaryButton } from './ui/Buttons';
import { Counter, Marquee } from './ui/Bits';
import { StatTile } from './ui/Cards';

const TOPICS = [
  'Neural Networks',
  'LLMs',
  'Computer Vision',
  'Reinforcement Learning',
  'PyTorch',
  'Diffusion Models',
  'NLP',
  'MLOps',
  'Transformers',
  'Agents',
];

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Background photo with slow parallax + heavy tint */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -z-10">
        <img src="/group_meeting.webp" alt="" className="h-full w-full object-cover object-center opacity-25" />
        <div className="absolute inset-0 bg-linear-to-b from-ink-950/85 via-ink-950/75 to-ink-950" />
        <div className="absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/60 to-transparent" />
      </motion.div>

      {/* Particle network */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <NeuralCanvas />
      </div>

      {/* Scan line sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 bg-linear-to-b from-transparent via-crimson-500/10 to-transparent animate-scan"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-20 sm:px-8"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-crimson-500/30 bg-crimson-600/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-500" />
              </span>
              <span className="eyebrow text-crimson-200">Now accepting new members</span>
            </motion.div>

            <h1 className="mt-7 text-hero font-bold text-white">
              <RevealWords text="Build real" delay={0.15} className="block" />
              <span className="block text-gradient">
                <RevealWords text="artificial intelligence." delay={0.35} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300 text-pretty sm:text-xl"
            >
              The University of Alabama AI Club is where curiosity turns into working models. Hands-on workshops,
              hackathons, research projects, and industry talks — open to every major, no experience required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <PrimaryButton href="#join">
                <Sparkles className="h-4 w-4" />
                Join the club
              </PrimaryButton>
              <GhostButton href="#events">See what&apos;s next</GhostButton>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-3"
            >
              <StatTile value={<Counter to={150} suffix="+" />} label="Members" />
              <StatTile value={<Counter to={20} suffix="+" />} label="Events" />
              <StatTile value="Free" label="To join" />
            </motion.div>
          </div>

          {/* Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* Rotating rings */}
              <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-crimson-500/25" />
              <div
                className="absolute inset-8 rounded-full border border-crimson-500/15 animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '26s' }}
              />
              {/* Glow */}
              <div className="absolute inset-12 rounded-full bg-crimson-600/20 blur-3xl animate-pulse-glow" />
              {/* Logo */}
              <motion.img
                src="/Alabama_Logo.png"
                alt="University of Alabama"
                className="absolute inset-0 m-auto w-3/5 object-contain drop-shadow-[0_0_45px_rgba(240,48,63,0.45)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Orbiting dot */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-crimson-400 shadow-[0_0_18px_6px_rgba(240,48,63,0.45)]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Topic ticker */}
      <div className="absolute inset-x-0 bottom-0 border-y border-white/8 bg-ink-900/40 py-4 backdrop-blur-sm">
        <Marquee items={TOPICS} />
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#events"
        aria-label="Scroll to events"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-ink-400 transition-colors hover:text-crimson-300 md:block"
      >
        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
};

export default HeroSection;

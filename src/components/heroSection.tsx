import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Braces, Cpu, Sparkles, Users } from 'lucide-react';
import { NeuralCanvas } from './ui/Backdrop';
import { Counter, Marquee } from './ui/Bits';

const TOPICS = [
  'Neural Networks',
  'LLMs',
  'Computer Vision',
  'Reinforcement Learning',
  'PyTorch',
  'Diffusion Models',
  'Agents',
  'MLOps',
];

const NODES = [
  { x: 13, y: 24, delay: 0 },
  { x: 13, y: 50, delay: 0.15 },
  { x: 13, y: 76, delay: 0.3 },
  { x: 43, y: 16, delay: 0.45 },
  { x: 43, y: 39, delay: 0.6 },
  { x: 43, y: 63, delay: 0.75 },
  { x: 43, y: 85, delay: 0.9 },
  { x: 72, y: 29, delay: 1.05 },
  { x: 72, y: 69, delay: 1.2 },
  { x: 91, y: 50, delay: 1.35 },
];

const LINKS = [
  [13, 24, 43, 16], [13, 24, 43, 39], [13, 50, 43, 39], [13, 50, 43, 63],
  [13, 76, 43, 63], [13, 76, 43, 85], [43, 16, 72, 29], [43, 39, 72, 29],
  [43, 39, 72, 69], [43, 63, 72, 29], [43, 63, 72, 69], [43, 85, 72, 69],
  [72, 29, 91, 50], [72, 69, 91, 50],
];

const ModelLab = () => (
  <motion.div
    initial={{ opacity: 0, y: 28, rotateX: 7 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
    className="relative mx-auto w-full max-w-[31rem] perspective-1000"
  >
    <div className="lab-shell relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-900/70 shadow-[0_45px_120px_-45px_rgba(240,48,63,0.55)] backdrop-blur-2xl">
      <div className="flex h-12 items-center justify-between border-b border-white/8 px-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-crimson-400 shadow-[0_0_12px_rgba(255,95,109,0.8)]" />
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-ink-300 uppercase">AI Club Impact Lab</span>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/8 px-2.5 py-1 font-mono text-[0.55rem] tracking-widest text-emerald-300 uppercase">Live</span>
      </div>

      <div className="relative aspect-[1.08] overflow-hidden bg-[radial-gradient(circle_at_70%_42%,rgba(240,48,63,0.14),transparent_43%)]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {LINKS.map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={`${x1}-${y1}-${x2}-${y2}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,122,134,.32)" strokeWidth=".32"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.045 }}
            />
          ))}
        </svg>
        {NODES.map((node, index) => (
          <motion.span
            key={`${node.x}-${node.y}`}
            className={`absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border ${index === NODES.length - 1 ? 'h-12 w-12 border-crimson-300/50 bg-crimson-500/20' : 'h-5 w-5 border-white/20 bg-ink-800/90'}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.12, 1], opacity: 1 }}
            transition={{ scale: { duration: 2.8, repeat: Infinity, delay: node.delay }, opacity: { delay: 0.6 + node.delay } }}
          >
            <span className={`rounded-full ${index === NODES.length - 1 ? 'h-3 w-3 bg-white shadow-[0_0_18px_5px_rgba(255,95,109,.65)]' : 'h-1.5 w-1.5 bg-crimson-300'}`} />
          </motion.span>
        ))}

        <motion.div
          className="absolute inset-y-0 w-px bg-linear-to-b from-transparent via-crimson-300/80 to-transparent shadow-[0_0_18px_rgba(255,95,109,.8)]"
          animate={{ left: ['4%', '96%', '4%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute right-4 bottom-4 left-4 grid grid-cols-3 gap-2">
          {[
            ['WORKFLOWS', '024'],
            ['TIME SAVED', '38%'],
            ['ROI', '3.4×'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/8 bg-ink-950/65 px-3 py-2.5 backdrop-blur-md">
              <div className="font-mono text-[0.48rem] tracking-[0.18em] text-ink-500">{label}</div>
              <div className="mt-1 font-display text-sm font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-7 -right-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-crimson-500/15 text-crimson-300"><Cpu className="h-4 w-4" /></span>
      <div><div className="text-xs font-semibold text-white">Workflow live</div><div className="mt-0.5 text-[0.65rem] text-ink-400">12 tasks automated</div></div>
    </motion.div>

    <motion.div
      animate={{ y: [0, 7, 0] }}
      transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: -1.5 }}
      className="absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-8"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/6 text-white"><Braces className="h-4 w-4" /></span>
      <div><div className="font-mono text-[0.58rem] text-crimson-300">impact_analysis.py</div><div className="mt-0.5 text-[0.65rem] text-ink-400">Prototype. Test. Improve.</div></div>
    </motion.div>
  </motion.div>
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-45"><NeuralCanvas density={0.000065} /></div>
      <div aria-hidden className="hero-orb absolute top-[8%] right-[5%] -z-10 h-[34rem] w-[34rem] rounded-full bg-crimson-600/15 blur-[110px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_48%_-10%,rgba(255,255,255,.07),transparent_48%)]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pt-28 pb-28 sm:px-8"
      >
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.08fr_.92fr] xl:gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-200 uppercase">Practical AI for real business</span>
            </motion.div>

            <h1 className="mt-8 max-w-3xl font-display text-[clamp(3.25rem,7.7vw,7.2rem)] leading-[0.88] font-semibold tracking-[-0.065em] text-white">
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="block">Turn AI into</motion.span>
              <motion.span initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }} className="block text-gradient">real-world impact.</motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg"
            >
              We bring business and technology students together to solve practical problems with AI—from smarter decisions and automated workflows to better products and customer experiences.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.56 }} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#join" className="group inline-flex h-13 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ink-950 transition-all duration-300 hover:scale-[1.03] hover:bg-crimson-100">
                Join the club <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#events" className="inline-flex h-13 items-center gap-2 rounded-full border border-white/12 bg-white/[0.035] px-6 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.07]">
                See what we build <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/8 pt-6 text-sm text-ink-400">
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-crimson-400" /><strong className="text-white"><Counter to={150} suffix="+" /></strong> members</span>
              <span className="h-1 w-1 rounded-full bg-ink-600" />
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-crimson-400" />Business + tech, working together</span>
            </motion.div>
          </div>

          <ModelLab />
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 border-y border-white/7 bg-ink-950/60 py-4 backdrop-blur-xl"><Marquee items={TOPICS} /></div>
    </section>
  );
};

export default HeroSection;

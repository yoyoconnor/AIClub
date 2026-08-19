import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { NeuralCanvas } from './ui/Backdrop';
import { Counter } from './ui/Bits';

const STATS = [
  { value: <Counter to={150} suffix="+" />, label: 'Members' },
  { value: <Counter to={20} suffix="+" />, label: 'Events' },
  { value: 'Free', label: 'To join' },
];

const APPLICATIONS = [
  { label: 'Supply chain', inset: '1%', start: 18, duration: 26 },
  { label: 'Healthcare', inset: '1%', start: 150, duration: 31 },
  { label: 'Financial analysis', inset: '9%', start: 235, duration: 24 },
  { label: 'Customer service', inset: '9%', start: 328, duration: 29 },
  { label: 'Marketing', inset: '17%', start: 82, duration: 22 },
  { label: 'Operations', inset: '17%', start: 205, duration: 27 },
];

const AlabamaOrbit = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.84 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
    className="relative mx-auto aspect-square w-full max-w-[34rem]"
  >
    <div className="absolute inset-[8%] rounded-full bg-crimson-700/16 blur-[65px] animate-pulse-glow" />
    <div className="absolute inset-[3%] rounded-full border border-crimson-500/16" />
    <div className="absolute inset-[11%] rounded-full border border-crimson-500/22" />
    <div className="absolute inset-[19%] rounded-full border border-white/7 bg-[radial-gradient(circle,rgba(153,0,0,.25),rgba(10,12,18,.2)_58%,transparent_72%)] shadow-[inset_0_0_90px_rgba(153,0,0,.14)]" />

    {APPLICATIONS.map((application, index) => (
      <motion.div
        key={application.label}
        className="pointer-events-none absolute rounded-full"
        style={{ inset: application.inset }}
        initial={{ rotate: application.start }}
        animate={{ rotate: application.start + 360 }}
        transition={{ duration: application.duration, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ rotate: -application.start }}
            animate={{ rotate: -application.start - 360 }}
            transition={{ duration: application.duration, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-2"
          >
            <span className={`relative h-2.5 w-2.5 shrink-0 rounded-full ${index % 3 === 0 ? 'bg-crimson-300 shadow-[0_0_18px_7px_rgba(255,95,109,.5)]' : 'bg-crimson-500 shadow-[0_0_10px_3px_rgba(240,48,63,.35)]'}`}>
              <span className="absolute inset-0 animate-ping rounded-full bg-crimson-400 opacity-35" />
            </span>
            <span className="whitespace-nowrap rounded-full border border-crimson-500/20 bg-ink-950/75 px-2.5 py-1 font-mono text-[0.48rem] tracking-[0.14em] text-ink-300 uppercase shadow-lg backdrop-blur-xl">
              {application.label}
            </span>
          </motion.div>
        </div>
      </motion.div>
    ))}

    <motion.img
      src="/Alabama_Logo.png"
      alt="University of Alabama"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute inset-0 m-auto w-[47%] object-contain drop-shadow-[0_0_38px_rgba(240,48,63,.48)]"
    />

  </motion.div>
);

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink-950">
      <div className="absolute inset-0 -z-0 opacity-15"><NeuralCanvas density={0.00004} /></div>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_45%,rgba(153,0,0,.13),transparent_37%)]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,10,.15),rgba(5,6,10,.78)_49%,rgba(5,6,10,.15))] opacity-40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pt-28 pb-20 sm:px-8"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.14fr_.86fr] xl:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-400 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-crimson-400 shadow-[0_0_10px_rgba(255,95,109,.8)]" />
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-400 uppercase">University of Alabama AI Club</span>
            </motion.div>

            <h1 className="mt-8 max-w-[12ch] font-display text-[clamp(3.25rem,6vw,6rem)] leading-[0.96] font-semibold tracking-[-0.055em] text-white">
              <motion.span
                initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Practical AI.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="block text-crimson-400"
              >
                Real impact.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="mt-7 max-w-xl text-base leading-[1.7] text-ink-300 sm:text-lg"
            >
              Students from every major working together to automate workflows, understand data, and build useful AI products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.56 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#join" className="group inline-flex h-12 items-center gap-2 rounded-lg bg-crimson-600 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-crimson-500">
                Join the club
              </a>
              <a href="#events" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/12 px-6 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]">
                See what’s next <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.74 }}
              className="mt-10 flex max-w-xl border-t border-white/10 pt-6"
            >
              {STATS.map((stat, index) => (
                <div key={stat.label} className={`flex-1 ${index > 0 ? 'border-l border-white/10 pl-5 sm:pl-7' : ''}`}>
                  <div className="font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 font-mono text-[0.5rem] tracking-[0.2em] text-ink-500 uppercase sm:text-[0.58rem]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block"><AlabamaOrbit /></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

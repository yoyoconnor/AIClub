import { BrainCircuit, Code2, Rocket, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GlowCard } from './ui/Cards';
import { SectionHeading } from './ui/Bits';
import { Reveal } from './ui/Reveal';

type Pillar = {
  icon: LucideIcon;
  title: string;
  body: string;
  tag: string;
};

const PILLARS: Pillar[] = [
  {
    icon: BrainCircuit,
    title: 'Learn the fundamentals',
    body: 'Workshops that go from linear regression to transformers without hand-waving. We write the code, then we break it on purpose.',
    tag: '01 / Workshops',
  },
  {
    icon: Code2,
    title: 'Ship real projects',
    body: 'Small teams, real datasets, working demos. Everything you build here is something you can put in front of a recruiter.',
    tag: '02 / Projects',
  },
  {
    icon: Rocket,
    title: 'Compete and win',
    body: 'Hackathons, Kaggle sprints, and AI challenges — with the club providing compute, mentorship, and moral support at 2am.',
    tag: '03 / Competitions',
  },
  {
    icon: Users,
    title: 'Meet the industry',
    body: 'Guest talks and site visits with engineers and researchers who do this for a living, plus the alumni network behind them.',
    tag: '04 / Community',
  },
];

const Pillars = () => (
  <section className="relative section px-5 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Why we exist"
        title={
          <>
            Four things we do <span className="text-gradient">relentlessly</span>
          </>
        }
        lede="No prerequisites, no gatekeeping. Show up curious and we'll handle the rest."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.title} direction={i % 2 === 0 ? 'right' : 'left'} delay={(i % 2) * 0.1}>
              <GlowCard tilt={4} className="h-full p-8">
                <div className="flex items-start gap-5">
                  <span className="relative grid h-13 w-13 shrink-0 place-items-center rounded-2xl border border-crimson-500/25 bg-crimson-600/10 text-crimson-300 transition-all duration-500 group-hover:border-crimson-400/60 group-hover:text-crimson-200">
                    <Icon className="h-6 w-6" />
                    <span className="absolute inset-0 rounded-2xl bg-crimson-500/25 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div>
                    <span className="font-mono text-[0.68rem] tracking-[0.2em] text-ink-500 uppercase">
                      {pillar.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-400">{pillar.body}</p>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Pillars;

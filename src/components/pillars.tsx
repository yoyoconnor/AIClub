import { BriefcaseBusiness, ChartNoAxesCombined, Workflow, Users } from 'lucide-react';
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
    icon: BriefcaseBusiness,
    title: 'Find valuable problems',
    body: 'Learn where AI creates real value—and where it does not. We start with the customer, workflow, or decision before choosing the technology.',
    tag: '01 / Strategy',
  },
  {
    icon: Workflow,
    title: 'Automate real work',
    body: 'Map repetitive processes, build useful AI workflows, and measure the time and cost they save. The goal is adoption—not another forgotten demo.',
    tag: '02 / Automation',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Make better decisions',
    body: 'Turn messy data into forecasts, insights, and decision tools that a team can actually use. Every project has a clear user and success metric.',
    tag: '03 / Analytics',
  },
  {
    icon: Users,
    title: 'Work across disciplines',
    body: 'Business students bring the problem context. Technical students bring the build skills. Together, we prototype solutions with industry mentors.',
    tag: '04 / Collaboration',
  },
];

const Pillars = () => (
  <section className="relative section px-5 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="How we create value"
        title={
          <>
            From AI idea to <span className="text-gradient">business impact</span>
          </>
        }
        lede="We learn the technology through practical use cases, measurable outcomes, and teams that blend business thinking with technical execution."
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

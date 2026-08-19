import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { aboutPageData } from '../data/aboutContent';
import { PageShell, SectionHeading, Typewriter, Eyebrow } from '../components/ui/Bits';
import { Reveal } from '../components/ui/Reveal';
import { GlowCard } from '../components/ui/Cards';
import { PrimaryButton, GhostButton } from '../components/ui/Buttons';

const AboutPage = () => {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <PageShell className="px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="up">
            <Eyebrow className="justify-center">Who we are</Eyebrow>
          </Reveal>
          <h1 className="mt-6 text-section font-bold text-white">
            <Typewriter text={aboutPageData.heading} speed={55} />
          </h1>
          <Reveal direction="up" delay={0.5}>
            <p className="mt-6 text-lg leading-relaxed text-ink-300 text-pretty">{aboutPageData.intro}</p>
          </Reveal>
        </div>

        {/* Hero image with parallax */}
        <Reveal direction="scale" delay={0.2} className="mt-16">
          <div ref={imgWrap} className="relative aspect-16/9 overflow-hidden rounded-3xl border border-white/10">
            <motion.img
              style={{ y: imgY }}
              src={aboutPageData.teamImage}
              alt="AI Club members"
              className="absolute inset-0 h-[116%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                Built by students, for students.
              </p>
            </div>
          </div>
        </Reveal>

        {/* What we do / Why join */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          {[
            { title: 'What we do', items: aboutPageData.whatWeDo },
            { title: 'Why join', items: aboutPageData.whyJoin },
          ].map((col, ci) => (
            <Reveal key={col.title} direction={ci === 0 ? 'right' : 'left'} delay={ci * 0.1}>
              <GlowCard tilt={3} className="h-full p-8">
                <h2 className="font-display text-2xl font-semibold text-white">
                  {col.title}
                  <span className="text-crimson-500">.</span>
                </h2>
                <ul className="mt-6 space-y-4">
                  {col.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="flex items-start gap-3 text-sm leading-relaxed text-ink-300"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-crimson-600/20 text-crimson-300 ring-1 ring-crimson-500/30">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="How we got here"
            title={
              <>
                A short <span className="text-gradient">history</span>
              </>
            }
            align="left"
          />

          <div className="relative mt-14 pl-8 sm:pl-12">
            {/* Rail */}
            <div className="absolute top-2 bottom-2 left-[3px] w-px bg-linear-to-b from-crimson-500/70 via-crimson-700/40 to-transparent sm:left-[7px]" />

            <div className="space-y-12">
              {aboutPageData.timeline.map((entry, i) => (
                <Reveal key={entry.title} direction="up" delay={i * 0.08}>
                  <div className="group relative">
                    <span className="absolute top-1.5 -left-8 h-2 w-2 rounded-full bg-crimson-500 ring-4 ring-crimson-500/20 transition-all duration-400 group-hover:ring-8 sm:-left-12 sm:h-3.5 sm:w-3.5" />
                    <span className="font-mono text-xs tracking-[0.2em] text-crimson-400 uppercase">{entry.year}</span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{entry.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-400">{entry.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="How we operate"
            title={
              <>
                Three things we <span className="text-gradient">believe</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {aboutPageData.values.map((value, i) => (
              <Reveal key={value.title} direction="up" delay={i * 0.1}>
                <GlowCard tilt={6} className="h-full p-7">
                  <span className="font-mono text-4xl font-bold text-white/8">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">{value.body}</p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Reveal direction="up" className="mt-28 mb-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 p-10 text-center backdrop-blur-xl sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-crimson-600/25 blur-[90px]"
            />
            <div className="relative">
              <h3 className="text-section font-bold text-white">
                Ready to <span className="text-gradient">start building?</span>
              </h3>
              <p className="mx-auto mt-4 max-w-md text-ink-300">
                Come to one meeting. If it is not for you, no hard feelings.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <PrimaryButton href="mailto:aiclub@ua.edu?subject=Joining%20the%20UA%20AI%20Club">
                  <Sparkles className="h-4 w-4" />
                  Get in touch
                </PrimaryButton>
                <GhostButton to="/events">Browse events</GhostButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
};

export default AboutPage;

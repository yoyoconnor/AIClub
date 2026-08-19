import { motion } from 'motion/react';
import { ArrowUpRight, CalendarDays, Mail, MapPin } from 'lucide-react';
import { Reveal, RevealWords } from './ui/Reveal';
import { PrimaryButton, GhostButton } from './ui/Buttons';
import { NeuralCanvas } from './ui/Backdrop';

const DETAILS = [
  { icon: CalendarDays, label: 'Meetings', value: 'Every other Thursday, 6:00 PM' },
  { icon: MapPin, label: 'Where', value: 'North Engineering Research Center' },
  { icon: Mail, label: 'Questions', value: 'aiclub@ua.edu' },
];

const JoinCta = () => (
  <section id="join" className="relative section scroll-mt-24 px-5 sm:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900/60 backdrop-blur-xl">
        {/* Ambient */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
          <NeuralCanvas density={0.00006} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-crimson-600/25 blur-[100px]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

        <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
          {/* Pitch */}
          <div>
            <Reveal direction="up">
              <span className="inline-flex items-center gap-3 eyebrow text-crimson-300/90">
                <span className="h-px w-8 bg-linear-to-r from-crimson-500 to-transparent" />
                Built for every major
              </span>
            </Reveal>

            <h2 className="mt-6 text-section font-bold text-white text-balance">
              <RevealWords text="Bring a problem." />{' '}
              <span className="text-gradient">
                <RevealWords text="Build the solution." delay={0.25} />
              </span>
            </h2>

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-300 text-pretty">
                Whether you understand the business problem, the data, the customer, or the code, there is a place for you here. Join a cross-functional team and turn an AI idea into something people can actually use.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.3}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <PrimaryButton href="mailto:aiclub@ua.edu?subject=I%20want%20to%20join%20the%20UA%20AI%20Club">
                  Email us to join
                  <ArrowUpRight className="h-4 w-4" />
                </PrimaryButton>
                <GhostButton to="/events">See upcoming meetings</GhostButton>
              </div>
            </Reveal>
          </div>

          {/* Details */}
          <Reveal direction="left" delay={0.15}>
            <div className="flex h-full flex-col justify-center gap-4">
              {DETAILS.map((detail, i) => {
                const Icon = detail.icon;
                return (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 6 }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-400 hover:border-crimson-500/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-crimson-600/15 text-crimson-300 ring-1 ring-crimson-500/25">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="eyebrow text-ink-500">{detail.label}</div>
                      <div className="mt-1 truncate text-sm font-medium text-white">{detail.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default JoinCta;

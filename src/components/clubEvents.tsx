import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { events, type EventType } from '../data/clubEvents';
import { formatEventDate } from '../lib/format';
import { GlowCard } from './ui/Cards';
import { SectionHeading } from './ui/Bits';
import { Reveal } from './ui/Reveal';
import { GhostButton } from './ui/Buttons';

const splitEvents = (list: EventType[]) => {
  const now = new Date();
  return {
    upcoming: [...list]
      .filter((e) => new Date(`${e.date}T00:00:00`) >= now)
      .sort((a, b) => a.date.localeCompare(b.date)),
    past: [...list].filter((e) => new Date(`${e.date}T00:00:00`) < now).sort((a, b) => b.date.localeCompare(a.date)),
  };
};

const resolveLink = (link?: string) => {
  if (!link || link === '#') return null;
  if (link.startsWith('http')) return { external: true, href: link };
  return { external: false, href: link.startsWith('/') ? link : `/${link}` };
};

export const EventCard = ({ event, index = 0, past = false }: { event: EventType; index?: number; past?: boolean }) => {
  const target = resolveLink(event.link);

  return (
    <Reveal direction="up" delay={index * 0.08} className="h-full">
      <GlowCard className={past ? 'opacity-90' : ''}>
        {/* Media */}
        <div className="relative aspect-16/10 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/25 to-transparent" />

          {/* Date chip */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1.5 font-mono text-[0.68rem] text-ink-200 backdrop-blur-md">
            <CalendarDays className="h-3.5 w-3.5 text-crimson-400" />
            {formatEventDate(event.date)}
          </div>

          {!past && (
            <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-crimson-400/40 bg-crimson-600/25 px-3 py-1.5 font-mono text-[0.68rem] text-crimson-100 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5" />
              Upcoming
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl leading-snug font-semibold text-white transition-colors duration-300 group-hover:text-crimson-200">
            {event.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400">{event.description}</p>

          {target && (
            <div className="mt-6">
              {target.external ? (
                <a
                  href={target.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-wide text-crimson-300 uppercase transition-colors hover:text-crimson-200"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              ) : (
                <Link
                  to={target.href}
                  className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-wide text-crimson-300 uppercase transition-colors hover:text-crimson-200"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              )}
            </div>
          )}
        </div>
      </GlowCard>
    </Reveal>
  );
};

const EmptyState = ({ label }: { label: string }) => (
  <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
    <p className="text-ink-400">{label}</p>
  </div>
);

const ClubEvents = () => {
  const { upcoming, past } = splitEvents(events);
  const maxVisible = 3;

  return (
    <section id="events" className="relative section scroll-mt-24 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What's happening"
          title={
            <>
              Workshops, hacks and <span className="text-gradient">talks</span>
            </>
          }
          lede="Every meeting is hands-on. Bring a laptop, leave with something you built."
        />

        {/* Upcoming */}
        <div className="mt-16">
          {upcoming.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.slice(0, maxVisible).map((event, index) => (
                <EventCard key={event.title.trim()} event={event} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState label="No upcoming events on the calendar right now — check back soon." />
          )}
        </div>

        {/* Past */}
        {past.length > 0 && (
          <>
            <Reveal direction="up" className="mt-24 mb-10 flex items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">Recently</h3>
                <p className="mt-2 text-sm text-ink-400">A look at what we&apos;ve already shipped.</p>
              </div>
              <span className="hidden font-mono text-xs text-ink-500 sm:block">
                {past.length} past event{past.length === 1 ? '' : 's'}
              </span>
            </Reveal>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {past.slice(0, maxVisible).map((event, index) => (
                <EventCard key={event.title.trim()} event={event} index={index} past />
              ))}
            </div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <GhostButton to="/events">
            Browse the full calendar
            <ArrowRight className="h-4 w-4" />
          </GhostButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubEvents;

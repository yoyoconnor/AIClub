import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { events, type EventType } from '../data/clubEvents';
import { EventCard } from '../components/clubEvents';
import { PageShell, Eyebrow, Typewriter } from '../components/ui/Bits';
import { Reveal } from '../components/ui/Reveal';
import { Chip } from '../components/ui/Buttons';

const EVENTS_PER_PAGE = 6;

type Filter = 'upcoming' | 'past';

const AllEventsPage = () => {
  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const parse = (e: EventType) => new Date(`${e.date}T00:00:00`);
    return {
      upcoming: [...events].filter((e) => parse(e) >= now).sort((a, b) => a.date.localeCompare(b.date)),
      past: [...events].filter((e) => parse(e) < now).sort((a, b) => b.date.localeCompare(a.date)),
    };
  }, []);

  // Open on whichever tab actually has something to show.
  const [filter, setFilter] = useState<Filter>(upcoming.length > 0 ? 'upcoming' : 'past');
  const [page, setPage] = useState(1);

  const list = filter === 'upcoming' ? upcoming : past;
  const totalPages = Math.max(1, Math.ceil(list.length / EVENTS_PER_PAGE));
  const paginated = list.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <PageShell className="px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal direction="up">
            <Eyebrow className="justify-center">The calendar</Eyebrow>
          </Reveal>
          <h1 className="mt-6 text-section font-bold text-white">
            <Typewriter text="All events" speed={80} />
          </h1>
          <Reveal direction="up" delay={0.6}>
            <p className="mt-5 text-lg leading-relaxed text-ink-300 text-pretty">
              Everything we&apos;ve run and everything coming up. All meetings are open — no RSVP, no dues.
            </p>
          </Reveal>
        </div>

        {/* Filter */}
        <Reveal direction="up" delay={0.2}>
          <div className="mt-10 flex justify-center gap-3">
            <Chip
              active={filter === 'upcoming'}
              onClick={() => {
                setFilter('upcoming');
              }}
            >
              Upcoming · {upcoming.length}
            </Chip>
            <Chip
              active={filter === 'past'}
              onClick={() => {
                setFilter('past');
              }}
            >
              Past · {past.length}
            </Chip>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-14 min-h-[24rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${String(page)}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {paginated.length > 0 ? (
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {paginated.map((event, i) => (
                    <EventCard key={event.title.trim()} event={event} index={i} past={filter === 'past'} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
                  <p className="text-ink-400">
                    No {filter} events right now — follow along and we&apos;ll post the next one soon.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 mb-8 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => {
                setPage((p) => p - 1);
              }}
              aria-label="Previous page"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:border-crimson-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPage(n);
                }}
                className={`relative h-10 w-10 cursor-pointer rounded-full font-mono text-sm transition-colors ${
                  n === page ? 'text-white' : 'text-ink-400 hover:text-white'
                }`}
              >
                {n === page && (
                  <motion.span
                    layoutId="page-pill"
                    className="absolute inset-0 rounded-full border border-crimson-500/50 bg-crimson-600/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{n}</span>
              </button>
            ))}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => {
                setPage((p) => p + 1);
              }}
              aria-label="Next page"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:border-crimson-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </PageShell>
  );
};

export default AllEventsPage;

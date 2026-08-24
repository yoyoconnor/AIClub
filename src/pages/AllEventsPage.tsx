import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { events, type EventCategory, type EventType } from '../data/clubEvents';
import { PageShell, Eyebrow } from '../components/ui/Bits';
import { Reveal } from '../components/ui/Reveal';

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const CATEGORIES: Array<EventCategory | 'All'> = ['All', 'Workshop', 'Industry', 'Project Lab', 'Community'];

const categoryStyle: Record<EventCategory, { dot: string; border: string; text: string; wash: string }> = {
  Workshop: { dot: 'bg-crimson-400', border: 'border-crimson-400/35', text: 'text-crimson-200', wash: 'bg-crimson-500/10' },
  Industry: { dot: 'bg-orange-400', border: 'border-orange-400/35', text: 'text-orange-200', wash: 'bg-orange-500/10' },
  'Project Lab': { dot: 'bg-sky-400', border: 'border-sky-400/35', text: 'text-sky-200', wash: 'bg-sky-500/10' },
  Community: { dot: 'bg-emerald-400', border: 'border-emerald-400/35', text: 'text-emerald-200', wash: 'bg-emerald-500/10' },
};

const dateKey = (year: number, month: number, day: number) =>
  `${String(year)}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const CalendarEvent = ({ event, onSelect }: { event: EventType; onSelect: (event: EventType) => void }) => {
  const category = event.category ?? 'Community';
  const style = categoryStyle[category];

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className={`mt-1.5 flex w-full items-center gap-1.5 rounded-md border px-1.5 py-1 text-left transition-colors hover:bg-white/8 ${style.border} ${style.wash}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
      <span className={`truncate text-[0.58rem] font-medium sm:text-[0.65rem] ${style.text}`}>{event.title}</span>
    </button>
  );
};

const AllEventsPage = () => {
  const firstDate = new Date(`${events[0].date}T12:00:00`);
  const [viewDate, setViewDate] = useState(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1));
  const [category, setCategory] = useState<EventCategory | 'All'>('All');
  const [selected, setSelected] = useState<EventType>(events[0]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const visibleEvents = useMemo(
    () => events.filter((event) => category === 'All' || event.category === category),
    [category],
  );

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventType[]>();
    visibleEvents.forEach((event) => map.set(event.date, [...(map.get(event.date) ?? []), event]));
    return map;
  }, [visibleEvents]);

  const days = useMemo(() => {
    const leading = new Date(year, month, 1).getDay();
    const count = new Date(year, month + 1, 0).getDate();
    const previousCount = new Date(year, month, 0).getDate();
    return Array.from({ length: 42 }, (_, index) => {
      if (index < leading) return { day: previousCount - leading + index + 1, offset: -1 };
      if (index >= leading + count) return { day: index - leading - count + 1, offset: 1 };
      return { day: index - leading + 1, offset: 0 };
    });
  }, [month, year]);

  const moveMonth = (amount: number) => {
    setViewDate(new Date(year, month + amount, 1));
  };

  const selectedCategory = selected.category ?? 'Community';
  const selectedStyle = categoryStyle[selectedCategory];
  const selectedDate = new Date(`${selected.date}T12:00:00`);

  return (
    <PageShell className="px-4 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl pb-10">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal direction="up"><Eyebrow>Club calendar</Eyebrow></Reveal>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">What’s happening</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-300">
              Workshops, project labs, and conversations with people applying AI in the real world.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-lg border border-amber-400/20 bg-amber-400/8 px-3 py-2 font-mono text-[0.58rem] tracking-[0.14em] text-amber-200 uppercase">
            Sample fall programming
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-ink-300 transition-colors hover:bg-white/5 hover:text-white"><ChevronLeft className="h-4 w-4" /></button>
            <h2 className="min-w-[12rem] text-center font-display text-xl font-semibold text-white">{monthLabel}</h2>
            <button type="button" onClick={() => moveMonth(1)} aria-label="Next month" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-ink-300 transition-colors hover:bg-white/5 hover:text-white"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${category === item ? 'border-crimson-400/50 bg-crimson-500/15 text-white' : 'border-white/10 text-ink-400 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/40">
            <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.025]">
              {DAYS.map((day) => <div key={day} className="px-1 py-3 text-center font-mono text-[0.55rem] tracking-[0.18em] text-ink-500">{day}</div>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${year}-${month}-${category}`}
                initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-7"
              >
                {days.map(({ day, offset }, index) => {
                  const cellDate = new Date(year, month + offset, day);
                  const key = dateKey(cellDate.getFullYear(), cellDate.getMonth(), day);
                  const dayEvents = eventsByDate.get(key) ?? [];
                  const isToday = key === new Date().toISOString().slice(0, 10);
                  return (
                    <div key={`${key}-${index}`} className={`min-h-[6.3rem] border-r border-b border-white/[0.07] p-1.5 sm:min-h-[7.5rem] sm:p-2.5 ${offset !== 0 ? 'bg-black/15 text-ink-700' : 'text-ink-300'} ${(index + 1) % 7 === 0 ? 'border-r-0' : ''}`}>
                      <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${isToday ? 'bg-crimson-600 text-white' : ''}`}>{day}</span>
                      {dayEvents.slice(0, 2).map((event) => <CalendarEvent key={event.title} event={event} onSelect={setSelected} />)}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.aside
              key={selected.title}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="h-fit overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={selected.image} alt="" className="h-full w-full object-cover opacity-55" />
                <div className="absolute inset-0 bg-linear-to-t from-ink-900 to-transparent" />
                <span className={`absolute top-4 left-4 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] tracking-wider uppercase ${selectedStyle.border} ${selectedStyle.wash} ${selectedStyle.text}`}>{selectedCategory}</span>
              </div>
              <div className="p-5">
                <div className="flex gap-4">
                  <div className="w-12 shrink-0 text-center">
                    <div className="font-mono text-[0.58rem] tracking-widest text-crimson-400 uppercase">{selectedDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                    <div className="mt-0.5 font-display text-3xl font-semibold text-white">{selectedDate.getDate()}</div>
                  </div>
                  <div><h3 className="font-display text-xl font-semibold leading-tight text-white">{selected.title}</h3></div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ink-400">{selected.description}</p>
                <div className="mt-5 space-y-3 border-t border-white/8 pt-5 text-xs text-ink-300">
                  <div className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-crimson-400" />{selected.time}</div>
                  <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-crimson-400" />{selected.location}</div>
                  <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 text-crimson-400" />{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
};

export default AllEventsPage;

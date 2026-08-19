import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, GraduationCap, MapPin } from 'lucide-react';
import { teamMembers, type TeamMember } from '../data/teamMembers';
import { PageShell, Eyebrow, Typewriter } from '../components/ui/Bits';
import { Reveal } from '../components/ui/Reveal';
import { GlowCard } from '../components/ui/Cards';
import { Chip } from '../components/ui/Buttons';

const GROUPS: { name: string; roles: string[] }[] = [
  { name: 'Executive Team', roles: ['President', 'Vice President', 'Executive Coordinator', 'Investor Relations'] },
  { name: 'Developers', roles: ['Executive Developer', 'Software Developer'] },
  { name: 'Graduate Advisors', roles: ['Graduate Advisor'] },
  { name: 'Faculty Advisor', roles: ['Faculty Advisor'] },
];

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    void navigator.clipboard
      .writeText(member.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1800);
      })
      .catch(() => {
        /* clipboard unavailable */
      });
  };

  return (
    <Reveal direction="up" delay={(index % 3) * 0.08} className="h-full">
      <GlowCard tilt={8} className="h-full p-7 text-center">
        {/* Portrait */}
        <div className="relative mx-auto h-28 w-28">
          <span className="absolute -inset-1 rounded-full bg-linear-to-tr from-crimson-600 via-crimson-400 to-orange-400 opacity-60 blur-[6px] transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute inset-0 overflow-hidden rounded-full ring-2 ring-ink-900">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </span>
        </div>

        <h3 className="mt-5 font-display text-lg font-semibold text-white">{member.name}</h3>
        <p className="mt-1 font-mono text-[0.7rem] tracking-[0.16em] text-crimson-400 uppercase">{member.position}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[0.72rem] text-ink-400">
          {member.major && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <GraduationCap className="h-3 w-3 text-crimson-400" />
              {member.major}
            </span>
          )}
          {member.hometown && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <MapPin className="h-3 w-3 text-crimson-400" />
              {member.hometown}
            </span>
          )}
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-400">{member.bio}</p>

        <button
          type="button"
          onClick={copyEmail}
          className="mt-5 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[0.7rem] text-ink-300 transition-colors duration-300 hover:border-crimson-400/50 hover:text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="done"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2 text-crimson-300"
              >
                <Check className="h-3.5 w-3.5" /> Copied
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2"
              >
                <Copy className="h-3.5 w-3.5" /> {member.email}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </GlowCard>
    </Reveal>
  );
};

const TeamPage = () => {
  const [filter, setFilter] = useState('All');

  const grouped = useMemo(
    () =>
      GROUPS.map((g) => ({
        name: g.name,
        members: teamMembers.filter((m) => g.roles.includes(m.position)),
      })).filter((g) => g.members.length > 0),
    [],
  );

  const visible = filter === 'All' ? grouped : grouped.filter((g) => g.name === filter);

  return (
    <PageShell className="px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal direction="up">
            <Eyebrow className="justify-center">The people</Eyebrow>
          </Reveal>
          <h1 className="mt-6 text-section font-bold text-white">
            <Typewriter text="Meet the team" speed={70} />
          </h1>
          <Reveal direction="up" delay={0.6}>
            <p className="mt-5 text-lg leading-relaxed text-ink-300 text-pretty">
              The students and faculty keeping the lights on, the workshops running, and the GPUs warm.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal direction="up" delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            <Chip
              active={filter === 'All'}
              onClick={() => {
                setFilter('All');
              }}
            >
              All · {teamMembers.length}
            </Chip>
            {grouped.map((g) => (
              <Chip
                key={g.name}
                active={filter === g.name}
                onClick={() => {
                  setFilter(g.name);
                }}
              >
                {g.name} · {g.members.length}
              </Chip>
            ))}
          </div>
        </Reveal>

        {/* Groups */}
        <div className="mt-16 space-y-20 pb-8">
          <AnimatePresence mode="popLayout">
            {visible.map((group) => (
              <motion.section
                key={group.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-9 flex items-center gap-5">
                  <h2 className="font-display text-2xl font-semibold whitespace-nowrap text-white sm:text-3xl">
                    {group.name}
                  </h2>
                  <span className="h-px flex-1 bg-linear-to-r from-crimson-500/50 to-transparent" />
                  <span className="font-mono text-xs text-ink-500">
                    {String(group.members.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member, i) => (
                    <MemberCard key={member.email} member={member} index={i} />
                  ))}
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </PageShell>
  );
};

export default TeamPage;

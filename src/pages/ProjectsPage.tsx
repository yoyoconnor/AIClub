import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/projectsData';
import { PageShell, Eyebrow, Typewriter } from '../components/ui/Bits';
import { Reveal } from '../components/ui/Reveal';
import { GlowCard } from '../components/ui/Cards';
import { Chip, GhostButton } from '../components/ui/Buttons';

const statusStyles: Record<string, string> = {
  Live: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200',
  'In progress': 'border-amber-400/40 bg-amber-500/15 text-amber-200',
  Archived: 'border-white/15 bg-white/8 text-ink-300',
};

const ProjectsPage = () => {
  const [tech, setTech] = useState('All');

  const allTech = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      p.technologies.forEach((t) => set.add(t));
    });
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = tech === 'All' ? projects : projects.filter((p) => p.technologies.includes(tech));

  return (
    <PageShell className="px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal direction="up">
            <Eyebrow className="justify-center">Things we&apos;ve built</Eyebrow>
          </Reveal>
          <h1 className="mt-6 text-section font-bold text-white">
            <Typewriter text="Our projects" speed={70} />
          </h1>
          <Reveal direction="up" delay={0.6}>
            <p className="mt-5 text-lg leading-relaxed text-ink-300 text-pretty">
              From browser-based neural networks to the infrastructure behind this club. Every one of these started as
              somebody&apos;s idea at a meeting.
            </p>
          </Reveal>
        </div>

        {/* Tech filter */}
        <Reveal direction="up" delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {allTech.map((t) => (
              <Chip
                key={t}
                active={tech === t}
                onClick={() => {
                  setTech(t);
                }}
              >
                {t}
              </Chip>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-16 grid gap-7 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const external = project.link?.startsWith('http') ?? false;

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlowCard className="h-full">
                    <div className="relative aspect-16/9 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/30 to-transparent" />
                      {project.status && (
                        <span
                          className={`absolute top-4 right-4 rounded-full border px-3 py-1 font-mono text-[0.65rem] tracking-wide uppercase backdrop-blur-md ${statusStyles[project.status]}`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h2 className="font-display text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-crimson-200">
                        {project.title}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-400">{project.description}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-crimson-500/20 bg-crimson-600/10 px-2.5 py-1 font-mono text-[0.65rem] text-crimson-200/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <div className="mt-7">
                          {external ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-wide text-crimson-300 uppercase transition-colors hover:text-crimson-200"
                            >
                              <Github className="h-4 w-4" />
                              View source
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </a>
                          ) : (
                            <Link
                              to={project.link}
                              className="group/link inline-flex items-center gap-2 font-mono text-xs tracking-wide text-crimson-300 uppercase transition-colors hover:text-crimson-200"
                            >
                              Open project
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && <p className="mt-16 text-center text-ink-400">No projects use {tech} yet.</p>}

        {/* Contribute */}
        <Reveal direction="up" className="mt-24 mb-8">
          <div className="rounded-3xl border border-dashed border-white/12 bg-white/[0.02] p-10 text-center">
            <h3 className="font-display text-2xl font-semibold text-white">Got an idea?</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-400">
              Project teams form every semester and members pitch their own. Bring yours to the next meeting.
            </p>
            <div className="mt-7 flex justify-center">
              <GhostButton href="https://github.com/AIClubUA">
                <Github className="h-4 w-4" />
                See our GitHub
              </GhostButton>
            </div>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
};

export default ProjectsPage;

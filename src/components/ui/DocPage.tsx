import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell, Eyebrow } from './Bits';
import { Reveal } from './Reveal';

type DocPageProps = {
  title: string;
  eyebrow?: string;
  lede?: string;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
};

/**
 * Shared shell for long-form content pages (meeting agendas, tutorials).
 * The `.doc` class applies dark-theme typography to plain markup inside.
 */
export const DocPage = ({
  title,
  eyebrow,
  lede,
  backTo = '/events',
  backLabel = 'All events',
  children,
}: DocPageProps) => (
  <PageShell className="px-5 pt-20 pb-16 sm:px-8">
    <article className="mx-auto max-w-3xl">
      <Reveal direction="up">
        <Link
          to={backTo}
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-wide text-ink-400 uppercase transition-colors hover:text-crimson-300"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          {backLabel}
        </Link>
      </Reveal>

      <header className="mt-8 border-b border-white/10 pb-10">
        {eyebrow && (
          <Reveal direction="up" delay={0.05}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal direction="up" delay={0.1}>
          <h1 className="mt-5 text-section font-bold text-white text-balance">{title}</h1>
        </Reveal>
        {lede && (
          <Reveal direction="up" delay={0.18}>
            <p className="mt-5 text-lg leading-relaxed text-ink-300 text-pretty">{lede}</p>
          </Reveal>
        )}
      </header>

      <Reveal direction="up" delay={0.15}>
        <div className="doc mt-10">{children}</div>
      </Reveal>
    </article>
  </PageShell>
);

export default DocPage;

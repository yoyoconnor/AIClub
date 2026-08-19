import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUp, Github, Mail, MapPin } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const quickLinks = [
  { label: 'About', to: '/about' },
  { label: 'All Events', to: '/events' },
  { label: 'Projects', to: '/projects' },
  { label: 'Team', to: '/team' },
];

const contacts = [
  { label: 'sdhanegan@crimson.ua.edu', href: 'mailto:sdhanegan@crimson.ua.edu' },
  { label: 'fjgutierez@ua.edu', href: 'mailto:fjgutierez@ua.edu' },
];

const Footer = () => (
  <footer className="relative mt-24 overflow-hidden border-t border-white/8">
    {/* Glow bleed from the top edge */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-crimson-700/20 blur-[110px]"
    />

    <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <Reveal direction="up">
          <div>
            <Link to="/" className="group inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-crimson-600/15 ring-1 ring-crimson-500/30 transition-transform duration-300 group-hover:scale-105">
                <img src="/web-app-manifest-192x192.png" alt="" className="h-7 w-7 object-contain" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                University of Alabama <span className="text-gradient">AI Club</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-400">
              A student-run community building, breaking and understanding artificial intelligence — one workshop,
              hackathon and late-night debugging session at a time.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/AIClubUA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-400/50 hover:text-white"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="mailto:sdhanegan@crimson.ua.edu"
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-crimson-400/50 hover:text-white"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Links */}
        <Reveal direction="up" delay={0.1}>
          <div>
            <h4 className="eyebrow text-ink-500">Explore</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-ink-300 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-crimson-500 transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal direction="up" delay={0.2}>
          <div>
            <h4 className="eyebrow text-ink-500">Contact</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {contacts.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="text-ink-300 transition-colors duration-300 hover:text-crimson-300">
                    {c.label}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2 pt-1 text-ink-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson-500" />
                Tuscaloosa, Alabama
              </li>
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="mt-16 select-none">
        <div className="bg-linear-to-b from-white/8 to-transparent bg-clip-text text-center font-display text-[clamp(3rem,15vw,11rem)] leading-none font-bold tracking-tighter text-transparent">
          AI CLUB
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row">
        <p className="font-mono text-xs text-ink-500">
          © {new Date().getFullYear()} AI Club · The University of Alabama
        </p>
        <motion.button
          type="button"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-ink-300 transition-colors hover:border-crimson-400/50 hover:text-white"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </div>
  </footer>
);

export default Footer;

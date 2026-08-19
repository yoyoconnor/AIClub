import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

type NavItem = { label: string; to?: string; action?: 'events' | 'join' };

const NAV: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Events', action: 'events' },
  { label: 'Projects', to: '/projects' },
  { label: 'Team', to: '/team' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24);
  });

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close the drawer whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      void navigate('/', { state: { scrollTarget: id } });
    }
    setIsOpen(false);
  };

  const handleNav = (item: NavItem) => {
    if (item.action) scrollToSection(item.action);
    setIsOpen(false);
  };

  const isActive = (item: NavItem) => item.to !== undefined && location.pathname === item.to;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 ${
            scrolled
              ? 'h-14 border border-white/10 bg-ink-900/75 shadow-[0_10px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl'
              : 'h-16 border border-transparent bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="relative grid h-9 w-9 place-items-center rounded-xl bg-crimson-600/15 ring-1 ring-crimson-500/30"
            >
              <img src="/web-app-manifest-192x192.png" alt="" className="h-6 w-6 object-contain" />
              <span className="absolute inset-0 rounded-xl bg-crimson-500/25 blur-md transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            </motion.span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight text-white">AI Club</span>
              <span className="mt-0.5 font-mono text-[0.6rem] tracking-[0.18em] text-ink-400 uppercase">Alabama</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) =>
              item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(item) ? 'text-white' : 'text-ink-300 hover:text-white'
                  }`}
                >
                  {isActive(item) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full border border-crimson-500/40 bg-crimson-600/20"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    handleNav(item);
                  }}
                  className="relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-ink-300 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                scrollToSection('join');
              }}
              className="group hidden cursor-pointer items-center gap-1.5 rounded-full bg-crimson-600 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-crimson-500 hover:shadow-[0_8px_28px_-8px] hover:shadow-crimson-500/80 md:inline-flex"
            >
              Join us
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen((v) => !v);
              }}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-crimson-400/50 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setIsOpen(false);
              }}
              className="absolute inset-0 h-full w-full cursor-default bg-ink-950/85 backdrop-blur-xl"
            />

            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full flex-col justify-center gap-2 px-8"
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="group flex items-baseline gap-4 border-b border-white/8 py-4"
                    >
                      <span className="font-mono text-xs text-crimson-500">0{i + 1}</span>
                      <span className="font-display text-3xl font-semibold text-white transition-transform duration-300 group-hover:translate-x-1.5">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        handleNav(item);
                      }}
                      className="group flex w-full items-baseline gap-4 border-b border-white/8 py-4 text-left"
                    >
                      <span className="font-mono text-xs text-crimson-500">0{i + 1}</span>
                      <span className="font-display text-3xl font-semibold text-white transition-transform duration-300 group-hover:translate-x-1.5">
                        {item.label}
                      </span>
                    </button>
                  )}
                </motion.div>
              ))}

              <motion.button
                type="button"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                onClick={() => {
                  scrollToSection('join');
                }}
                className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-crimson-600 px-6 py-4 font-medium text-white"
              >
                Join the club
                <ArrowUpRight className="h-4 w-4" />
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

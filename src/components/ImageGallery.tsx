import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryImages } from '../data/galleryImages';
import { SectionHeading } from './ui/Bits';
import { Reveal } from './ui/Reveal';

const ImageGallery = () => {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => {
    setIndex(null);
  }, []);

  const step = useCallback((dir: number) => {
    setIndex((current) => {
      if (current === null) return current;
      return (current + dir + galleryImages.length) % galleryImages.length;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, step]);

  const active = index === null ? null : galleryImages[index];

  return (
    <section className="relative section px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="In the room"
          title={
            <>
              Club <span className="text-gradient">moments</span>
            </>
          }
          lede="Whiteboards, wrong answers, working demos, and a lot of pizza."
        />

        <div className="mt-16 columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src} direction="scale" delay={(i % 3) * 0.08} className="break-inside-avoid">
              <motion.button
                type="button"
                onClick={() => {
                  setIndex(i);
                }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-107"
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-3 font-mono text-xs tracking-wide text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View →
                </span>
                <span className="absolute inset-0 rounded-2xl ring-1 ring-crimson-500/0 transition-all duration-500 group-hover:ring-crimson-500/50" />
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.figure
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <img src={active.src} alt={active.alt} className="max-h-[80vh] w-full bg-ink-900 object-contain" />

              <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 bg-ink-900/90 px-5 py-3">
                <span className="font-mono text-xs text-ink-400">
                  {String((index ?? 0) + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                </span>
                <span className="truncate text-sm text-ink-300">{active.alt}</span>
              </figcaption>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-3 right-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur-md transition-colors hover:border-crimson-400/60"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute top-1/2 left-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur-md transition-colors hover:border-crimson-400/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  step(1);
                }}
                aria-label="Next image"
                className="absolute top-1/2 right-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white backdrop-blur-md transition-colors hover:border-crimson-400/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;

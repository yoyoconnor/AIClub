import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/heroSection';
import Pillars from '../components/pillars';
import Events from '../components/clubEvents';
import Gallery from '../components/ImageGallery';
import JoinCta from '../components/joinCta';
import { PageShell } from '../components/ui/Bits';

type ScrollState = { scrollTarget?: string } | null;

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as ScrollState;
    const target = state?.scrollTarget;
    if (!target) return;

    const timeout = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        void navigate(location.pathname, { replace: true, state: {} });
      }
    }, 320);

    return () => {
      clearTimeout(timeout);
    };
  }, [location, navigate]);

  return (
    <PageShell>
      <Hero />
      <Pillars />
      <Events />
      <Gallery />
      <JoinCta />
    </PageShell>
  );
};

export default HomePage;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls the window to the top on mount. */
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
};

/**
 * Route-level scroll restoration. Jumps to the top on every navigation
 * unless the route was pushed with a `scrollTarget` in its state.
 */
export const useRouteScrollReset = () => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTarget?: string } | null;
    if (state?.scrollTarget) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname, location.state]);
};

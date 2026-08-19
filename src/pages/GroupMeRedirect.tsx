import { useEffect } from 'react';

const GROUPME_INVITE = 'https://groupme.com/join_group/105677154/OgIGuhFU';

const GroupMeRedirect = () => {
  useEffect(() => {
    window.location.replace(GROUPME_INVITE);
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-ink-950 px-5 text-center">
      <div>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-crimson-400" />
        <p className="mt-5 font-mono text-xs tracking-[0.18em] text-ink-400 uppercase">Opening GroupMe…</p>
        <a href={GROUPME_INVITE} className="mt-4 inline-block text-sm text-crimson-300 hover:text-crimson-200">
          Continue manually
        </a>
      </div>
    </main>
  );
};

export default GroupMeRedirect;

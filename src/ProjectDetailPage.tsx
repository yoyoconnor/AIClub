import { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from './components/ui/Bits';

// TensorFlow.js is heavy — only pull it in when this project is opened.
const Digits = lazy(() => import('./pages/projects/digits'));

const Loading = () => (
  <div className="grid min-h-[60vh] place-items-center">
    <div className="flex flex-col items-center gap-4">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-crimson-500" />
      <span className="font-mono text-xs tracking-[0.2em] text-ink-500 uppercase">Loading model…</span>
    </div>
  </div>
);

function ProjectDetailPage() {
  const { projectId } = useParams();

  if (projectId === 'digits') {
    return (
      <PageShell>
        <Suspense fallback={<Loading />}>
          <Digits />
        </Suspense>
      </PageShell>
    );
  }

  return (
    <PageShell className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-6xl font-bold text-white/10">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">Project not found</h1>
        <p className="mt-4 text-ink-400">
          We don&apos;t have a page for <span className="font-mono text-crimson-300">{projectId}</span> yet.
        </p>
        <Link
          to="/projects"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm text-ink-200 transition-colors hover:border-crimson-400/50 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to projects
        </Link>
      </div>
    </PageShell>
  );
}

export default ProjectDetailPage;

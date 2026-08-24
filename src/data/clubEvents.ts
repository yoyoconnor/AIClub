export type EventCategory = 'Workshop' | 'Industry' | 'Project Lab' | 'Community';

export type EventType = {
  title: string;
  date: string;
  description: string;
  link?: string;
  image: string;
  time?: string;
  location?: string;
  category?: EventCategory;
  sample?: boolean;
};

export const events: EventType[] = [
  {
    title: 'AI for Business Kickoff',
    date: '2026-09-03',
    time: '6:00 PM',
    location: 'Hewson Hall · Room 1017',
    category: 'Community',
    description: 'Meet the club, form cross-functional teams, and explore the practical AI problems we will tackle this semester.',
    image: '/group_meeting.webp',
    sample: true,
  },
  {
    title: 'Automate Your First Workflow',
    date: '2026-09-10',
    time: '6:00 PM',
    location: 'Hewson Hall · Room 2008',
    category: 'Workshop',
    description: 'Map a repetitive process and turn it into a working AI-assisted automation—no prior coding experience required.',
    image: '/codingSession.webp',
    sample: true,
  },
  {
    title: 'Applied AI Industry Panel',
    date: '2026-09-17',
    time: '5:30 PM',
    location: 'Alston Hall · Parlor',
    category: 'Industry',
    description: 'Operators, analysts, and engineers share where AI is producing measurable value inside real organizations.',
    image: '/ELM_0009.webp',
    sample: true,
  },
  {
    title: 'Customer Insight Sprint',
    date: '2026-09-24',
    time: '6:00 PM',
    location: 'Hewson Hall · Room 1017',
    category: 'Project Lab',
    description: 'Use language models to turn messy customer feedback into themes, evidence, and an actionable recommendation.',
    image: '/AI_hero.webp',
    sample: true,
  },
  {
    title: 'Build an AI Research Assistant',
    date: '2026-10-01',
    time: '6:00 PM',
    location: 'Hewson Hall · Room 2008',
    category: 'Workshop',
    description: 'Build a reliable research workflow that finds sources, compares evidence, and produces cited briefs.',
    image: '/codingSession.webp',
    sample: true,
  },
  {
    title: 'AI Product Case Competition',
    date: '2026-10-08',
    time: '5:00 PM',
    location: 'Hewson Hall · Fitzpatrick Auditorium',
    category: 'Project Lab',
    description: 'Teams pitch an AI-enabled product with a defined customer, adoption plan, risk analysis, and business case.',
    image: '/row5.webp',
    sample: true,
  },
  {
    title: 'Responsible AI in Practice',
    date: '2026-10-15',
    time: '6:00 PM',
    location: 'North Engineering Research Center',
    category: 'Industry',
    description: 'A practical session on privacy, evaluation, human review, and responsible deployment in organizations.',
    image: '/wordvector.png',
    sample: true,
  },
  {
    title: 'Data to Decision Dashboard',
    date: '2026-10-29',
    time: '6:00 PM',
    location: 'Hewson Hall · Room 2008',
    category: 'Workshop',
    description: 'Turn a raw dataset into an interactive decision tool with useful metrics, forecasts, and a clear narrative.',
    image: '/AI_hero.webp',
    sample: true,
  },
  {
    title: 'Founder Fireside: Building with AI',
    date: '2026-11-05',
    time: '6:00 PM',
    location: 'Alston Hall · Parlor',
    category: 'Industry',
    description: 'A candid conversation about finding the right problem, shipping an AI product, and earning user trust.',
    image: '/ELM_0009.webp',
    sample: true,
  },
  {
    title: 'Fall Impact Showcase',
    date: '2026-11-19',
    time: '5:30 PM',
    location: 'Hewson Hall · Atrium',
    category: 'Community',
    description: 'Project teams demo what they built, explain the outcomes, and share what they would improve next.',
    image: '/group_meeting.webp',
    sample: true,
  },
];

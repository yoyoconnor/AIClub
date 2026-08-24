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
    title: 'Get on Board Day',
    date: '2026-08-27',
    location: 'Lloyd Hall 38',
    category: 'Community',
    description: 'Meet the Alabama AI Club and learn how to get involved in practical AI projects, workshops, and industry events.',
    image: '/group_meeting.webp',
  },
  {
    title: 'Fall Kickoff',
    date: '2026-09-08',
    location: 'Lloyd Hall 38',
    category: 'Community',
    description: 'Kick off the semester with Dr. Mohler, guests from Tesla, and faculty looking to connect with students.',
    image: '/group_meeting.webp',
  },
  {
    title: 'Cheese CIO',
    date: '2026-09-22',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'An industry-focused conversation on leadership, technology, and the practical use of AI in organizations.',
    image: '/ELM_0009.webp',
  },
  {
    title: 'Claire Major: AI Education',
    date: '2026-10-06',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'Claire Major joins the club for a discussion about artificial intelligence and the future of education.',
    image: '/AI_hero.webp',
  },
  {
    title: 'Caroline Sisson Aulbach',
    date: '2026-10-20',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'A guest session with Caroline Sisson Aulbach focused on practical experience, emerging technology, and career insights.',
    image: '/ELM_0009.webp',
  },
  {
    title: 'Ben Smith: Chairman, Kearney',
    date: '2026-11-03',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'Ben Smith, Chairman of Kearney, shares a business perspective on AI, strategy, and organizational transformation.',
    image: '/ELM_0009.webp',
  },
  {
    title: 'Year-End Meeting',
    date: '2026-11-17',
    location: 'Lloyd Hall 38',
    category: 'Community',
    description: 'Close out the semester, reflect on the club’s progress, and preview what is coming next.',
    image: '/group_meeting.webp',
  },
];

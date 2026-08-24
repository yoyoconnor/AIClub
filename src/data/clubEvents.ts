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
    description: 'Get On Board Day.',
    image: '/group_meeting.webp',
  },
  {
    title: 'Fall Kickoff',
    date: '2026-09-08',
    location: 'Lloyd Hall 38',
    category: 'Community',
    description: 'Fall kickoff meeting.',
    image: '/group_meeting.webp',
  },
  {
    title: 'Chase CIO',
    date: '2026-09-22',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'Guest session with the Chase CIO.',
    image: '/ELM_0009.webp',
  },
  {
    title: 'Claire Major: AI Education',
    date: '2026-10-06',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'Claire Major presents on AI education.',
    image: '/AI_hero.webp',
  },
  {
    title: 'Caroline Sisson Aulbach',
    date: '2026-10-20',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'Guest session with Caroline Sisson Aulbach.',
    image: '/ELM_0009.webp',
  },
  {
    title: 'Ben Smith: Chairman, Kearney',
    date: '2026-11-03',
    location: 'Lloyd Hall 38',
    category: 'Industry',
    description: 'Ben Smith, Chairman at Kearney.',
    image: '/ELM_0009.webp',
  },
  {
    title: 'Year-End Meeting',
    date: '2026-11-17',
    location: 'Lloyd Hall 38',
    category: 'Community',
    description: 'Year-end meeting.',
    image: '/group_meeting.webp',
  },
];

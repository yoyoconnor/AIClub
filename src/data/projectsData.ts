export type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  status?: 'Live' | 'In progress' | 'Archived';
};

export const projects: Project[] = [
  {
    title: 'Handwritten Digit Recognizer',
    description:
      'A neural network trained on MNIST that runs entirely in your browser — draw a digit on the canvas and watch the model classify it in real time, no server round-trip required.',
    technologies: ['TensorFlow.js', 'React', 'Canvas API', 'TypeScript'],
    image: '/AI_hero.webp',
    link: '/projects/digits',
    status: 'Live',
  },
  {
    title: 'AI Club Website',
    description:
      'This very site — a fully static React app with route-level animations, a PWA service worker, and a design system built on Tailwind. Maintained entirely by club members.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite'],
    image: '/codingSession.webp',
    link: 'https://github.com/AIClubUA/AIClubWebsite',
    status: 'Live',
  },
  {
    title: 'Word Vector Playground',
    description:
      'An exploration of word embeddings built during our post-Microsoft meeting: training Word2Vec from scratch, then visualizing the semantic space to see which words actually cluster together.',
    technologies: ['Python', 'Gensim', 'NumPy', 'Matplotlib'],
    image: '/wordvector.png',
    link: '/4-17-25',
    status: 'Archived',
  },
];

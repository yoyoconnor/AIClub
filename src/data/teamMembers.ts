export type TeamMember = {
  name: string;
  position: string;
  major?: string;
  hometown?: string;
  image?: string;
  bio: string;
  email?: string;
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Zach Groves',
    position: 'President',
    major: 'Computer Engineering · STEM-to-MBA',
    hometown: 'Woodcliff Lake, NJ',
    bio: 'Founder of GradePath focused on applied AI, automation, and building useful products. Zach leads the club’s vision, partnerships, and practical AI initiatives.',
    linkedin: 'https://www.linkedin.com/in/zachary-lyle-groves/',
  },
  {
    name: 'Connor Barbaccia',
    position: 'Vice President',
    major: 'Mathematics and Computer Science',
    hometown: 'Naperville, IL',
    image: '/team/connor.webp',
    bio: 'Connor builds software and applied AI products. He leads the club’s technology, digital platforms, and project execution.',
    email: 'crbarbacciw@crimson.ua.edu',
    linkedin: 'https://www.linkedin.com/in/connor-barbaccia',
  },
  {
    name: 'Dawson Sconyers',
    position: 'Operations Officer',
    major: 'Computer Science · STEM-to-MBA',
    hometown: 'Tuscaloosa, AL',
    bio: 'Dawson combines software, business, and project-planning experience to manage club operations and turn new initiatives into well-run programs.',
    linkedin: 'https://www.linkedin.com/in/dawson-sconyers/',
  },
  {
    name: 'Michal Zajac',
    position: 'Graduate Advisor',
    major: 'Computer Science',
    hometown: 'Palos Heights, IL',
    image: '/team/michal.webp',
    bio: 'A driven computer science professional, excels in data and software engineering, problem-solving, and team leadership.',
    email: 'mpzajac@crimson.ua.edu',
  },
  {
    name: 'Andy Hahn',
    position: 'Graduate Advisor',
    major: 'Computer Science',
    hometown: 'Arlington Hts, IL',
    image: '/team/andy.webp',
    bio: 'Delivered impactful cost-saving solutions at Dell and Mercedes-Benz. He thrives on solving complex challenges in dynamic environments.',
    email: 'ahahn1@crimson.ua.edu',
  },
  {
    name: 'Dr. Gong',
    position: 'Faculty Advisor',
    image: '/team/gong.webp',
    bio: 'Associate professor of Computer Science, specializes in AI applications across healthcare, engineering, and public services.',
    email: 'jiaqi.gong@ua.edu',
  },
  {
    name: 'Fabricio Gutierrez',
    position: 'Software Developer',
    major: 'Software Engineering',
    hometown: 'Lima, Perú',
    image: '/team/fabricio.webp',
    bio: '',
    email: 'fjgutierrez@ua.edu',
  },
  {
    name: 'Landon Eskridge',
    position: 'Graduate Advisor',
    major: 'Chemical Engineering',
    hometown: 'Wichita, KS',
    image: '/team/landon.webp',
    bio: "Motivated chemical engineer and MBA student with hands-on field experience and a keen interest in AI. Skilled in organization, event coordination, and public relations, driven to build a connected AI community and explore the technology's transformative potential.",
    email: 'lreskridge@crimson.ua.edu',
  },
];

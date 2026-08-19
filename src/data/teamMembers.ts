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
    image: '/team/zach.png',
    bio: 'Founder of GradePath focused on applied AI, automation, and building useful products. Zach leads the club’s vision, partnerships, and practical AI initiatives.',
    email: 'aiclub@ua.edu',
    linkedin: 'https://www.linkedin.com/in/zachary-lyle-groves/',
  },
  {
    name: 'Connor Barbaccia',
    position: 'Vice President',
    major: 'Mathematics and Computer Science',
    hometown: 'Naperville, IL',
    image: '/team/connor.webp',
    bio: 'Connor builds software and applied AI products. He leads the club’s technology, digital platforms, and project execution.',
    email: 'aiclub@ua.edu',
    linkedin: 'https://www.linkedin.com/in/connor-barbaccia',
  },
  {
    name: 'Dawson Sconyers',
    position: 'Operations Officer',
    major: 'Computer Science · STEM-to-MBA',
    hometown: 'Tuscaloosa, AL',
    image: '/team/dawson.png',
    bio: 'Dawson combines software, business, and project-planning experience to manage club operations and turn new initiatives into well-run programs.',
    email: 'aiclub@ua.edu',
    linkedin: 'https://www.linkedin.com/in/dawson-sconyers/',
  },
  {
    name: 'Dr. Gong',
    position: 'Faculty Advisor',
    image: '/team/gong.webp',
    bio: 'Associate professor of Computer Science, specializes in AI applications across healthcare, engineering, and public services.',
    email: 'aiclub@ua.edu',
  },
  {
    name: 'Fabricio Gutierrez',
    position: 'Software Developer',
    major: 'Software Engineering',
    hometown: 'Lima, Perú',
    image: '/team/fabricio.webp',
    bio: '',
    email: 'aiclub@ua.edu',
  },
];

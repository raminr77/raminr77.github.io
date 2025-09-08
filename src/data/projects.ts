import { ROUTES } from '@/shared/constants';

export type ProjectItem = {
  id: number;
  role: string;
  title: string;
  stack: string[];
  isPrivate: boolean;
  url: string | null;
  description: string;
};

export const PROJECTS_DATA: {
  title: string;
  footer: string;
  description: string;
  items: ProjectItem[];
  footerActionLabel: string;
  footerActionURL: (typeof ROUTES)[keyof typeof ROUTES];
} = {
  title: 'Projects',
  footerActionURL: ROUTES.CONTACT_ME,
  footerActionLabel: 'Help Me To Find You ( Contact me )',
  description: 'Some experiences happened<br />Outside the companies',
  footer: 'We can create a idea and develop the future for everyone',
  items: [
    {
      id: 1,
      title: 'Raven System',
      url: null,
      role: 'Software Engineer | Full Stack',
      stack: [
        'Python',
        'Django',
        'SQL',
        'MySQL',
        'REST API',
        'React',
        'TypeScript',
        'Tailwind',
        'HTML',
        'CSS',
        'SASS'
      ],
      isPrivate: true,
      description:
        'A complete accounting system for managing major purchases and sales with the ability to display graphs and calculate sales profit in different modes. Currently, I handle more than 1000 products in 2 stores. In this project, I am using Python (Django) and Javascript/Typescript (React)'
    },
    {
      id: 2,
      url: null,
      isPrivate: true,
      role: 'Software Engineer | Full Stack',
      title: 'Setaregan Club Management System',
      stack: [
        'PHP',
        'Laravel',
        'SQL',
        'MySQL',
        'REST API',
        'React',
        'HTML',
        'CSS',
        'SASS'
      ],
      description:
        'Develop a large-scale club management system with features like: payment, insurance, monthly payments, user system, and marketing. In this project, I am using PHP (Laravel) and Javascript/Typescript (React)'
    },
    {
      id: 3,
      url: null,
      isPrivate: true,
      title: 'Nano Sakhtar',
      role: 'Software Engineer | Full Stack',
      stack: [
        'Python',
        'Django',
        'MySQL',
        'REST API',
        'React',
        'HTML',
        'CSS',
        'SASS',
        'Tailwind'
      ],
      description:
        'This project includes detailed product introductions in a professional and multilingual format. One of the challenges in this project is handling the loading of a large number of high-resolution images and generating or editing images on the backend. I am using Python (Django) and Javascript/Typescript (React)'
    },
    {
      id: 4,
      url: null,
      isPrivate: true,
      title: 'Nano Alarm',
      role: 'Software Engineer | Full Stack',
      stack: ['React', 'HTML', 'CSS', 'SASS'],
      description:
        'Online store of security products with the possibility of special authentication for sales representatives in the country and with support for more than 4 different modes of selling goods to representatives and ordinary people.'
    },
    {
      id: 5,
      url: 'https://github.com/raminr77/csv-row-printer',
      isPrivate: false,
      title: 'CSV Row Printer',
      role: 'Personal Project - Developer',
      stack: ['JavaScript', 'HTML', 'CSS', 'SASS'],
      description:
        'CSV Row Printer is a small tool that helps you upload your CSV files to it and separate the information in each row and print it as a card or output it.'
    },
    {
      id: 6,
      url: 'https://github.com/raminr77/raminr77.github.io',
      isPrivate: false,
      title: 'Personal Website ( this one )',
      role: 'Personal Project - Developer',
      stack: [
        'JavaScript',
        'HTML',
        'CSS',
        'SASS',
        'Gsap',
        'React 19',
        'Tailwind CSS',
        'Next JS 15',
        'Cloudflare Workers'
      ],
      description:
        'Built a modern personal website using React 19, Next.js 15, Tailwind CSS, and GSAP, with Cloudflare Workers for serverless functions, ensuring high performance and smooth animations.'
    },
    {
      id: 7,
      url: 'https://github.com/raminr77/khela-client',
      isPrivate: false,
      title: 'Khela Application ( PWA )',
      role: 'Software Engineer | Full Stack',
      stack: [
        'PWA',
        'WebApp Configs',
        'JavaScript',
        'HTML',
        'CSS',
        'SASS',
        'React 19',
        'Tailwind CSS',
        'Cache UI'
      ],
      description:
        'Khela is a fun side project I work on in my free time, mainly focused on improving and learning skills around building a Progressive Web App (PWA). My goal is to push a regular web app as close as possible to the experience of a native mobile app.'
    },
    {
      id: 8,
      url: 'https://github.com/raminr77/react-sample',
      isPrivate: false,
      title: 'React Sample',
      role: 'Open Source - Developer',
      stack: [
        'PWA',
        'React 19',
        'RTK Query',
        'JavaScript',
        'TypeScript',
        'Zero Config',
        'React Router',
        'WebApp Configs',
        'React Sample Project'
      ],
      description:
        'A simple and clean React + TypeScript + Vite starter project, configured with essential tools and structured with best practices gained from 7+ years of frontend development experience. It is a sample of the ReactJs project for starting easily and fast.'
    }
  ]
} as const;

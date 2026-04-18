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
      id: 9,
      url: null,
      isPrivate: true,
      role: 'Software Engineer',
      title: 'Falcon AI Platform - AI Drone',
      stack: [
        'Python',
        'WebRTC',
        'Streaming',
        'TailScale VPN',
        'YOLO Model',
        'MediaMTX',
        'Grafana'
      ],
      description:
        'Falcon is a personal project where I designed and built an AI-powered autonomous drone system capable of real-time video and audio streaming, obstacle detection, and automatic landing. The drone streams data via WebRTC to backend services, where models like YOLO handle decision-making. The system is built as a secure distributed architecture with monitoring and observability in place.'
    },
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
        'A complete accounting system designed to manage large-scale purchase and sales workflows, with support for detailed analytics, visual reports, and flexible profit calculations. The system currently handles over 1000 products across two stores. Built using Python (Django) for the backend and React with TypeScript for the frontend.'
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
        'A large-scale club management platform covering core business operations such as payments, insurance handling, subscription management, user management, and marketing tools. Built with PHP (Laravel) on the backend and React on the frontend, focusing on reliability and scalability.'
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
        'A product-focused platform with detailed, multilingual product presentations in a professional format. One of the main challenges was handling a large volume of high-resolution images, including backend processing for generating and editing media. Built using Django for backend services and React for the frontend.'
    },
    {
      id: 4,
      url: null,
      isPrivate: true,
      title: 'Nano Alarm',
      role: 'Software Engineer | Full Stack',
      stack: ['React', 'HTML', 'CSS', 'SASS'],
      description:
        'An online store for security products with a custom authentication system for sales representatives across the country. The platform supports multiple sales modes for both representatives and end users, with flexible pricing and access control logic.'
    },
    {
      id: 5,
      url: 'https://github.com/raminr77/csv-row-printer',
      isPrivate: false,
      title: 'CSV Row Printer',
      role: 'Personal Project - Developer',
      stack: ['JavaScript', 'HTML', 'CSS', 'SASS'],
      description:
        'CSV Row Printer is a lightweight tool that lets you upload CSV files, parse row data, and generate printable card-style outputs. It also supports basic data manipulation features such as grouping, merging, and customizing the generated cards.'
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
        'A modern personal website built with React, Next.js, Tailwind CSS, and GSAP for smooth animations. Cloudflare Workers are used for serverless functionality, resulting in a fast, responsive, and highly optimized experience.'
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
        'Khela is a fun side project I work on in my free time, mainly focused on exploring and improving skills around building Progressive Web Apps. The goal is to push a traditional web application closer to a native mobile app experience in terms of performance, caching, and usability.'
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
        'A clean and minimal React + TypeScript + Vite starter template, structured with best practices collected over years of frontend development. It is designed to help developers start new projects quickly with a solid and scalable foundation.'
    }
  ]
} as const;

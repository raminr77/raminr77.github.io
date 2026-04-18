export interface JourneyItem {
  id: number;
  year: number;
  date: string;
  url?: string;
  title: string;
  location: string;
  items?: string[];
  description: string;
}

const JOURNEY_ITEM_DATA: JourneyItem[] = [
  {
    id: 1,
    year: 1999,
    location: 'Isfahan, Iran',
    date: `11 Jan 1999 ( ${new Date().getFullYear() - 1999} years )`,
    title: 'Birthday',
    description:
      '<p>I was born on <strong>January 11, 1999</strong> in <em>Isfahan, Iran</em> 🇮🇷. This was the beginning of my journey, which later took me through software engineering, large-scale systems, and international opportunities.</p>'
  },
  {
    id: 2,
    year: 2013,
    location: 'Isfahan, Iran',
    date: 'Nov 2013 - Nov 2017',
    title: 'High School Graduation',
    description:
      '<p>I finished high school in <strong>Mathematics and Physics</strong>. These years helped me build strong logical thinking and problem-solving skills, which later became the foundation of my engineering mindset.</p>'
  },
  {
    id: 3,
    year: 2021,
    location: 'Isfahan, Iran',
    date: 'Nov 2017 - Nov 2021',
    title: 'University Graduation',
    description:
      '<p>I earned a Bachelor’s degree in <strong>Computer Software Engineering</strong> from <strong>Azad University (IAUN)</strong>. During university, I focused on software fundamentals, user behavior, and practical system building.</p>',
    items: [
      'Conducted research on user behavior and UI optimization.',
      'Teaching Assistant for courses in Graphic Design and Database Systems.'
    ]
  },
  {
    id: 4,
    year: 2019,
    location: 'Isfahan, Iran',
    date: 'Jan 2019 - Jan 2020',
    title: 'Self-Employed - Freelance Software Engineer',
    description:
      '<p>I started my professional journey as a <strong>Freelance Software Engineer</strong>, leading product development from requirements and system design to implementation, testing, and production monitoring.</p>',
    items: [
      'Led the development of several products, from identifying system requirements and partner dependencies to workload balancing, implementation, testing, and configuring metrics, alarms, monitors, and dashboards.',
      'Designed and implemented scalable RESTful APIs using Python (Django) and PHP (Laravel) for managing proprietary licenses, handling peak loads of 500 requests per second, and ensuring 99.9% uptime.'
    ]
  },
  {
    id: 5,
    year: 2019,
    location: 'Isfahan, Iran',
    date: 'Apr 2019 - Aug 2020',
    title: 'Snapp, SnappCarFix - Software Engineer / Frontend Team Lead',
    url: 'https://www.linkedin.com/company/snapp.ir/',
    description:
      '<p>At <strong>SnappCarFix</strong>, I worked as a frontend engineer and frontend team lead, helping deliver cross-functional products, modernize the frontend stack, and improve development speed and user experience.</p>',
    items: [
      'Led and mentored a team of 5+ engineers, driving delivery of cross-functional projects.',
      'Migrated a legacy WordPress platform to a modern React-based architecture, significantly improving user experience.',
      'Built a reusable component library, reducing development time and project setup by 40%.',
      'Improved performance by optimizing frontend features, reducing page load time by up to 20%.'
    ]
  },
  {
    id: 6,
    year: 2020,
    location: 'Tehran, Iran',
    date: 'Aug 2020 - Aug 2023',
    title: 'Digikala - Software Engineer / Senior Frontend Engineer',
    url: 'https://www.linkedin.com/company/digikala/',
    description:
      '<p>I joined <strong>Digikala</strong> and worked on large-scale e-commerce platforms with millions of users and daily visits. My focus was on performance, experimentation, frontend architecture, and platform reliability.</p>',
    items: [
      'Rebuilt two large-scale e-commerce platforms using React, Next.js, and TypeScript in agile teams.',
      'Worked on products with more than 40 million active users and 12 million unique visits per day.',
      'Led the campaign team for 1 year and developed a dynamic landing page system with 30+ reusable modules, reducing development time for campaigns.',
      'Implemented analytics and experimentation systems including Google Analytics and A/B testing, running 20+ experiments to improve user behavior insights.',
      'Improved backend performance by optimizing APIs and database queries, reducing response time by 10% and query load by 5%.',
      'Contributed to a micro-frontend architecture using Nx and worked within a large PHP monorepo with Symfony.',
      'Built and maintained automated testing pipelines with Jest and Cypress, improving code quality and reliability.'
    ]
  },
  {
    id: 7,
    year: 2023,
    date: 'Aug 2023',
    location: 'Malmö, Sweden',
    title: 'Relocation to Sweden',
    description:
      '<p>In <strong>August 2023</strong>, I moved to <strong>Malmö, Sweden</strong> 🇸🇪. This was the beginning of a new international chapter in my career, with bigger systems, broader impact, and new challenges.</p>'
  },
  {
    id: 8,
    year: 2023,
    date: 'Aug 2023 - Apr 2025',
    location: 'Malmö, Sweden',
    url: 'https://www.linkedin.com/company/boozt-fashion/',
    title: 'Boozt - Senior Frontend Engineer',
    description:
      '<p>At <strong>Boozt</strong>, I worked as a <strong>Senior Frontend Engineer</strong> on internal platforms and customer-facing systems, improving CMS capabilities, automation, localization, and frontend performance.</p>',
    items: [
      'Built and scaled a CMS platform for generating dynamic web pages, promotions, and campaign pages for 17 countries, with seamless mobile app integration.',
      'Built a translation service using Google AI tools to localize CMS content automatically across multiple stores and languages.',
      'Improved performance by optimizing data structures and eliminating redundant computations.',
      'Designed an internal asset management system using Google Cloud and a Node.js backend API, reducing dependency on external services.',
      'Developed serverless solutions with GCP Cloud Functions, reducing operational overhead by around 10%, and implemented automation for tracking data changes and triggering downstream jobs.',
      'Led migration to React and TypeScript, improving maintainability, performance, and frontend architecture.',
      'Optimized rendering and reduced re-renders to improve load times and user experience.',
      'Contributed to CI/CD, code reviews, and automated testing across unit, integration, and E2E layers.',
      'Built an ML-powered image processing system using Google tools and TensorFlow.js to classify and cluster images, and automatically remove backgrounds for easier content usage.'
    ]
  },
  {
    id: 9,
    year: 2025,
    date: 'May 2025 - Now',
    location: 'Malmö, Sweden',
    url: 'https://www.linkedin.com/company/sinch/',
    title: 'Sinch - Software Engineer',
    description:
      '<p>At <strong>Sinch</strong>, I work on distributed systems, frontend platforms, backend services, observability, and infrastructure. My focus is on building scalable internal tools and improving reliability across complex architectures.</p>',
    items: [
      'Led development of MCP for the Account & Access domain, integrating with multiple internal tools and lovable, and winning an internal engineering competition.',
      'Led an end-to-end E2E testing initiative and observability dashboards using Grafana with Prometheus data, improving system visibility and reliability.',
      'Contributed to BFF services using Kotlin, integrating with large-scale microservices in a distributed architecture.',
      'Improved dashboard performance by optimizing frontend code and reducing system overhead through backend caching and streaming strategies.',
      'Enhanced frontend performance and Lighthouse scores across projects, and built and maintained shared UI libraries and packages.',
      'Worked within a large-scale micro-frontend architecture with 100+ micro-frontends.',
      'Designed and maintained CI/CD pipelines for automated testing and deployment workflows.',
      'Developed Helm charts and managed deployments on Kubernetes clusters.',
      'Worked with Istio, load balancing, scalable infrastructure patterns, and Kafka.'
    ]
  }
];

export const JOURNEY_DATA = {
  title: 'The Journey So Far',
  description: 'On a path toward <span className="text-2xl font-bold">Google</span>',
  items: JOURNEY_ITEM_DATA
} as const;

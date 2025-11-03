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
      '<p>I was born on <strong>January 11, 1999</strong> in <em>Isfahan, Iran</em> 🇮🇷, a beautiful city with rich history and culture. This was the start of my journey and the path that later took me across fields and countries.</p>'
  },
  {
    id: 2,
    year: 2013,
    location: 'Isfahan, Iran',
    date: 'Nov 2013 - Nov 2017',
    title: 'High School Graduation',
    description:
      '<p>I finished high school in <strong>Mathematics and Physics</strong>. These years taught me logical thinking and problem solving, and prepared me for the technical work I do today.</p>'
  },
  {
    id: 3,
    year: 2021,
    location: 'Najafabad, Isfahan, Iran',
    date: 'Nov 2017 - Nov 2021',
    title: 'University Graduation',
    description:
      '<p>I earned a Bachelor’s degree in <strong>Software Engineering</strong> from <strong>Azad University of Najafabad</strong>. I learned how to build real systems, explore new ideas, and work with teams to solve hard problems.</p>',
    items: [
      'Professor’s assistant and top student in Graphic and Database Design courses.',
      'Assisted research for more than two semesters on how hidden elements on a web page affect user behavior, and how small UI changes can improve the experience.'
    ]
  },
  {
    id: 4,
    year: 2019,
    location: 'Isfahan, Iran - Remote',
    date: 'Jan 2019 ( 1 year 2 months )',
    title: 'Freelancer - Software Engineer',
    description:
      '<p>I started my career as a <strong>Freelance Software Engineer</strong>. I worked remotely and owned projects end to end, from gathering requirements to deployment and support.</p>',
    items: [
      'Designed and built scalable REST APIs with Python (Django) and PHP (Laravel) for license management, handled 500 requests per second, kept 99.9% uptime.',
      'Led several products E2E, from defining system needs and partner dependencies to implementation, testing, and setting up metrics, alerts, monitors, and dashboards.'
    ]
  },
  {
    id: 5,
    year: 2019,
    location: 'Isfahan, Iran',
    date: 'Apr 2019 ( 1 year 4 months )',
    title: 'SnappCarFix - Software Engineer',
    url: 'https://www.linkedin.com/company/snapp.ir/',
    description:
      '<p>At <strong>SnappCarFix</strong>, I worked as a frontend engineer and also led the frontend team. I helped the team deliver fast and reliable web platforms and improved the user experience with better performance and reusable parts.</p>',
    items: [
      'Mentored 5+ engineers and managed cross-functional delivery.',
      'Migrated a WordPress platform to a modern JavaScript and React stack, improved user experience by about 90%.',
      'Built a general layout and component library as an installable package, reduced project setup time by 40%.',
      'Implemented high-performance timers for ads and discount banners, reduced page load time by 2 seconds.'
    ]
  },
  {
    id: 6,
    year: 2020,
    location: 'Tehran, Iran',
    date: 'Aug 2020 ( 3 years )',
    title: 'Digikala - Software Engineer',
    url: 'https://www.linkedin.com/company/digikala/',
    description:
      '<p>I joined <strong>Digikala</strong> as a <strong>Senior Frontend Engineer</strong>. I worked on large e-commerce products with millions of visits per day, focused on speed, quality, and flexible features.</p>',
    items: [
      'Rebuilt two e-commerce platforms with JavaScript, React, Next.js, and TypeScript in agile teams using the Spotify Squad model.',
      'Integrated Google Analytics, set up DataLayer, and ran 20+ A/B tests. Used Big-Data Tracker and Google Tag Manager to study user behavior.',
      'Built dynamic landing pages with 30+ reusable modules, cut development time for promo pages.',
      'Wrote unit and E2E tests using Jest, React Testing Library, and Cypress. Used Storybook to improve component reuse.',
      'Worked in a PHP monorepo with Symfony, and used micro frontends with NX. Improved code quality and structure, sped up APIs by 10% and reduced DB load by 20% with caching.',
      'Automated core marketing experiments including A/B, Auto-Targeting, and Multivariate Testing.',
      'Automated UX testing for marketing platforms by integrating Nightwatch Selenium.'
    ]
  },
  {
    id: 7,
    year: 2023,
    date: 'Aug 2023',
    location: 'Malmö, Sweden',
    title: 'Relocation to Sweden',
    description:
      '<p>In <strong>August 2023</strong>, I moved to <strong>Malmö, Sweden</strong> 🇸🇪. This started my international chapter, with new challenges and chances to grow in the global tech scene.</p>'
  },
  {
    id: 8,
    year: 2023,
    date: 'Aug 2023 - April 2025',
    location: 'Malmö, Sweden',
    url: 'https://www.linkedin.com/company/boozt-fashion/',
    title: 'Boozt - Senior Frontend Developer',
    description:
      '<p>At <strong>Boozt</strong>, the largest Nordic online department store, I worked as a <strong>Senior Frontend Developer</strong>. I built tools and features that made content, campaigns, and user experience faster and easier to manage across web and mobile.</p>',
    items: [
      'Worked with CI/CD pipelines, pull requests, code reviews, and unit, integration, and E2E tests.',
      'Built a CMS to create dynamic pages, promotions, and campaign pages for 17 countries, integrated with the mobile app, no app updates needed.',
      'Improved CMS data structure with better algorithms and data structures. Used hash maps to remove redundant loops and reduce extra computation.',
      'Built an internal brand asset system with Google Cloud Functions and Google Storage, cut costs by removing external services.',
      'Created serverless functions on GCP to automate background tasks, reduced operational overhead by 20%.',
      'Migrated and redesigned website features from the legacy platform to React and TypeScript, improved performance.',
      'Refactored state management and component architecture to reduce re-renders, improved load times and overall UX.'
    ]
  },
  {
    id: 9,
    year: 2025,
    date: 'May 2025 - Now',
    location: 'Malmö, Sweden',
    url: 'https://www.linkedin.com/company/sinch/',
    title: 'Sinch - Senior Software Engineer',
    description:
      '<p>At <strong>Sinch</strong>, I work as a <strong>Senior Software Engineer</strong>. I help design the architecture and frontend infrastructure for systems that power global communications. I work across teams to keep things fast, stable, and easy to maintain.</p>',
    items: [
      'Designed and maintained a modular setup with more than 10 micro frontends, with clear contracts and performance goals.',
      'Defined a scalable Nx monorepo structure for multi-team development, with good dependency management and caching.',
      'Implemented dynamic module federation and set up isolated testing across micro frontends, using Cypress and Playwright.',
      'Improved speed with lazy loading, route prefetching, and bundle splitting, better time-to-interactive and Lighthouse scores.',
      'Led frontend build and quality checks, including linting, formatting, coverage rules, and automated pipelines with GitLab and internal tools.',
      'Worked with <strong>Kubernetes</strong> and <strong>Istio</strong> for deployment, traffic control, and observability. Set custom routing rules and fault tolerance strategies.',
      'Contributed to <strong>Spring Boot</strong> microservices in <strong>Kotlin</strong>, used <strong>gRPC</strong> and <strong>Protocol Buffers</strong> for data exchange, helped define service contracts.',
      'Worked closely with product, design, and engineering to deliver scalable, maintainable, user-focused features.'
    ]
  }
];

export const JOURNEY_DATA = {
  title: 'The Journey So Far',
  footer: 'It all started on a cold winter morning in January 1999.',
  description: 'On a path toward <span className="text-2xl font-bold">Google</span>',
  items: JOURNEY_ITEM_DATA
} as const;

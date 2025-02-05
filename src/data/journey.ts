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
      '<p>I was born on <strong>11th January 1999</strong> in the beautiful and historic city of <em>Isfahan, Iran</em> 🇮🇷. This marked the very beginning of my journey, laying the foundation for an exciting and ambitious career path that would take me across industries and countries.</p>'
  },
  {
    id: 2,
    year: 2013,
    location: 'Isfahan, Iran',
    date: 'Nov 2013 - Nov 2017',
    title: 'High School Graduation',
    description:
      '<p>I successfully completed my high school education in <strong>Mathematics and Physics</strong>, a rigorous and analytical field that instilled in me a passion for problem-solving and logical thinking. These years played a key role in preparing me for the technical challenges of my future education and career.</p>'
  },
  {
    id: 3,
    year: 2021,
    location: 'Najafabad, Isfahan, Iran',
    date: 'Nov 2017 - Nov 2021',
    title: 'University Graduation',
    description:
      '<p>After four enriching years at <strong>Azad University of Najafabad</strong>, I graduated with a Bachelor’s degree in <strong>Software Engineering</strong>. During this time, I honed my technical skills, engaged in innovative research projects, and stood out as a top student in several key courses, earning recognition from my professors for my academic excellence and contributions.</p>',
    items: [
      'Professor’s assistant and top student in Graphic and database design courses.',
      'Professor’s assistance and research of more than 2 semesters about the effects of hidden elements on the web page and improving user behavior by changing the UI of the components or elements.'
    ]
  },
  {
    id: 4,
    year: 2019,
    location: 'Isfahan, Iran - Remote',
    date: 'Jan 2019 ( 1 year 2 months )',
    title: 'Freelancer - Software Engineer',
    description:
      '<p>My career officially began as a <strong>Freelance Software Engineer</strong>. Working remotely, I developed full-scale solutions for diverse clients, showcasing my ability to independently handle projects from system requirements gathering to deployment. This experience helped me build a solid foundation in scalable API design and performance optimization.</p>',
    items: [
      'Designed and implemented scalable RESTful APIs using Python (Django) and PHP (Laravel) for managing proprietary licenses, handling peak loads of 500 requests per second and, ensuring 99.9% uptime.',
      'Led the development of several products E2E, from identifying system requirements and partner dependencies to workload balancing, software implementation, engineering, testing, and configuring metrics, alarms, monitors, and dashboards.'
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
      '<p>At <strong>SnappCarFix</strong>, I stepped into a leadership role as a <strong>Frontend Team Lead</strong>. My role involved guiding a team of talented engineers while delivering high-performance web platforms. I spearheaded platform migrations, developed reusable component libraries, and introduced optimizations that significantly enhanced user experience and performance.</p>',
    items: [
      'Team Leadership and Mentorship: Mentored 5+ engineers, enhancing their technical and soft skills while managing cross-functional project delivery.',
      'Platform Migration: Transitioned a WordPress platform to a modern JavaScript and React-based system, achieving a 90% improvement in user experience.',
      'Reusable Components: Developed a general layout and component library as an installable package, reducing project setup time by 40%.',
      'Performance Enhancements: Built high-performance timers for advertisements and discount banners, reducing page load times by 2 seconds.'
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
      '<p>Joining <strong>Digikala</strong> as a <strong>Senior Frontend Engineer</strong> marked a pivotal moment in my career. I contributed to large-scale e-commerce platforms, collaborating within agile teams to deliver high-impact features and improvements. My work on analytics, dynamic landing pages, and system optimization helped redefine the digital shopping experience for millions of users.</p>',
    items: [
      'E-commerce Platform Development: Rebuilt two e-commerce platforms with JavaScript, ReactJS, Next.js, and TypeScript in agile teams using the Spotify Squad Framework.',
      'Data and Analytics Integration: Implemented Google Analytics services, including DataLayer and over 20 A/B tests. Leveraged tools like Big-Data Tracker and Google Tag Manager to collect and analyze user behavior.',
      'Dynamic Landing Pages: Designed and implemented dynamic landing pages with over 30 reusable modules, reducing development time for promotional pages.',
      'Testing and QA: Wrote unit and E2E tests using Jest, React Testing Library, and Cypress, ensuring high-quality code. Utilized Storybook to streamline component reuse.',
      'Monorepository Expertise: Worked on a PHP monorepository using the Symfony framework, while integrating micro-frontend architecture with NX, enhancing code quality and structure adherence by 80%. Also developed and maintained backend services, improving API response times by 10% and reducing database query load by 20% through efficient caching strategies.',
      'Automated and optimized business logic for the core marketing experiments, including A/B, Auto-Targeting, and Multivariate Testing.',
      "Completely automated the marketing platforms' user-experience testing process by integrating Nightwatch Selenium."
    ]
  },
  {
    id: 7,
    year: 2023,
    date: 'Aug 2023',
    location: 'Malmö, Sweden',
    title: 'Relocation to Sweden',
    description:
      '<p>In August 2023, I made the exciting decision to relocate to <strong>Malmö, Sweden</strong> 🇸🇪. This marked the beginning of an international chapter in my career, where I embraced new challenges and opportunities in the global tech industry.</p>'
  },
  {
    id: 8,
    year: 2023,
    date: 'Aug 2023 - Now',
    location: 'Malmö, Sweden',
    url: 'https://www.linkedin.com/company/boozt-fashion/',
    title: 'Boozt - Software Engineer',
    description:
      '<p>As a <strong>Senior Frontend Developer</strong> at <strong>Boozt</strong>, I am driving innovation in e-commerce solutions. My work includes building CMS platforms for multiple countries, optimizing system performance, and leading projects to improve the overall user experience across web and mobile platforms.</p>',
    items: [
      'Continuous Integration/Deployment Pipeline Integration, pull requests, code reviews, unit/integration/e2e testing',
      'Developed and Optimized CMS: Built a CMS for generating dynamic web pages, promotions, and campaign pages for 17 countries, enabling seamless integration with the mobile app and eliminating the need for updates by supporting all web elements.',
      'Enhanced Data Efficiency: Optimized CMS data structure using efficient algorithms and data structures to improve speed, updates, and storage. Eliminated redundant loops by implementing hash maps, reducing unnecessary computation',
      'Brand Asset Management: Designed an internal system with Google Cloud Functions and Google Storage to store brand assets and logos, reducing costs by eliminating external services.',
      'Google Cloud Project (GCP): Developed serverless functions using GCP Cloud Functions to automate background tasks, reducing operational overhead by 20%.',
      'React and TypeScript Migration: Migrated and redesigned website features from the legacy platform, adapting them to meet evolving business requirements while improving performance.',
      'Performance Optimization: Refactored state management and component architecture to minimize unnecessary re-renders, achieving faster load times and smoother user experience.'
    ]
  }
];

export const JOURNEY_DATA = {
  title: 'The Adventure Started ...',
  footer: 'Everything began on a cold winter morning, just eleven days into the year 1999.',
  description:
    'On a journey to <span className="text-2xl font-bold">Google</span>, driven by curiosity and a desire to learn more.',
  items: JOURNEY_ITEM_DATA
} as const;

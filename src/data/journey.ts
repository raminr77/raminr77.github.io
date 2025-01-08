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

export const JOURNEY_DATA: JourneyItem[] = [
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
      'Recognized as a top student in Graphic and Database Design courses, assisting professors in practical sessions.',
      'Conducted in-depth research on UI optimization and its effects on user behavior, publishing findings after two semesters of work.'
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
      'Designed and implemented scalable RESTful APIs with Python (Django) and PHP (Laravel), ensuring high performance under heavy loads.',
      'Led end-to-end product development, balancing technical implementation with client collaboration and effective workload management.'
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
      'Transitioned a legacy WordPress platform to a React-based modern architecture, improving UX by 90%.',
      'Created reusable component libraries, reducing future development efforts by 40%.',
      'Mentored junior developers, fostering both technical and professional growth within the team.'
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
      'Rebuilt e-commerce platforms using ReactJS, Next.js, and TypeScript, enhancing scalability and maintainability.',
      'Designed dynamic landing pages with 30+ reusable modules, significantly reducing development time.',
      'Streamlined QA processes with automated E2E testing and integrated analytics tools to drive data-driven decisions.'
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
      'Designed and optimized a CMS for 17 countries, ensuring seamless web-to-mobile integration.',
      'Implemented GCP-based serverless solutions, reducing operational costs by 20%.',
      'Refactored application architecture to minimize load times and boost performance.'
    ]
  }
];

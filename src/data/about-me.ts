export const ABOUT_ME_CONTENT_TYPE = {
  text: 'text',
  list: 'list',
  image: 'image',
  component: 'component'
} as const;

export const ABOUT_ME_COMPONENT_NAMES = {
  recommendations: 'recommendations',
  competition: 'competition'
} as const;

type AboutMeImageContent = {
  url: string;
  type: 'image';
  title: string;
  width: number;
  height: number;
  tooltip?: string;
  className?: string;
};

type AboutMeListContent = {
  title: string;
  data: string[];
  type: 'list';
};

type AboutMeTextContent = {
  data: string;
  type: 'text';
};

type ABOUT_ME_COMPONENT_NAMES_KEYS = keyof typeof ABOUT_ME_COMPONENT_NAMES;
type AboutMeComponentContent = {
  name: (typeof ABOUT_ME_COMPONENT_NAMES)[ABOUT_ME_COMPONENT_NAMES_KEYS];
  type: 'component';
};

export type AboutMeContentItem =
  | AboutMeTextContent
  | AboutMeListContent
  | AboutMeImageContent
  | AboutMeComponentContent;

export const ABOUT_ME_DATA: {
  heroURL: string;
  content: AboutMeContentItem[];
} = {
  heroURL: '/images/personal-images/01.png',
  content: [
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "Hi, I’m <strong>Ramin Rezaei</strong>. I’m a <strong>Software Engineer</strong> with over seven years of experience in building and improving web apps and systems. I live in <strong>Malmö, Sweden</strong>, and work as a <strong>Senior Software Engineer</strong> at <a href='https://www.sinch.com' target='_blank'>Sinch AB</a>, a global company in <strong>cloud communications</strong> that powers billions of conversations every day."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'My career has been full of challenges, learning, and growth. I work mostly with <strong>frontend technologies</strong> like <strong>JavaScript</strong>, <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Next.js</strong>, and I’ve also built many <strong>backend systems</strong> using <strong>Kotlin (Spring Boot)</strong>, <strong>Python (Django)</strong>, <strong>Node.js (NestJS)</strong>, and <strong>PHP (Laravel)</strong>. I enjoy working in <strong>agile teams</strong> and building systems that are fast, stable, and easy to maintain.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.list,
      title: 'At Sinch, I work on:',
      data: [
        'Defining structure and architecture for over 10 <strong>micro frontends</strong> using <strong>Nx monorepos</strong> and <strong>Module Federation</strong>.',
        'Making sure everything works smoothly with good performance and strong testing using <strong>Cypress</strong> and <strong>Playwright</strong>.',
        'Building and maintaining full-stack systems with <strong>Kotlin</strong>, <strong>Spring Boot</strong>, <strong>gRPC</strong>, and <strong>Protocol Buffers</strong>.',
        'Managing deployment, routing, and observability with <strong>Kubernetes</strong> and <strong>Istio Service Mesh</strong>.'
      ]
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.list,
      title: 'At Boozt, I worked on projects like:',
      data: [
        'Building a strong <strong>content management system (CMS)</strong> for creating web pages, connecting with the mobile app, and improving daily workflows.',
        'Making the system faster by using better algorithms and data structures to reduce computation and storage needs.',
        'Leading <strong>React and TypeScript migrations</strong> to modernize legacy systems and make them more scalable.'
      ]
    },
    {
      width: 1200,
      height: 500,
      className: 'w-full rounded',
      type: ABOUT_ME_CONTENT_TYPE.image,
      url: '/images/personal-images/boozt.jpg',
      tooltip: 'Last Day in Boozt Company - 2025',
      title: 'Ramin Rezaei - Last week in Boozt Company - Senior Software Engineer'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.component,
      name: ABOUT_ME_COMPONENT_NAMES.recommendations
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "Before that, I spent three great years at <a href='https://www.linkedin.com/company/digikala/' target='_blank' rel='noopener noreferrer'>Digikala</a>. I helped rebuild e-commerce platforms, designed reusable components, added analytics tools, and improved marketing platforms through <strong>A/B testing</strong> and <strong>automation</strong>."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "At <a href='https://www.linkedin.com/company/snapp.ir/' target='_blank' rel='noopener noreferrer'>Snapp!</a>, I led the frontend team. We migrated from WordPress to modern frameworks, built reusable libraries, and improved the user experience across the platform."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'I really enjoy <strong>mentoring and teamwork</strong>. I’ve supported junior developers, helped with bootcamps, and shared my experience with others. I believe great teams are built on learning, collaboration, and openness.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'Outside of work, I like exploring new technologies such as <strong>machine learning</strong>. I also earned a certificate in <strong>Machine Learning in JavaScript with TensorFlow.js</strong>.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'In <strong>2024</strong>, I proudly won <strong>1st place</strong> in the <strong>Code in the Dark</strong> competition hosted by <strong>Mpya Digital</strong> in Malmö. It was a live front-end challenge with no preview, just pure coding under pressure. It was fun, intense, and rewarding.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.component,
      name: ABOUT_ME_COMPONENT_NAMES.competition
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'I approach every project with curiosity and care. Whether it’s building APIs, improving performance, or creating friendly user interfaces, my goal is to write code that works well and makes a real difference.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'When I’m not coding, I enjoy life in Malmö, exploring the city, working on personal projects, or talking with other developers about new ideas.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: '<strong>Let’s build</strong> software that not only works but also inspires and helps people everywhere.'
    }
  ]
} as const;

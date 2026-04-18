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
      data: "Hi, I’m <strong>Ramin Rezaei</strong>. I’m a <strong>Software Engineer</strong> with over <strong>7 years</strong> of experience building and scaling web applications and systems. I’m currently based in <strong>Malmö, Sweden</strong>, working as a <strong>Senior Software Engineer</strong> at <a href='https://www.sinch.com' target='_blank'><strong>Sinch AB</strong></a>, a global company in <strong>cloud communications</strong> powering billions of conversations every day."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'My journey has been shaped by constant challenges, learning, and growth. I mainly work with <strong>frontend technologies</strong> such as <strong>JavaScript</strong>, <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Next.js</strong>, but I’ve also built and maintained <strong>backend systems</strong> using <strong>Kotlin (Spring Boot)</strong>, <strong>Python (Django)</strong>, <strong>Node.js (NestJS)</strong>, and <strong>PHP (Laravel)</strong>. I enjoy working in <strong>agile teams</strong> and building systems that are fast, reliable, and easy to evolve over time.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.list,
      title: 'At Sinch, I work on:',
      data: [
        'Designing and shaping the architecture for 10+ <strong>micro frontends</strong> using <strong>Nx monorepos</strong> and <strong>Module Federation</strong>.',
        'Ensuring strong performance, reliability, and test coverage with tools like <strong>Cypress</strong> and <strong>Playwright</strong>.',
        'Building and maintaining full-stack systems with <strong>Kotlin</strong>, <strong>Spring Boot</strong>, <strong>gRPC</strong>, and <strong>Protocol Buffers</strong>.',
        'Managing deployments, traffic routing, and observability using <strong>Kubernetes</strong> and <strong>Istio Service Mesh</strong>.'
      ]
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.list,
      title: 'At Boozt, I worked on projects like:',
      data: [
        'Building a scalable <strong>content management system (CMS)</strong> for creating dynamic pages, connecting seamlessly with the mobile app, and improving daily workflows.',
        'Improving performance by optimizing data structures and reducing unnecessary computations and storage overhead.',
        'Leading <strong>React and TypeScript migrations</strong> to modernize legacy systems and make them more maintainable and scalable.'
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
      data: "Before that, I spent three valuable years at <a href='https://www.linkedin.com/company/digikala/' target='_blank' rel='noopener noreferrer'>Digikala</a>. There, I helped rebuild large-scale e-commerce platforms, designed reusable component systems, integrated analytics tools, and improved marketing platforms through <strong>A/B testing</strong> and automation."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "Earlier in my career at <a href='https://www.linkedin.com/company/snapp.ir/' target='_blank' rel='noopener noreferrer'>Snapp!</a>, I led the frontend team. We migrated from WordPress to modern frameworks, built reusable libraries, and significantly improved the overall user experience."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'I genuinely enjoy <strong>mentoring and working with others</strong>. I’ve supported junior developers, contributed to bootcamps, and shared my experience along the way. I believe strong teams are built through collaboration, trust, and continuous learning.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'Outside of work, I like exploring new areas such as <strong>machine learning</strong>. I’ve also completed a certificate in <strong>Machine Learning in JavaScript with TensorFlow.js</strong>, and I enjoy experimenting with AI-driven ideas in my personal projects.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'In <strong>2024</strong>, I won <strong>1st place</strong> in the <strong>Code in the Dark</strong> competition hosted by <strong>Mpya Digital</strong> in Malmö. It’s a live front-end challenge with no preview, just pure coding under pressure. It was intense, challenging, and a really fun experience.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.component,
      name: ABOUT_ME_COMPONENT_NAMES.competition
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'I approach every project with curiosity and attention to detail. Whether it’s building APIs, improving performance, or crafting user interfaces, my goal is always to create solutions that are clean, reliable, and meaningful.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'When I’m not coding, I enjoy life in Malmö, exploring the city, working on side projects, or exchanging ideas with other developers.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: '<strong>Let’s build</strong> software that not only works well, but also inspires and makes a real impact.'
    }
  ]
} as const;

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
      data: "Hi, I’m <strong>Ramin Rezaei</strong>, a dedicated and ambitious <strong>Software Engineer</strong> with over seven years of professional experience in designing, developing, and optimizing web applications and systems. Currently, I’m based in <strong>Malmö, Sweden</strong>, where I work as a <strong>Senior Software Engineer</strong> at <a href='https://www.sinch.com' target='_blank'>Sinch AB</a>, a global leader in <strong>cloud communications</strong> and <strong>CPaaS</strong> powering billions of conversations around the world."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'My professional journey has been a blend of technical challenges, impactful projects, and continuous learning. I specialize in <strong>frontend technologies</strong> such as <strong>JavaScript</strong>, <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Next.js</strong>, and I’ve also worked extensively on <strong>backend systems</strong> using <strong>Kotlin (Spring Boot)</strong>, <strong>Python (Django)</strong>, <strong>Node.js (NestJS)</strong>, and <strong>PHP (Laravel)</strong>. I thrive in <strong>agile environments</strong> and love working on scalable, reliable, and maintainable systems.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.list,
      title: 'At Sinch, I’m involved in:',
      data: [
        'Defining architecture and project structure for over 10 active <strong>micro frontends</strong> using <strong>NX monorepos</strong>, <strong>Module Federation</strong>, and scalable workspace setups.',
        'Ensuring smooth integration, performance optimization, and E2E test strategies using <strong>Cypress</strong> and <strong>Playwright</strong> across distributed applications.',
        'Collaborating on full-stack systems using <strong>Kotlin</strong>, <strong>Spring Boot</strong>, <strong>gRPC</strong>, and <strong>Protocol Buffers</strong> to build reliable APIs and services.',
        'Working with <strong>Kubernetes</strong> and <strong>Istio Service Mesh</strong> to manage deployments, traffic routing, and observability in a complex microservices environment.'
      ]
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.list,
      title: 'At Boozt, I have been instrumental in projects like:',
      data: [
        'Building a robust <strong>content management system (CMS)</strong> that enables dynamic web pages, seamless mobile app integration, and improved operational efficiency.',
        'Optimizing system performance by implementing advanced data structures and algorithms to improve speed, reduce computation, and enhance data storage.',
        'Leading <strong>React and TypeScript migrations</strong>, ensuring legacy systems evolve to meet modern business needs with a focus on scalability and maintainability.'
      ]
    },
    {
      width: 1200,
      height: 500,
      className: 'w-full rounded',
      type: ABOUT_ME_CONTENT_TYPE.image,
      url: '/images/personal-images/boozt.jpg',
      tooltip: 'Last Day in Boozt Company - 2025',
      title: 'Ramin Rezaei - Last week in Boozt Company - Senior Software Engineer',
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.component,
      name: ABOUT_ME_COMPONENT_NAMES.recommendations
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "Prior to this, I spent three impactful years at <Link href='https://www.linkedin.com/company/digikala/' target='_blank'>Digikala</Link>, where I contributed to rebuilding their e-commerce platforms, designing reusable components, implementing analytics services, and optimizing marketing platforms through <strong>A/B testing</strong> and <strong>automated testing pipelines</strong>."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "At <Link href='https://www.linkedin.com/company/snapp.ir/' target='_blank'>Snapp!</Link>, I led a frontend team, spearheading projects like migrating systems from WordPress to modern frameworks, creating reusable component libraries, and dramatically improving user experiences."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'Beyond my technical contributions, I’ve always been passionate about <strong>mentorship and leadership</strong>. I’ve guided junior engineers, conducted coding bootcamps, and actively shared my knowledge with aspiring developers. I believe in fostering a culture of collaboration, learning, and innovation within every team I work with.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'Outside of work, I actively explore emerging technologies, including <strong>machine learning</strong>, and recently completed a certification in <strong>Machine Learning in JavaScript with TensorFlow.js</strong>.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'In <strong>2024</strong>, I proudly took <strong>1st place</strong> in the <strong>Code in the Dark</strong> competition hosted by <strong>Mpya Digital</strong> in Malmö — a fast-paced front-end challenge with no previews, just raw coding under pressure. It was an unforgettable and rewarding experience that reflects my commitment to precision, creativity, and performance under pressure.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.component,
      name: ABOUT_ME_COMPONENT_NAMES.competition
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'I approach every project with curiosity and a drive to solve problems through elegant and efficient code. Whether it’s developing scalable APIs, optimizing complex systems, or creating user-friendly interfaces, I aim to deliver software that makes an impact.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'When I’m not coding, I enjoy exploring the vibrant culture of Malmö, experimenting with personal projects, or connecting with other professionals to exchange ideas and insights.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: '<strong>Let’s collaborate</strong> to create software that not only meets technical demands but also inspires and empowers users around the globe.'
    }
  ]
} as const;

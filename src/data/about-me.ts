export const ABOUT_ME_CONTENT_TYPE = {
  text: 'text',
  list: 'list',
  image: 'image'
} as const;

type AboutMeImageContent = {
  url: string;
  type: 'image';
  title: string;
  width: number;
  height: number;
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

export type AboutMeContentItem =
  | AboutMeTextContent
  | AboutMeListContent
  | AboutMeImageContent;

export const ABOUT_ME_DATA: {
  heroURL: string;
  content: AboutMeContentItem[];
} = {
  heroURL: '/images/personal-images/01.png',
  content: [
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "Hi, I’m <strong>Ramin Rezaei</strong>, a dedicated and ambitious <strong>Software Engineer</strong> with over six years of professional experience in designing, developing, and optimizing web applications and systems. Currently, I’m based in <strong>Malmö, Sweden</strong>, where I work as a <strong>Senior Software Engineer</strong> at <a href='https://www.sinch.com' target='_blank'>Sinch AB</a>, a Swedish company specializing in cloud-based communications services, commonly referred to as Communications Platform as a Service (CPaaS)."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'My professional journey has been a blend of technical challenges, impactful projects, and continuous learning. I specialize in <strong>frontend technologies</strong> such as <strong>JavaScript</strong>,<strong>React</strong>, <strong>TypeScript</strong>, and <strong>Next.js</strong>, but my expertise extends across the software development stack, with hands-on experience in <strong>backend systems</strong> built on <strong>Python (Django)</strong>, <strong>Js/Ts (NestJs)</strong>, <strong>Java (Kotlin)</strong> and <strong>PHP (Laravel)</strong>. I thrive in <strong>agile environments</strong>, working with cross-functional teams to deliver scalable, efficient, and user-centric solutions.'
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
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: "Prior to this, I spent three impactful years at<Link href='https://www.linkedin.com/company/digikala/' target='_blank'>Digikala</Link>, where I contributed to rebuilding their e-commerce platforms, designing reusable components, implementing analytics services, and optimizing marketing platforms through <strong>A/B testing</strong> and <strong>automated testing pipelines</strong>. At <Link href='https://www.linkedin.com/company/snapp.ir/' target='_blank'>Snapp!</Link>, I led a frontend team, spearheading projects like migrating systems from WordPress to modern frameworks, creating reusable component libraries, and dramatically improving user experiences."
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'Beyond my technical contributions, I’ve always been passionate about <strong>mentorship and leadership</strong>. I’ve guided junior engineers, conducted coding bootcamps, and actively shared my knowledge with aspiring developers. I believe in fostering a culture of collaboration, learning, and innovation within every team I work with.'
    },
    {
      type: ABOUT_ME_CONTENT_TYPE.text,
      data: 'Outside of work, I actively explore emerging technologies, including <strong>machine learning</strong>, and recently completed a certification in <strong>Machine Learning in JavaScript with TensorFlow.js</strong>. My dedication to the craft has been recognized with achievements like winning <strong>1st place in the Code in the Dark competition</strong>—a testament to my ability to innovate and excel under high-pressure conditions.'
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

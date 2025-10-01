import { ROUTES } from '@/shared/constants';

export interface RecommendationItem {
  id: number;
  url: string;
  text: string;
  date: string;
  title: string;
  caption: string;
  fullName: string;
  imageURL: string | null;
}

export const RECOMMENDATION_PAGE_DATA = {
  title: 'Recommendations',
  description:
    'I have had the pleasure of working with many talented individuals throughout my career. <br /> Here are some of the recommendations I have received from my colleagues and managers. <br /> You can also find more Recommendations on my LinkedIn profile.',
  aboutMeDescription:
    'I have had the pleasure of working with many talented individuals throughout my career. <br /> Here are some of the recommendations I have received from them.',
  footer: 'If you would like to know more about me, feel free to reach out.',
  footerActionLabel: 'Contact Me',
  footerActionURL: ROUTES.CONTACT_ME
} as const;

export const RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 18,
    fullName: 'Hamed Kabiri',
    title: 'Senior Front-End Engineer',
    text: 'I had the pleasure of working with Ramin for around two years, first as a teammate and later as his manager. From the start, he demonstrated a strong eagerness to learn new technologies and consistently took on challenging tasks, delivering them on time with great quality. Ramin stood out as a bold and influential member of the team, actively contributing to technical initiatives and bringing fresh ideas to the table. Over time, he showed remarkable growth, improving both his technical expertise and soft skills by embracing feedback and acting on it thoughtfully. A truly valuable team player.',
    date: 'October 1, 2025',
    caption: 'Hamed managed Ramin directly',
    url: 'https://www.linkedin.com/in/hamed-kabiri-774997133/',
    imageURL: '/images/linkedIn-profiles/hamed-kabiri.jpeg'
  },
  {
    id: 17,
    fullName: 'Lukas Tutkus',
    title: 'Team lead at Boozt Technology Baltics',
    text: "I've worked with Ramin a year together in Boozt <br /> He did a lot of great work and is great addition to our chapter as a motivated and keen to help developer. <br /> He build a lot of great improvements in our internal system which other developers could reuse and always thinks of a way to improve something. He also does carefully review our codebase and gives great insights to other devs as well. <br /> I would recommend Ramin to everyone who might be needing a senior FE with great motivation and quick learning.",
    date: 'March 6, 2025',
    caption: 'Lukas worked with Ramin on the same team',
    url: 'https://www.linkedin.com/in/lukas-tutkus-08657815b/',
    imageURL: '/images/linkedIn-profiles/lukas-tutkus.jpeg'
  },
  {
    id: 16,
    fullName: 'Matīss Cikota',
    title: 'Senior Frontend Developer at Boozt',
    text: "We've been working for few years together and it's been great. <br /> Ramin is one of those people who just gets stuff done. He never shies away from hard work and always gives 100% to whatever he's working on. I've seen him tackle some pretty challenging projects and stick with them until they're done right. Other thing that is great about him is that he always shows interest in his work by asking questions and participating in conversations on architecture and coding choices. <br /> Ramin would be a great addition to any team. And always feel free to reach out to me if you have some more questions about him.",
    date: 'March 2, 2025',
    caption: 'Matīss worked with Ramin on the same team',
    url: 'https://www.linkedin.com/in/matisscikota/',
    imageURL: '/images/linkedIn-profiles/matisscikota.jpeg'
  },
  {
    id: 15,
    fullName: 'Igor Karanović',
    title: 'Team Lead | Senior Back-End Developer at Boozt',
    text: "I had the pleasure of working closely with Ramin on our recent CMS project. He was an invaluable asset to our team. Ramin's quick learning curve, coupled with his dedication, made him a standout. His ability to grasp complex concepts and implement them efficiently was truly impressive. We successfully launched our Headless CMS within a year, with Ramin having an important role in the process. Without a doubt, Ramin is a talented and motivated individual who would be an asset to any team. I highly recommend him.",
    date: 'February 7, 2025',
    caption: 'Igor managed Ramin directly',
    url: 'https://www.linkedin.com/in/igorkaranovic/',
    imageURL: '/images/linkedIn-profiles/Igor.jpg'
  },
  {
    id: 14,
    fullName: 'Dimitar Pashovski',
    title: 'Senior frontend developer at Boozt',
    text: 'Ramin is a talented frontend developer with strong React skills and a great work ethic. He consistently delivers high-quality work and is always willing to collaborate and share his knowledge. His problem-solving skills and attention to detail make him a valuable asset to any team. I highly recommend him!',
    date: 'February 7, 2025',
    caption: 'Dimitar worked with Ramin in the same team',
    url: 'https://www.linkedin.com/in/pashata',
    imageURL: '/images/linkedIn-profiles/Dimitar.jpg'
  },
  {
    id: 13,
    fullName: 'Erfan Khavarian',
    title: 'Team Lead | Senior Back-End Developer at Boozt',
    text: 'I had the pleasure of working with Ramin on a project where he joined our team for a short period. As a frontend developer, he quickly adapted to our workflow and played a key role in ensuring we delivered the project on time. Ramin is hardworking, fast, and highly knowledgeable. He’s always eager to learn new things and never backs down from a challenge. His ability to grasp new concepts and apply them effectively makes him a great asset to any development team.',
    date: 'February 1, 2025',
    caption: 'Erfan managed Ramin directly',
    url: 'https://www.linkedin.com/in/erfunkh',
    imageURL: '/images/linkedIn-profiles/Erfan.jpg'
  },
  {
    id: 12,
    fullName: 'Emil Azizov',
    title: 'Backend Developer',
    text: "I worked with Ramin in the same team for more than 1 year on both the CMS and Promobar projects.  Ramin is a creative and reliable team player who always brings fresh ideas to the table. He's not afraid to tackle complex problems and always finds practical solutions.  You can trust Ramin to deliver high-quality work on time. Plus, he's always eager to learn new things and pays close attention to details like performance optimization. I'm really happy I got to work with him.",
    date: 'January 23, 2025',
    caption: 'Emil worked with Ramin on the same team',
    url: 'https://www.linkedin.com/in/emil-azizov',
    imageURL: '/images/linkedIn-profiles/Emil.jpg'
  },
  {
    id: 11,
    fullName: 'Andra Norvaiša',
    title: 'Product Owner at DFDS',
    text: 'I had the pleasure of working with Ramin for a year, and he is a talented developer. Ramin brought creativity, a proactive mindset, and a collaborative approach to our projects, making him a valued team member.',
    date: 'November 21, 2024',
    caption: 'Andra worked with Ramin on the same team',
    url: 'https://www.linkedin.com/in/andra-norvaisa',
    imageURL: '/images/linkedIn-profiles/Andra.jpg'
  },
  {
    id: 10,
    fullName: 'Kaveh Alipour',
    title: 'Mobile Engineer',
    text: "I absolutely recommend Ramin! His friendly and responsible approach and fantastic expertise made working together a total joy. Each project became a blast thanks to his positive vibes. Ramin's collaborative spirit and knowledge make him an invaluable asset to any team.",
    date: 'January 21, 2024',
    caption: 'Kaveh managed Ramin directly',
    url: 'https://www.linkedin.com/in/kaveh-alipour-890aa7216',
    imageURL: '/images/linkedIn-profiles/Kaveh.jpg'
  },
  {
    id: 9,
    fullName: 'Arash Saadatmand',
    title: 'Product Manager',
    text: "In the engineering world, I have learned, that finding someone you can rely on is precious. Knowing that projects won't be let down and there is someone you can call out to when needed, with high standards and high-quality work, is something that no one is willing to lose. I have, and am enjoying working with Ramin and hope it will last.",
    date: 'July 23, 2022',
    caption: 'July 23, 2022, Arash worked with Ramin but on different teams',
    url: 'https://www.linkedin.com/in/arash-saadatmand',
    imageURL: '/images/linkedIn-profiles/Arash.jpg'
  },
  {
    id: 8,
    fullName: 'Sana Mohammadzadeh',
    title: 'Product Manager at Exploria | Former Digikala PM',
    text: 'When it comes to work, Ramin is someone you can rely on.  He will always be available to help you and answer any question or concern you may have with good manners. He is passionate about his job, and he keeps all deadlines on time. It is a pleasure to work with Ramin.',
    date: 'July 25, 2022',
    caption: 'July 25, 2022, Sana worked with Ramin but on different teams',
    url: 'https://www.linkedin.com/in/sana-mohammadzadeh',
    imageURL: '/images/linkedIn-profiles/Sana.jpg'
  },
  {
    id: 7,
    fullName: 'Ross Amiri',
    title: 'Software Engineer | Team-lead at TrustYou',
    text: "Let's add some great features to the world! just make a couple more of Ramins, and the job is already done! Passionate, responsible and always trying his best to give the best solutions to the problems. Self-learner and strongly motivated on anything related to computers. A lovely must-have friend.",
    date: 'January 16, 2022',
    caption: 'January 16, 2022, Ross managed Ramin directly',
    url: 'https://www.linkedin.com/in/aasmpro',
    imageURL: '/images/linkedIn-profiles/Ross.jpg'
  },
  {
    id: 6,
    fullName: 'Hadi Omidi',
    title: 'Software Engineer | Game Theory Enthusiast',
    text: "I don't want to compliment Ramin because everyone knows his excellent skills. One of Ramin's most important features is his fixation on his company and his work. His contributions were precious to the community. Furthermore, his work ethic is flawless, and it is so easy to work together. He goes out of his way when you ask for some help and guidance. I highly recommend Ramin and would love to work together again.",
    date: 'April 25, 2022',
    caption: 'April 25, 2022, Hadi worked with Ramin but on different teams',
    url: 'https://www.linkedin.com/in/hadi-omidi',
    imageURL: '/images/linkedIn-profiles/Hadi.jpg'
  },
  {
    id: 5,
    fullName: 'Sepideh Gheisar',
    title: 'Senior Product Manager',
    text: 'I have worked with many professionals throughout my work, but Ramin was a unique one on them. His ability to go out of his way to help others has made him stand out. I can say that Ramin has two very prominent characteristics and that speed of action in finding useful solutions and having a very good work ethic that makes each member of the product team want to work with Ramin. His expertise as a developer is considerable, and it helped our team come up with more efficient solutions on different projects. In addition his contribution is valuable to the side.',
    date: 'October 16, 2021',
    caption: 'October 16, 2021, Sepideh worked with Ramin on the same team',
    url: 'https://www.linkedin.com/in/sgheysar',
    imageURL: '/images/linkedIn-profiles/Sepideh.jpg'
  },
  {
    id: 4,
    fullName: 'Faezeh Padidar',
    title: 'Quality Assurance Engineer',
    text: 'I had have the pleasure of working with Ramin for more than two years at Digikla company. Ramin is one of the best programmers I know. He is productive person with vast knowledge in coding. Ramin is proactive self-motivated and intelligence person. He is a well- connected professional that always takes to time support anyone in his team. Ramin would be a true asset for any position.',
    date: 'August 13, 2022',
    caption: 'August 13, 2022, faezeh worked with Ramin but on different teams',
    url: 'https://www.linkedin.com/in/faezeh-padidar-45470893',
    imageURL: '/images/linkedIn-profiles/Faezeh.jpg'
  },
  {
    id: 3,
    fullName: 'Alireza Khosravian',
    title: 'Software Engineer at textkernel',
    text: 'There is no better colleague than Ramin. He is one of the most dedicated professionals I’ve worked with and is willing to put that extra help whenever you need it. His expertise as a front-end developer is considerable. He knows how to work with TAGS like a God when decides to create. I highly recommend Ramin and would love to work with him again. :D',
    date: 'August 13, 2021',
    caption: 'August 13, 2021, Alireza managed Ramin directly',
    url: 'https://www.linkedin.com/in/alirezakhosravian',
    imageURL: '/images/linkedIn-profiles/Alireza-khosravian.jpg'
  },
  {
    id: 2,
    fullName: 'Amirreza Balouchi',
    title: 'Experienced Software Engineer | Machine Learning Enthusiast',
    text: 'He does what he says and his work is always top-notch. Hardworking, intelligent, and helpful, he has come a long way and is sure to achieve greater heights.',
    date: 'May 11, 2021',
    caption: 'May 11, 2021, Amirreza managed Ramin directly',
    url: 'https://www.linkedin.com/in/amirblc',
    imageURL: '/images/linkedIn-profiles/Amirreza.jpg'
  },
  {
    id: 1,
    fullName: 'Alireza Khalili',
    title: 'Senior DevOps Engineer at CHECK24 GmbH',
    text: 'A great programmer who is highly skilled, great team player, motivated and funny guy. it was a pleasure working with him.',
    date: 'October 10, 2020',
    caption: 'October 10, 2020, Alireza worked with Ramin but on different teams',
    url: 'https://www.linkedin.com/in/alirezarpi',
    imageURL: '/images/linkedIn-profiles/Alireza-khalili.jpg'
  }
];

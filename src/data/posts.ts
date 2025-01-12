export interface Post {
  id: number;
  text: string;
  title: string;
  tags: string[];
  summary: string;
  created: string;
}

export const POSTS_DATA: Post[] = [
  {
    id: 1,
    created: '11 Jun 2025',
    title: 'Start a new adventure',
    tags: ['welcome', 'hello world'],
    summary:
      'On my birthday, I decided to embark on a new adventure by completely refactoring and redesigning my personal webpage. Using the latest features of Next.js 15, I focused on creating a more modern, efficient, and visually appealing platform to showcase my skills and experiences. This project not only marked a fresh start for my online presence but also gave me the opportunity to dive deeper into the capabilities of this powerful framework.',
    text: `
    <p>The process began with assessing my old website, which no longer reflected my current level of expertise or aesthetic preferences. I wanted a design that felt professional, clean, and aligned with modern web development standards. By leveraging Next.js 15, I explored features like server-side rendering, dynamic routing, and performance optimizations, ensuring my site was both fast and functional.</p>
    <p>Additionally, I took this opportunity to rethink the content structure of my website. I redesigned sections to better highlight my projects, professional journey, and certifications, making it easier for visitors to understand my background at a glance. Implementing responsive design principles ensured that my site looked great on every device, from desktops to smartphones.</p>
    <p>This entire experience was not just a technical project but also a personal challenge. It reminded me of how much I enjoy creating something from the ground up and refining it until it feels just right. By the end of the process, I felt proud of what I had achieved—a refreshed online presence that truly represents who I am as a developer and a creative individual.</p>
    `
  }
];

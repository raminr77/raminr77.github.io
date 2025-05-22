export const ROUTES = {
  HOME: '/',
  POSTS: '/posts/',
  JOURNEY: '/journey/',
  PROJECTS: '/projects/',
  ABOUT_ME: '/about-me/',
  CONTACT_ME: '/contact-me/',
  RECOMMENDATIONS: '/recommendations/',
} as const;

export const MENU_ITEM_ROUTES = [
  { id: 1, title: 'Home', url: ROUTES.HOME },
  { id: 2, title: 'Posts', url: ROUTES.POSTS },
  { id: 3, title: 'Journey', url: ROUTES.JOURNEY },
  { id: 4, title: 'Projects', url: ROUTES.PROJECTS },
  { id: 5, title: 'About Me', url: ROUTES.ABOUT_ME },
  { id: 6, title: 'Contact Me', url: ROUTES.CONTACT_ME }
] as const;

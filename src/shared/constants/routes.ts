export const ROUTES = {
  HOME: '/',
  POSTS: '/posts/',
  GALLERY: '/gallery/',
  JOURNEY: '/journey/',
  PROJECTS: '/projects/',
  ABOUT_ME: '/about-me/',
  CONTACT_ME: '/contact-me/',
  RECOMMENDATIONS: '/recommendations/'
} as const;

export const MENU_ITEM_ROUTES = [
  { id: 1, title: 'Home', url: ROUTES.HOME },
  { id: 2, title: 'Posts', url: ROUTES.POSTS },
  { id: 3, title: 'Gallery', url: ROUTES.GALLERY },
  { id: 4, title: 'Journey', url: ROUTES.JOURNEY },
  { id: 5, title: 'Projects', url: ROUTES.PROJECTS },
  { id: 6, title: 'About Me', url: ROUTES.ABOUT_ME },
  { id: 7, title: 'Contact Me', url: ROUTES.CONTACT_ME }
] as const;

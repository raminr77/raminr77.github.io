import type { Theme } from '@/shared/components';

export const GTM_EVENTS = {
  MENU: (value: string) => ({ event: 'menu-clicked', value }),
  POST_CARD: (value: string) => ({ event: 'post-card-clicked', value }),
  CHECK_EXPERIENCE: (value: string) => ({ event: 'check-experience-clicked', value }),
  CLEAR_FILTERS: { event: 'clear-filters-clicked', value: '' },
  TOGGLE_THEME: (value: Theme) => ({ event: 'toggle-theme-clicked', value }),
  FILTER_POSTS: (value: string) => ({ event: 'filter-posts-clicked', value }),
  ADP_CALENDAR: { event: 'google-calendar-clicked', value: 'ADP' },
  GOOGLE_CALENDAR: { event: 'google-calendar-clicked', value: 'Google' },
  DOWNLOAD_RESUME: { event: 'download-resume-clicked', value: '' },
  CLOSE_SEARCH_MODAL: { event: 'close-search-modal-clicked', value: '' },
  CONTACT_LINK: (value: string) => ({ event: 'contact-link-clicked', value }),
  SUBMIT_POST_SEARCH: (value: string) => ({ event: 'submit-post-search', value }),
  MORE_ABOUT_ME: { event: 'more-about-me-clicked', value: '' },
  SEND_MESSAGE: (value: 'success' | 'error') => ({
    event: 'send-message-clicked',
    value
  }),
  LINKEDIN_RECOMMENDATION: (linkedInUser: string) => ({
    event: 'linkedIn-recommendation-clicked',
    value: linkedInUser
  }),
  CHECK_RECOMMENDATION: (value: string) => ({
    event: 'check-recommendation-clicked',
    value
  }),
  LENS_CARD: (value: string) => ({ event: 'lens-card-clicked', value }),
  LENS_NAVIGATION: (value: 'previous' | 'next') => ({
    event: 'lens-navigation-clicked',
    value
  }),
  LENS_THUMBNAIL: (value: number) => ({
    event: 'lens-thumbnail-clicked',
    value: String(value)
  }),
  LENS_MODAL_CLOSE: { event: 'lens-modal-closed', value: '' },
  PROJECT_DEMO: (value: string) => ({ event: 'project-demo-link-clicked', value }),
  PROJECTS_FOOTER: { event: 'projects-footer-link-clicked', value: '' },
  RECOMMENDATIONS_FOOTER: { event: 'recommendations-footer-link-clicked', value: '' },
  PAGINATION: (value: string) => ({ event: 'pagination-clicked', value })
} as const;

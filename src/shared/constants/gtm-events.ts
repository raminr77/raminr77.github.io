import { Theme } from '@/shared/components/toggle-theme-button';

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
  CLOSE_SEACH_MODAL: { event: 'close-seach-modal-clicked', value: '' },
  CONTACT_LINK: (value: string) => ({ event: 'contact-lint-clicked', value }),
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
  })
} as const;

const POSTS_BASE_URL = '/api/posts/';

export const CONTACT_ME_ENDPOINTS = {
  sendMessage: 'https://api.emailjs.com/api/v1.0/email/send'
} as const;

export const POSTS_ENDPOINTS = {
  getAll: POSTS_BASE_URL,
  getDetail: (id: number) => `${POSTS_BASE_URL}${id}`
} as const;

export const ENDPOINTS = {
  verifyReCaptcha: '/api/recaptcha-verify',
  sendMessage: 'https://email-api.ramiin.se',
  googleVerifyReCaptcha: 'https://www.google.com/recaptcha/api/siteverify',
  searchPosts: (query: string) => `/api/posts/search?q=${encodeURIComponent(query)}`
} as const;

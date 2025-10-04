export const ENDPOINTS = {
  sendMessage: 'https://email-api.ramiin.workers.dev/',
  verifyGoogleReCaptcha: 'https://www.google.com/recaptcha/api/siteverify',
  searchPosts: (query: string) => `/api/posts/search?q=${query}`,
  sendTextToAI: ({ text, userId }: { text: string; userId: string }) =>
    `/api/ai/?text=${text}&userId=${userId}`
} as const;

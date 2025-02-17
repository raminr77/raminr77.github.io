export const CONTACT_ME_ENDPOINTS = {
  sendMessage: 'https://email-api.ramiin.workers.dev/',
  sendTextToAI: (text: string) => `/api/ai/?text=${text}`
} as const;

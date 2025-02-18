export const CONTACT_ME_ENDPOINTS = {
  sendMessage: 'https://email-api.ramiin.workers.dev/',
  sendTextToAI: ({ text, userId }: { text: string; userId: string }) =>
    `/api/ai/?text=${text}&userId=${userId}`
} as const;

export const GTM_EVENTS = {
  DOWNLOAD_RESUME: { event: 'download-resume-clicked', value: '' },
  SEND_MESSAGE: { event: 'send-message-clicked', value: '' },
  LINKEDIN_RECOMMENDATION: (linkedInUser: string) => (
    { event: 'linkedIn-recommendation-clicked', value: linkedInUser }
  )
} as const;

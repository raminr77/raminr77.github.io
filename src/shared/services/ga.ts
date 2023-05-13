import { GA_ID } from '@/shared/constants/ga';

export const gaPageView = (url: string) => {
  if (!window?.gtag) return;
  window.gtag('config', GA_ID, {
    page_path: url
  });
};

export const gaEvent = ({
  action,
  params
}: {
  action: string;
  params: Record<string, string | number>;
}) => {
  if (!window?.gtag) return;
  window.gtag('event', action, params);
};

'use client';

import { sendGTMEvent } from '@next/third-parties/google';

import { GENERAL_SITE_DATA } from '@/data/general';
import { GTM_EVENTS } from '@/shared/constants';

interface ProjectCardDemoLinkProps {
  title: string;
  url: string;
}

export function ProjectCardDemoLink({ url, title }: ProjectCardDemoLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sendGTMEvent(GTM_EVENTS.PROJECT_DEMO(title))}
      className="inline-block whitespace-nowrap rounded bg-sky-700 px-2 py-0 text-sm leading-6 text-white"
    >
      {GENERAL_SITE_DATA.projects.demoLinkText}
    </a>
  );
}

'use client'
import Script from 'next/script';
import { isSSR } from '@/shared/helpers';

const AI_TOKEN = 'sYIqRFJKMyTJep9h';

export function AiBot() {
  if (!isSSR()) {
    window.difyChatbotConfig = {
      token: AI_TOKEN
    }
  }

  return (
    <Script
      src="https://udify.app/embed.min.js"
      id={AI_TOKEN}
      defer
    >
    </Script>
  );
}

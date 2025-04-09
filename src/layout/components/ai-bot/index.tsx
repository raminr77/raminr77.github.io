'use client';
import { AiChatModal } from './ai-chat-modal';
import { animator } from '@/shared/helpers';
import { titleFont } from '@/app/fonts';
import { useState } from 'react';
import { clsx } from 'clsx';

export function AiButton() {
  const [showAI, setShowAI] = useState<boolean>(false);

  const handleClose = () => setShowAI(false);

  const handleOpen = () => setShowAI(true);

  return (
    <>
      <button
        className={clsx(
          'z-40 fixed w-12 h-12 rounded-full bottom-7 right-5 bg-amber-500 text-black duration-300 font-extrabold text-xl',
          animator({ name: 'fadeInDown' }),
          titleFont.className
        )}
        onClick={handleOpen}
      >
        AI
      </button>
      <AiChatModal isOpen={showAI} onClose={handleClose} />
    </>
  );
}

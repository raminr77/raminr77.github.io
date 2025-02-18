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
          'absolute w-12 h-12 border-2 text-amber-500 border-amber-500 rounded-full bottom-7 right-5 bg-transparent hover:bg-amber-500 hover:text-black duration-300 font-extrabold',
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

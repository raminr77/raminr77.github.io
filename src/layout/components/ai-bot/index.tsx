'use client';
import { TextInput } from '@/shared/components/text-input';
import { sendGTMEvent } from '@next/third-parties/google';
import { Button } from '@/shared/components/button';
import { sendTextToAI } from '@/shared/services';
import { GTM_EVENTS } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { titleFont } from '@/app/fonts';

interface AiChatForm {
  text: string;
}

interface ChatItem {
  id: string;
  text: string;
  isUser: boolean;
}

interface AiBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const MUTATION_OBSERVER_CONFIGS = { childList: true, subtree: true };

export function AiBot({ isOpen, onClose }: AiBotProps) {
  const [chatData, setChatData] = useState<ChatItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    formState: { errors },
    reset,
    register,
    handleSubmit
  } = useForm<AiChatForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: {
      text: ''
    }
  });

  const onSubmit = ({ text }: AiChatForm) => {
    sendGTMEvent(GTM_EVENTS.SEND_AI_MESSAGE);
    setIsLoading(true);
    setChatData((state) => [
      ...state,
      {
        text,
        isUser: true,
        id: crypto.randomUUID()
      }
    ]);

    // REQUEST
    sendTextToAI(text)
      .then(({ answer }) => {
        reset();
        setChatData((state) => [
          ...state,
          {
            isUser: false,
            text: answer,
            id: crypto.randomUUID()
          }
        ]);
      })
      .catch(() => setChatData(chatData.slice(0, -1)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    if (chatContainerRef.current) {
      observer.observe(chatContainerRef.current, MUTATION_OBSERVER_CONFIGS);
    }

    return () => observer.disconnect();
  }, [])

  return isOpen && (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-screen bg-white/60 dark:bg-black/60 z-50 backdrop-blur-md flex items-center justify-between flex-col pb-6",
        animator({ name: 'fadeInDown' })
      )}
    >
      <div className='w-full flex items-center justify-between p-3 lg:max-w-3xl bg-white dark:bg-black border-b'>
        <button className='hover:text-amber-500 duration-300' onClick={onClose}>Close</button>
        <h3 className={clsx('text-2xl font-bold', titleFont.className)}>AI Assistant</h3>
        <div />
      </div>

      <div
        ref={chatContainerRef}
        className="w-full h-full overflow-y-auto text-md lg:max-w-3xl px-4"
      >
        {chatData.map(({ isUser, text }: ChatItem, index: number) =>
          isUser ? (
            <div
              key={index}
              className={clsx(
                'flex w-full justify-end mb-4',
                animator({ name: 'fadeInUp' })
              )}
            >
              <div className="bg-sky-950 py-2 px-3 rounded-2xl rounded-br-md">{text}</div>
            </div>
          ) : (
            <div
              key={index}
              className={clsx(
                'flex w-full justify-start mb-4',
                animator({ name: 'fadeInUp' })
              )}
            >
              <div
                className="bg-sky-800 py-2 px-3 rounded-2xl rounded-tl-md"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          )
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-end justify-between w-full gap-4 lg:max-w-3xl px-4"
      >
        <TextInput
          required
          id="text"
          type="text"
          tabIndex={1}
          className="w-full h-12"
          containerClassName="w-full"
          error={errors.text?.message}
          placeholder="Ask About Ramin From AI"
          {...register('text', {
            required: {
              value: true,
              message: 'You must to enter a text!'
            }
          })}
        />
        <Button
          type="submit"
          label="Submit"
          disabled={isLoading}
          className="h-12 min-w-24"
        />
      </form>
    </div>
  );
}

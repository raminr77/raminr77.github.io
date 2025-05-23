'use client';
import { TextInput } from '@/shared/components/text-input';
import { sendGTMEvent } from '@next/third-parties/google';
import { Spinner } from '@/shared/components/spinner';
import { Button } from '@/shared/components/button';
import { useEffect, useRef, useState } from 'react';
import { sendTextToAI } from '@/shared/services';
import { GTM_EVENTS } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { useForm } from 'react-hook-form';
import { titleFont } from '@/app/fonts';
import { clsx } from 'clsx';

interface AiChatForm {
  text: string;
}

interface ChatItem {
  id: string;
  text: string;
  isUser: boolean;
}

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MUTATION_OBSERVER_CONFIGS = { childList: true, subtree: true };

export function AiChatModal({ isOpen, onClose }: AiChatModalProps) {
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

    setChatData((state: ChatItem[]) => [
      ...state,
      {
        text,
        isUser: true,
        id: crypto.randomUUID()
      }
    ]);
    reset();
    setIsLoading(true);

    // REQUEST
    sendTextToAI({
      text,
      userId: crypto.randomUUID()
    })
      .then(({ answer }) => {
        setChatData((state: ChatItem[]) => [
          ...state,
          {
            isUser: false,
            text: answer || '<strong>Try again, please.</strong>',
            id: crypto.randomUUID()
          }
        ]);
      })
      .catch(() => setChatData(chatData.slice(0, -1)))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
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

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    isOpen && (
      <div
        className={clsx(
          'fixed top-0 left-0 w-full h-dvh bg-white/60 dark:bg-black/60 z-50 backdrop-blur-md flex items-center justify-between flex-col pb-6',
          animator({ name: 'slideInDown', speed: 'fast' })
        )}
      >
        <div className="w-full flex items-center justify-between p-3 lg:max-w-3xl bg-white/20 dark:bg-black/20 border-b">
          <button className="hover:text-amber-500 duration-300" onClick={onClose}>
            Close
          </button>
          <h3 className={clsx('text-2xl font-bold', titleFont.className)}>
            AI Assistant
          </h3>
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
                  'flex w-full justify-end my-2',
                  animator({ name: 'fadeInUp' })
                )}
              >
                <div className="dark:bg-sky-950 bg-sky-200 py-2 px-3 rounded-2xl rounded-br-md">
                  {text}
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={clsx(
                  'flex w-full justify-start my-2',
                  animator({ name: 'fadeInUp' })
                )}
              >
                <div
                  className="dark:bg-sky-800 bg-sky-300 py-2 px-3 rounded-2xl rounded-tl-md"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            )
          )}
          {chatData.length % 2 !== 0 && (
            <div
              className={clsx(
                'flex w-full justify-start mY-2',
                animator({ name: 'fadeIn' })
              )}
            >
              <Spinner />
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-end justify-between w-full gap-2 lg:max-w-3xl px-4"
        >
          <TextInput
            required
            autoFocus
            type="text"
            tabIndex={1}
            id="ai-chat-input"
            className="w-full h-12"
            error={errors.text?.message}
            placeholder="Ask About Ramin From AI"
            containerClassName="w-full flex-col-reverse"
            {...register('text', {
              required: {
                value: true,
                message: 'You must to enter a text!'
              }
            })}
          />
          <Button
            type="submit"
            label="Send"
            disabled={isLoading}
            className="h-12 min-w-16"
          />
        </form>
      </div>
    )
  );
}

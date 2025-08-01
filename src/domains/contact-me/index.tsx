'use client';

import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

import Link from 'next/link';

import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { EMAIL_VALIDATION_REGEX, GTM_EVENTS } from '@/shared/constants';
import { TextInput } from '@/shared/components/text-input';
import { Button } from '@/shared/components/button';
import { sendEmail } from '@/shared/services';
import { animator } from '@/shared/helpers';
import { CONTACT_ME_DATA } from '@/data';

interface ContactMeForm {
  email: string;
  subject: string;
  message: string;
}

export function ContactMePage() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    reset,
    control,
    register,
    getValues,
    handleSubmit
  } = useForm<ContactMeForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    values: {
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = () => {
    setLoading(true);
    sendGTMEvent(GTM_EVENTS.SEND_MESSAGE);

    sendEmail(getValues())
      .then(() => reset())
      .finally(() => setLoading(false));
  };

  return (
    <ContentContainer title="Contact Me" className="z-40">
      <div className="flex gap-5 max-lg:flex-wrap">
        <div className={clsx('w-full text-xl leading-7', animator({ name: 'fadeIn' }))}>
          {CONTACT_ME_DATA.texts.map((text: string, index: number) => (
            <p
              key={index}
              className={animator({ name: 'fadeInUp' })}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
            >
              {text}
            </p>
          ))}

          <br />
          <p className={animator({ name: 'fadeIn', delay: '2s' })}>
            You can book a meeting with me:
          </p>
          <div
            className={clsx(
              'text-md flex items-center gap-2',
              animator({ name: 'fadeIn', delay: '2s' })
            )}
          >
            <Link
              href={CONTACT_ME_DATA.googleCalendar}
              className="text-amber-500"
              target="_blank"
            >
              Personal Calendar
            </Link>
            <span>|</span>
            <Link
              href={CONTACT_ME_DATA.mentorCalendar}
              className="text-amber-500"
              target="_blank"
            >
              Mentorship Calendar
            </Link>
          </div>
        </div>

        <div
          className={clsx(
            'text-md flex select-none flex-col gap-3 bg-transparent',
            animator({ name: 'fadeIn' })
          )}
        >
          {CONTACT_ME_DATA.links.map(({ title, actionLabel, url }, index: number) => (
            <div
              key={title}
              className={clsx('flex items-center gap-2', animator({ name: 'fadeInUp' }))}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
            >
              <span>{title}:</span>
              <Link
                href={url}
                target="_blank"
                className={clsx('text-md whitespace-nowrap text-amber-500', {
                  'pointer-events-none': !url
                })}
              >
                {actionLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <form
        className={clsx(
          'mt-5 flex flex-col gap-4',
          animator({ name: 'fadeIn', delay: '2s' }),
          {
            'pointer-events-none': loading
          }
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          required
          type="text"
          id="subject"
          label="Subject"
          placeholder="Enter your subject"
          error={errors.subject?.message}
          {...register('subject', {
            required: {
              value: true,
              message: 'You must to enter a subject!'
            },
            minLength: {
              value: 10,
              message: 'Your subject should be more than 10 characters'
            }
          })}
        />
        <TextInput
          required
          id="email"
          type="email"
          label="Email"
          error={errors.email?.message}
          placeholder="Enter your email address"
          {...register('email', {
            pattern: {
              value: EMAIL_VALIDATION_REGEX,
              message: 'Your email address is invalid!'
            },
            required: {
              value: true,
              message: 'You must to enter your email address!'
            }
          })}
        />

        <Controller
          name="message"
          control={control}
          rules={{
            minLength: {
              value: 30,
              message: 'Your message should be more than 30 characters'
            },
            required: {
              value: true,
              message: 'You must to enter your message!'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              required
              id="message"
              value={value}
              type="textarea"
              label="Message"
              onChange={onChange}
              placeholder="Enter your message"
              error={errors.message?.message}
            />
          )}
        />
        <div className="mt-2 flex w-full justify-end">
          <Button label="Submit" type="submit" loading={loading} />
        </div>
      </form>
    </ContentContainer>
  );
}

'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import { CONTACT_ME_DATA } from '@/data';
import { animator } from '@/shared/helpers';
import { Button } from '@/shared/components/button';
import { TextInput } from '@/shared/components/text-input';
import { ContentContainer } from '@/layout/components/content-container';

export function ContactMePage() {
  const handleSubmit = () => {};

  return (
    <ContentContainer title='Contact Me' className='z-40'>
      <div className='flex gap-5 max-lg:flex-wrap'>
        <div
          className={clsx('w-full text-xl leading-7', animator({ name: 'fadeInLeft' }))}
        >
          {CONTACT_ME_DATA.TEXTS.map((text: string, index: number) => (
            <p
              key={index}
              className={animator({ name: 'fadeInUp' })}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
            >
              {text}
            </p>
          ))}
        </div>

        <div
          className={clsx(
            'text-md flex select-none flex-col gap-3 bg-transparent',
            animator({ name: 'fadeInRight' })
          )}
        >
          {CONTACT_ME_DATA.LINKS.map(({ title, actionLabel, url }, index: number) => (
            <div
              key={title}
              className={clsx('flex items-center gap-2', animator({ name: 'fadeInUp' }))}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
            >
              <h3>{title}:</h3>
              <Link
                href={url}
                target='_blank'
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
          animator({ name: 'fadeIn', delay: '1s' })
        )}
      >
        <TextInput
          required
          type='text'
          id='subject'
          tabIndex={1}
          label='Subject'
          placeholder='Enter your subject'
        />
        <TextInput
          required
          id='email'
          type='email'
          tabIndex={2}
          label='Email'
          placeholder='Enter your email address'
        />
        <TextInput
          required
          tabIndex={3}
          id='message'
          type='textarea'
          label='Message'
          placeholder='Enter your message'
        />
        <div className='mt-2 flex w-full justify-end'>
          <Button label='Submit' type='submit' onClick={handleSubmit} />
        </div>
      </form>
    </ContentContainer>
  );
}

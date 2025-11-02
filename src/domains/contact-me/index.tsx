'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Link from 'next/link';
import { clsx } from 'clsx';

import { ContentContainer } from '@/layout/components/content-container';
import { sendGTMEvent } from '@next/third-parties/google';
import { ContactForm } from './components/contact-form';
import { ENV, GTM_EVENTS } from '@/shared/constants';
import { animator } from '@/shared/helpers';
import { CONTACT_ME_DATA } from '@/data';

const GOOGLE_RECAPTCHA_ELEMENT_ID = 'g-recaptcha-container';

export function ContactMePage() {
  return (
    <ContentContainer title="Contact Me" className="z-40">
      <div className="flex gap-5 max-lg:flex-wrap">
        <div className="w-full text-xl leading-7">
          {CONTACT_ME_DATA.texts.map((text: string, index: number) => (
            <p key={index}>{text}</p>
          ))}

          <br />

          <p>You can book a meeting with me:</p>
          <div className="text-md flex items-center gap-2">
            <Link
              onClick={() => sendGTMEvent(GTM_EVENTS.GOOGLE_CALENDAR)}
              href={CONTACT_ME_DATA.googleCalendar}
              className="text-amber-500"
              target="_blank"
            >
              Personal Calendar
            </Link>
            <span>|</span>
            <Link
              onClick={() => sendGTMEvent(GTM_EVENTS.ADP_CALENDAR)}
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
              className={clsx('flex items-center gap-2', animator({ name: 'fadeIn' }))}
              style={{ animationDelay: `${(index + 1) * 0.3}s` }}
            >
              <span>{title}:</span>
              <Link
                href={url}
                target="_blank"
                onClick={() => sendGTMEvent(GTM_EVENTS.CONTACT_LINK(actionLabel))}
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

      <GoogleReCaptchaProvider
        scriptProps={{ async: true, defer: true }}
        reCaptchaKey={ENV.GOOGLE_RECAPTCHA_SITE_KEY}
        container={{
          element: GOOGLE_RECAPTCHA_ELEMENT_ID,
          parameters: { badge: 'bottomright' }
        }}
      >
        <ContactForm />
        <div id={GOOGLE_RECAPTCHA_ELEMENT_ID} />
      </GoogleReCaptchaProvider>
    </ContentContainer>
  );
}

'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Controller, useForm } from 'react-hook-form';

import { sendGTMEvent } from '@next/third-parties/google';
import { clsx } from 'clsx';

import { GENERAL_SITE_DATA } from '@/data';
import { Button, TextInput } from '@/shared/components';
import { EMAIL_VALIDATION_REGEX, GTM_EVENTS } from '@/shared/constants';
import { notify } from '@/shared/helpers';
import { sendEmail } from '@/shared/services';

interface ContactMeForm {
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { contactForm } = GENERAL_SITE_DATA;
  const { subject, email, message } = contactForm.fields;

  const [loading, setLoading] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

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

  const onSubmit = async () => {
    if (!executeRecaptcha) {
      notify.error({ message: contactForm.errors.recaptchaNotDetected });
      return;
    }
    setLoading(true);
    try {
      const recaptchaToken = await executeRecaptcha('contact_form_submit');

      const emailResponse = await sendEmail({
        ...getValues(),
        recaptchaToken
      });

      if (emailResponse) {
        sendGTMEvent(GTM_EVENTS.SEND_MESSAGE('success'));
        reset();
      }
    } catch {
      sendGTMEvent(GTM_EVENTS.SEND_MESSAGE('error'));
      notify.error({ message: contactForm.errors.recaptchaFailed });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={clsx('mt-5 flex flex-col gap-4', {
        'pointer-events-none': loading
      })}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
    >
      <TextInput
        required
        type="text"
        id="subject"
        label={subject.label}
        testId="subject-input"
        placeholder={subject.placeholder}
        error={errors.subject?.message}
        {...register('subject', {
          required: {
            value: true,
            message: subject.validation.required
          },
          minLength: {
            value: 10,
            message: subject.validation.minLength
          }
        })}
      />
      <TextInput
        required
        id="email"
        type="email"
        label={email.label}
        testId="email-input"
        error={errors.email?.message}
        placeholder={email.placeholder}
        {...register('email', {
          pattern: {
            value: EMAIL_VALIDATION_REGEX,
            message: email.validation.pattern
          },
          required: {
            value: true,
            message: email.validation.required
          }
        })}
      />

      <Controller
        name="message"
        control={control}
        rules={{
          minLength: {
            value: 30,
            message: message.validation.minLength
          },
          required: {
            value: true,
            message: message.validation.required
          }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            required
            id="message"
            value={value}
            type="textarea"
            onChange={onChange}
            label={message.label}
            testId="message-input"
            placeholder={message.placeholder}
            error={errors.message?.message}
          />
        )}
      />
      <div className="mt-2 flex w-full justify-end">
        <Button
          type="submit"
          loading={loading}
          testId="submit-button"
          label={contactForm.submitButton}
        />
      </div>
    </form>
  );
}

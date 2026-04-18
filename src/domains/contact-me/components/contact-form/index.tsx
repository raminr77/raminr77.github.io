'use client';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { clsx } from 'clsx';

import { sendGTMEvent } from '@next/third-parties/google';

import { EMAIL_VALIDATION_REGEX, GTM_EVENTS } from '@/shared/constants';
import { TextInput, Button } from '@/shared/components';
import { sendEmail } from '@/shared/services';
import { GENERAL_SITE_DATA } from '@/data';
import { notify } from '@/shared/helpers';

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
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
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

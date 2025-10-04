'use client';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { clsx } from 'clsx';

import { sendGTMEvent } from '@next/third-parties/google';

import { EMAIL_VALIDATION_REGEX, GTM_EVENTS } from '@/shared/constants';
import { TextInput } from '@/shared/components/text-input';
import { Button } from '@/shared/components/button';
import { sendEmail } from '@/shared/services';
import { animator } from '@/shared/helpers';

interface ContactMeForm {
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
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
      return;
    }
    setLoading(true);
    sendGTMEvent(GTM_EVENTS.SEND_MESSAGE);

    try {
      const recaptchaToken = await executeRecaptcha('contact_form_submit');

      await sendEmail({
        ...getValues(),
        recaptchaToken
      });
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';

import { sendGTMEvent } from '@next/third-parties/google';

import { GENERAL_SITE_DATA } from '@/data';
import { Button } from '@/shared/components/button';
import { TextInput } from '@/shared/components/text-input';
import {
  EMAIL_VALIDATION_REGEX,
  ENV,
  GTM_EVENTS,
  RECAPTCHA_ACTIONS
} from '@/shared/constants';
import { type ResumeDelivery, requestResume } from '@/shared/services';

interface ResumeRequestFormProps {
  titleId: string;
  onSuccess: (email: string, delivery: ResumeDelivery) => void;
}

interface ResumeRequestFormValues {
  email: string;
}

const RECAPTCHA_LOAD_TIMEOUT_MS = 8000;

export function ResumeRequestForm({ titleId, onSuccess }: ResumeRequestFormProps) {
  const { resumeModal } = GENERAL_SITE_DATA;
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasRecaptchaTimedOut, setHasRecaptchaTimedOut] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResumeRequestFormValues>({
    mode: 'onChange',
    defaultValues: { email: '' }
  });

  const isRecaptchaReady = Boolean(executeRecaptcha);
  const isRecaptchaUnavailable =
    !isRecaptchaReady && (!ENV.GOOGLE_RECAPTCHA_SITE_KEY || hasRecaptchaTimedOut);

  useEffect(() => {
    if (isRecaptchaReady) return;
    const timeoutId = window.setTimeout(
      () => setHasRecaptchaTimedOut(true),
      RECAPTCHA_LOAD_TIMEOUT_MS
    );
    return () => window.clearTimeout(timeoutId);
  }, [isRecaptchaReady]);

  const onSubmit = async ({ email }: ResumeRequestFormValues) => {
    if (!executeRecaptcha) {
      setErrorMessage(resumeModal.errors.recaptchaNotDetected);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const recaptchaToken = await executeRecaptcha(RECAPTCHA_ACTIONS.RESUME_REQUEST);
      const delivery = await requestResume({ email, recaptchaToken });
      sendGTMEvent(GTM_EVENTS.REQUEST_RESUME('success'));
      onSuccess(email, delivery);
    } catch (error) {
      sendGTMEvent(GTM_EVENTS.REQUEST_RESUME('error'));
      setErrorMessage(
        error instanceof Error ? error.message : resumeModal.errors.generic
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 id={titleId} className="pr-12 text-2xl">
        {resumeModal.title}
      </h2>
      <p className="mt-2 text-base opacity-80">{resumeModal.description}</p>

      <form
        noValidate
        className="mt-5 flex flex-col gap-4"
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
      >
        <TextInput
          autoFocus
          required
          id="resume-email"
          type="email"
          testId="resume-email-input"
          label={resumeModal.email.label}
          error={errors.email?.message}
          placeholder={resumeModal.email.placeholder}
          {...register('email', {
            required: { value: true, message: resumeModal.email.validation.required },
            pattern: {
              value: EMAIL_VALIDATION_REGEX,
              message: resumeModal.email.validation.pattern
            }
          })}
        />

        {(isRecaptchaUnavailable || errorMessage) && (
          <p role="alert" className="text-sm text-red-500" data-testid="resume-error">
            {isRecaptchaUnavailable
              ? resumeModal.errors.recaptchaUnavailable
              : errorMessage}
          </p>
        )}

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isRecaptchaUnavailable}
            testId="resume-submit-button"
            label={resumeModal.submitButton}
          />
        </div>
      </form>
    </>
  );
}

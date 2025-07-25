'use client';

import type { ChangeEvent } from 'react';

import { clsx } from 'clsx';

interface TextInputProps {
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  tabIndex?: number;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  error?: string | null;
  containerClassName?: string;
  type?: 'text' | 'password' | 'email' | 'textarea';
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function TextInput({
  name,
  label,
  value,
  error,
  onChange,
  tabIndex,
  className,
  placeholder,
  type = 'text',
  required = false,
  id = 'text-input',
  autoFocus = false,
  containerClassName,
  ...rest
}: TextInputProps) {
  const INPUT_CLASSES = clsx(
    'border outline-0 indent-2 leading-8 duration-100 focus:border-amber-500 text-lg backdrop-blur-sm dark:placeholder-white-800',
    className
  );
  return (
    <div className={clsx('flex flex-col', containerClassName)}>
      {label && (
        <label htmlFor={id} className="mb-2 text-lg">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type !== 'textarea' ? (
        <input
          id={id}
          type={type}
          value={value}
          name={name ?? id}
          tabIndex={tabIndex}
          required={required}
          onChange={onChange}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={clsx(INPUT_CLASSES, {
            'border-red-500': !!error
          })}
          {...rest}
        />
      ) : (
        <textarea
          id={id}
          rows={4}
          spellCheck
          defaultValue={value}
          tabIndex={tabIndex}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(INPUT_CLASSES, 'min-h-48 px-4 py-2', {
            'border-red-500': !!error
          })}
          {...rest}
        />
      )}
      {error && <span className="text-md ml-1 mt-1 text-red-500">{error}</span>}
    </div>
  );
}

'use client';
import { clsx } from 'clsx';
import type { ChangeEvent } from 'react';

interface TextInputProps {
  id?: string;
  value?: string;
  label?: string;
  tabIndex?: number;
  required?: boolean;
  placeholder?: string;
  onChange?: (text: string) => void;
  type?: 'text' | 'password' | 'email' | 'textarea';
}

const INPUT_CLASSES =
  'border dark:bg-gray-950/20 bg-gray-50/20 outline-0 indent-2 leading-8 duration-100 focus:border-amber-500 text-lg backdrop-blur-sm';

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  tabIndex = 0,
  type = 'text',
  required = false,
  id = 'text-input'
}: TextInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label id={id} className='text-lg'>
          {label} {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      {type !== 'textarea' ? (
        <input
          id={id}
          type={type}
          value={value}
          tabIndex={tabIndex}
          required={required}
          onChange={handleChange}
          placeholder={placeholder}
          className={INPUT_CLASSES}
        />
      ) : (
        <textarea
          id={id}
          rows={4}
          tabIndex={tabIndex}
          required={required}
          onChange={handleChange}
          placeholder={placeholder}
          className={clsx(INPUT_CLASSES, 'min-h-48 px-4 py-2')}
        >
          {value}
        </textarea>
      )}
    </div>
  );
}

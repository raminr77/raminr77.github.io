import { Spinner } from '@/shared/components/spinner';
import type { MouseEventHandler } from 'react';
import { clsx } from 'clsx';

interface ButtonProps {
  label: string;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  type: 'submit' | 'button';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  type = 'button',
  label,
  onClick,
  className,
  loading = false,
  disabled = false
}: ButtonProps) {
  return (
    <button
      type={type}
      title={label}
      onClick={onClick}
      aria-label={label}
      disabled={loading || disabled}
      className={clsx(
        'flex min-w-36 items-center justify-center gap-2 border px-5 leading-10 shadow backdrop-blur-md duration-300 hover:border-amber-500 hover:shadow-amber-500/50',
        className
      )}
    >
      {loading && <Spinner />}
      {label}
    </button>
  );
}

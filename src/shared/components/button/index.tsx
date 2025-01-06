import type { MouseEventHandler } from 'react';

interface ButtonProps {
  label: string;
  type: 'submit' | 'button';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({ type = 'button', label, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className='min-w-36 border px-5 leading-10 shadow backdrop-blur-md duration-300 hover:border-amber-500 hover:shadow-amber-500/50'
    >
      {label}
    </button>
  );
}

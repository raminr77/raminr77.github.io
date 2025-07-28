import { Slide, toast, type ToastOptions } from 'react-toastify';

type NotifyProps = {
  message: string;
  options?: ToastOptions<unknown>;
};

const DEFAULT_OPTIONS: ToastOptions = {
  autoClose: 3000,
  transition: Slide,
  pauseOnHover: true,
  hideProgressBar: true
};

export const notify = {
  default: ({ message, options }: NotifyProps) =>
    toast(message, { ...DEFAULT_OPTIONS, ...options }),
  info: ({ message, options }: NotifyProps) =>
    toast.info(message, { ...DEFAULT_OPTIONS, ...options }),
  error: ({ message, options }: NotifyProps) =>
    toast.error(message, { ...DEFAULT_OPTIONS, ...options }),
  warning: ({ message, options }: NotifyProps) =>
    toast.warn(message, { ...DEFAULT_OPTIONS, ...options }),
  success: ({ message, options }: NotifyProps) =>
    toast.success(message, { ...DEFAULT_OPTIONS, ...options })
} as const;

import { toast } from 'react-toastify';

type NotifyProps = {
  message: string;
};

export const notify = {
  error: ({ message }: NotifyProps) => toast.error(message, { autoClose: 3000 }),
  success: ({ message }: NotifyProps) => toast.success(message, { autoClose: 3000 })
};

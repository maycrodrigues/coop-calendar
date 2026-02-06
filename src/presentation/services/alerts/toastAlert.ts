import { SwalConfig } from './sweetAlertConfig';

interface ToastOptions {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const showToast = ({
  message,
  type = 'success',
  duration = 3000,
}: ToastOptions) => {
  const position = type === 'error' ? 'center' : 'top-end';

  return SwalConfig.fire({
    toast: true,
    position,
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });
};
import { notify } from '@/shared/helpers';
import { CONTACT_ME_ENDPOINTS } from '@/shared/api/constants';

type requestData = {
  email: string;
  subject: string;
  message: string;
};

export const sendEmail = (data: requestData) => {
  return new Promise((resolve, reject) => {
    fetch(CONTACT_ME_ENDPOINTS.sendMessage, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template_params: data,
        user_id: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
        service_id: process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID
      })
    })
      .then((response) => {
        if (response.status === 200) {
          notify.success({ message: 'Your message has been sent successfully.' });
          resolve(response);
        } else {
          notify.error({ message: 'We could not send your message now!' });
          reject();
        }
      })
      .catch(() => {
        notify.error({ message: 'We could not send your message now!' });
        reject();
      });
  });
};

import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Swal from 'sweetalert2';
import { PageContainer } from '@/app/layout/page-container';
import { CONTACT_ME_DATA } from '@/data/contact-me';
import { Input } from '@/shared/components/input';
import { EMAIL_CONFIG, EMAIL_SERVER } from '@/shared/constants/email';
import { animator } from '@/shared/utils/animator';

export function ContactMePage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email: ''
  });

  const emailValidation = (email = '') => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const changeInputs = ({ name, value }: { name: string; value: string }) => {
    if (!name) return;
    setFormData({ ...formData, [name]: value });
  };

  const submit = () => {
    if (!formData.subject || !formData.message) {
      Swal.fire({
        timer: 4000,
        icon: 'error',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        text: 'The Subject and Message Should Be Not Empty.'
      });
      return;
    }

    if (!emailValidation(formData.email)) {
      Swal.fire({
        timer: 4000,
        icon: 'error',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        text: 'Please, Enter A Valid Email Address.'
      });
      return;
    }

    setLoading(true);
    fetch(EMAIL_SERVER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: EMAIL_CONFIG.PUBLIC_KEY,
        service_id: EMAIL_CONFIG.SERVICE_ID,
        template_id: EMAIL_CONFIG.TEMPLATE_ID,
        template_params: formData
      })
    })
      .then((response) => {
        if (response.status === 200) {
          setFormData({ email: '', subject: '', message: '' });
          Swal.fire({
            timer: 4000,
            icon: 'success',
            showCloseButton: true,
            showConfirmButton: false,
            text: 'Your Message Sent Successfully.'
          });
        } else {
          Swal.fire({
            timer: 4000,
            icon: 'error',
            showCloseButton: true,
            showConfirmButton: false,
            text: 'Server Error, Please Try Again ...'
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <PageContainer title='Contact' animationName='fadeIn'>
      <div
        className={classNames('w-10/12 mx-auto mt-5 select-none', {
          'pointer-events-none': loading
        })}
      >
        <h3 className='font-title-bold text-2xl mb-3'>Contact Me</h3>
        <div className='w-full mb-4 flex lg:gap-x-6 gap-y-6 lg:justify-between lg:flex-row flex-col'>
          <div
            className='leading-7'
            dangerouslySetInnerHTML={{ __html: CONTACT_ME_DATA.TEXT }}
          />
          <ul
            className={classNames(
              animator({ name: 'fadeIn' }),
              'border border-solid border-white p-5 min-w-fit'
            )}
          >
            {CONTACT_ME_DATA.LINKS.map((item, index) => (
              <li key={index} className='flex items-center text-sm leading-7'>
                <p>{item.title}</p>
                <p className='ml-1 mr-2'>:</p>
                <Link href={item.url} target='_blank' className='text-sky-500'>
                  {item.actionText}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Input
          required
          name='subject'
          label='Subject'
          inputClassName='mb-4'
          onChange={changeInputs}
          value={formData.subject}
          placeholder='Your Subject'
        />
        <Input
          required
          name='email'
          label='Email'
          inputClassName='mb-4'
          value={formData.email}
          onChange={changeInputs}
          placeholder='Your Email Address'
        />
        <Input
          rows={6}
          required
          isMultiRow
          name='message'
          label='Message'
          inputClassName='mb-4'
          onChange={changeInputs}
          value={formData.message}
          placeholder='Your Message ...'
        />
        <div className='w-full flex justify-end'>
          <button
            type='button'
            onClick={submit}
            disabled={loading}
            className={classNames(
              'bg-white leading-10 hover:bg-black hover:text-white text-black w-full lg:max-w-xs border border-solid border-white',
              {
                'opacity-60 pointer-events-none': loading
              }
            )}
          >
            {loading ? 'Pending ...' : 'Submit'}
          </button>
          <br />
        </div>
        <br />
      </div>
    </PageContainer>
  );
}

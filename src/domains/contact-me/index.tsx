import { useState } from 'react';
import { PageContainer } from '@/app/layout/page-container';
import { Input } from '@/shared/components/input';

export function ContactMePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    message: '',
    email: ''
  });

  const changeInputs = ({ name, value }: { name: string; value: string }) => {
    if (!name) return;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <PageContainer title='Contact' animationName='fadeIn'>
      <div className='w-10/12 mx-auto mt-5 select-none'>
        <h3 className='font-title-bold text-2xl mb-3'>Contact Me</h3>
        <Input
          required
          name='fullname'
          label='Full Name'
          inputClassName='mb-4'
          onChange={changeInputs}
          placeholder='Your Full Name'
        />
        <Input
          required
          name='email'
          label='Email'
          inputClassName='mb-4'
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
          placeholder='Your Message ...'
        />
        <div className='w-full flex justify-end'>
          <button className='bg-white leading-10 hover:bg-black hover:text-white text-black w-full lg:max-w-xs border border-solid border-white'>
            Submit
          </button>
        </div>
      </div>
    </PageContainer>
  );
}

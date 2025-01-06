import { clsx } from 'clsx';
import { titleFont } from '@/app/fonts';
import { CONTACT_ME_DATA } from '@/data';
import { animator } from '@/shared/helpers';
import { ContentContainer } from '@/layout/components/content-container';

export function ContactMePage() {
  return (
    <ContentContainer>
      <h1 className={clsx('text-2xl font-bold', titleFont.className)}>Contact Me</h1>
      <div className='mt-2 border text-xl leading-7'>{CONTACT_ME_DATA.TEXT}</div>

      <form className={clsx(animator({ name: 'fadeIn', delay: '2s' }))}>
        <input type='text' />
      </form>
    </ContentContainer>
  );
}

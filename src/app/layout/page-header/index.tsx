import Link from 'next/link';
import classNames from 'classnames';
import { MAIN_DATA } from '@/data';
import { Image } from '@/shared/components/Image';
import { CRO_DATA } from '@/shared/constants/cro';
import { GA_EVENT_NAMES } from '@/shared/constants/ga';
import { MENU } from '@/shared/constants/menu';
import { ROUTES } from '@/shared/routes';
import { gaEvent } from '@/shared/services/ga';
import { animator } from '@/shared/utils/animator';

export function PageHeader() {
  return (
    <header className='w-full h-20 select-none flex items-center justify-between py-3 px-5 text-white border-b border-solid border-gray-600 lg:border-white'>
      <Link
        data-cro-id={CRO_DATA.HOME_PAGE}
        href={ROUTES.HOME}
        className='flex items-center mr-10'
        onClick={() =>
          gaEvent({ action: GA_EVENT_NAMES.HEADER_LOGO, params: { device: 'desktop' } })
        }
      >
        <Image
          width={46}
          height={46}
          src='./icons/logo.png'
          alt={`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME}`}
          className={classNames('mr-4', animator({ name: 'bounceIn' }))}
        />
        <div className='flex flex-col'>
          <h1 className='text-xl font-title-bold font-bold'>{`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME}`}</h1>
          <h3 className='font-title text-sm'>{MAIN_DATA.TITLE}</h3>
        </div>
      </Link>

      <nav className='xl:flex items-center justify-end hidden'>
        {MENU.map(({ id, title, url }) => (
          <Link
            key={id}
            href={url}
            data-cro-id={CRO_DATA.HEADER_MENU}
            onClick={() =>
              gaEvent({
                action: GA_EVENT_NAMES.HEADER_MENU_ITEM,
                params: { name: title }
              })
            }
          >
            <div className='text-white p-3 hover:bg-white hover:text-black'>{title}</div>
          </Link>
        ))}
      </nav>
    </header>
  );
}

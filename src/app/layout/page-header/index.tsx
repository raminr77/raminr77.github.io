import Link from 'next/link';
import { MAIN_DATA } from '@/data';
import { MENU } from '@/shared/constants/menu';
import { ROUTES } from '@/shared/routes';

export function PageHeader() {
  return (
    <header className='w-full select-none flex items-center justify-between py-3 px-5 text-white lg:border-b lg:border-solid lg:border-white'>
      <Link href={ROUTES.HOME} className='flex flex-col mr-10'>
        <h1 className='text-xl font-title-bold font-bold'>{`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME}`}</h1>
        <h3 className='font-title text-sm'>{MAIN_DATA.TITLE}</h3>
      </Link>

      <nav className='lg:flex items-center justify-end hidden'>
        {MENU.map(({ id, title, url }) => (
          <Link key={id} href={url}>
            <div className='text-white p-3 hover:bg-white hover:text-black'>{title}</div>
          </Link>
        ))}
      </nav>
    </header>
  );
}

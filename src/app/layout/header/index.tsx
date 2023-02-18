import Link from 'next/link';
import classNames from 'classnames';
import { MAIN_DATA } from '@/data/index';
import styles from './header.module.scss';

const MENU = [
  {
    id: 1,
    url: '/',
    title: 'Home'
  },
  {
    id: 2,
    url: '/',
    title: 'About Me'
  },
  {
    id: 3,
    url: '/',
    title: 'Projects'
  },
  {
    id: 4,
    url: '/',
    title: 'Skills'
  },
  {
    id: 5,
    url: '/',
    title: 'Experiences'
  },
  {
    id: 6,
    url: '/',
    title: 'Educations'
  },
  {
    id: 7,
    url: '/',
    title: 'Contact Me'
  }
];

export function Header() {
  const classes = {
    item: 'text-md p-4 duration-100 border border-solid border-transparent hover:border-black'
  };

  return (
    <header
      className={classNames(
        'w-full flex items-center select-none justify-center px-5 border-b border-solid',
        styles.Header__container
      )}
    >
      <div className='w-full max-w-screen-2xl flex items-center justify-between py-2'>
        <Link href='/'>
          <div className='flex flex-col'>
            <h1 className='font-bold text-3xl'>{`${MAIN_DATA.FIRST_NAME} ${MAIN_DATA.LAST_NAME}`}</h1>
            <h3 className='text-sm'>{MAIN_DATA.TITLE}</h3>
          </div>
        </Link>
        <ul className='lg:flex items-center hidden'>
          {MENU.map(({ id, url, title }) => (
            <li key={id}>
              <Link href={url} className={classes.item}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

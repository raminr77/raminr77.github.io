import Link from 'next/link';

const MENU_ITEMS = [
  { id: 1, title: 'Skills', url: '' },
  { id: 2, title: 'Projects', url: '' },
  { id: 3, title: 'Experience', url: '' }
];

export function Header() {
  return (
    <header className='flex items-center justify-between p-4 select-none'>
      <h1>Ramin Rezaei</h1>
      <ul className='flex items-center'>
        {MENU_ITEMS.map(({ id, title, url }) => (
          <li key={id}>
            <Link className='px-4' href={url}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

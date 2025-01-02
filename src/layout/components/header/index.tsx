import { BurgerMenu } from '@/layout/components/burger-menu';

export function Header() {
  return (
    <header className='fixed top-0 z-50 flex w-full items-center justify-center'>
      <div className='flex w-11/12 flex-row-reverse p-5'>
        <BurgerMenu />
      </div>
    </header>
  );
}

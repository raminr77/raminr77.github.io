import { BurgerMenu } from '@/layout/components/burger-menu';

export function Header() {
  return (
    <header className="w-full fixed top-0 flex justify-center items-center z-50">
      <div className='w-11/12 flex flex-row-reverse p-5'>
        <BurgerMenu />
      </div>
    </header>
  );
}

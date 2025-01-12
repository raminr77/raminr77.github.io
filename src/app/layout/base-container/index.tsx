import classNames from 'classnames';
import { BurgerMenu } from '@/app/layout/burger-menu';

export function BaseContainer({
  children,
  className
}: GCommonCompnentPropertiesWithChildren) {
  return (
    <div className={classNames('min-h-screen', className)}>
      <BurgerMenu />
      {children}
    </div>
  );
}

import classNames from 'classnames';

// import { Header } from '@/app/layout/header';

export function PageContainer({
  children,
  className
}: GCommonCompnentPropertiesWithChildren) {
  return (
    <div className={classNames('min-h-screen bg-white', className)}>
      {/* <Header /> */}
      {children}
    </div>
  );
}

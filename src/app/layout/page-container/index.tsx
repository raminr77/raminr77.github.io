import classNames from 'classnames';

export function PageContainer({
  children,
  className
}: GCommonCompnentPropertiesWithChildren) {
  return <div className={classNames('min-h-screen bg-white', className)}>{children}</div>;
}

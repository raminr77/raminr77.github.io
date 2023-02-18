import classNames from 'classnames';
import { animator } from '@/shared/utils/animator';

export function IndexBlackSection() {
  return (
    <div
      className={classNames(
        'w-full absolute right-0 top-0 bottom-0 h-screen bg-black',
        animator({ name: 'slideInRight', delay: '4s' })
      )}
    ></div>
  );
}

import classNames from 'classnames';
import { animator } from '@/shared/utils/animator';

interface Props extends GCommonCompnentProperties {
  data: { title: string };
  isLearning?: boolean;
}

export function SkillItemRow({ data, isLearning = false, className }: Props) {
  const { title } = data || {};
  return (
    <div
      className={classNames(
        'inline-block py-2 px-4 m-1 border border-solid border-white',
        className,
        animator({ name: 'fadeIn', delay: '1s' }),
        {
          'border-sky-400': isLearning
        }
      )}
    >
      {title}
    </div>
  );
}

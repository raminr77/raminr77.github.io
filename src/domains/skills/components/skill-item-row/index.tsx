import classNames from 'classnames';
import { animator } from '@/shared/utils/animator';
import styles from './skill-item-row.module.scss';

interface Props extends GCommonCompnentProperties {
  data: { title: string };
  isLearning?: boolean;
}

export function SkillItemRow({ data, isLearning = false, className }: Props) {
  const { title } = data || {};
  return (
    <div
      className={classNames(
        'inline-block py-2 px-4 m-1',
        className,
        styles.SkillItemRow,
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

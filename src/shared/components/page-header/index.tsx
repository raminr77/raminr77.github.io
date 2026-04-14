import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';

interface PageHeaderProps {
  title: string;
  className?: string;
  description?: string;
  headerClassName?: string;
  descriptionClassName?: string;
}

export function PageHeader({
  title,
  className,
  description,
  headerClassName,
  descriptionClassName
}: PageHeaderProps) {
  return (
    <div className={className}>
      <h3
        className={clsx(
          'select-none text-center text-2xl font-bold font-title',
          animator({ name: 'fadeIn' }),
          headerClassName
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {description && (
        <p
          className={clsx(
            'mt-2 select-none text-center font-title',
            animator({ name: 'fadeIn', delay: '1s' }),
            descriptionClassName
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

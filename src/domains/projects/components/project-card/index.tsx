import Link from 'next/link';
import { clsx } from 'clsx';
import { titleFont } from '@/app/fonts';
import type { ProjectItem } from '@/data';
import { animator } from '@/shared/helpers';

export function ProjectCard({
  data,
  animationDelay = 0
}: {
  data: ProjectItem;
  animationDelay?: number;
}) {
  const { role, title, stack, url, isPrivate, description } = data;
  return (
    <div
      className={clsx(
        'flex flex-col border bg-transparent p-4 shadow backdrop-blur-sm duration-500 hover:bg-slate-300/5',
        animator({ name: 'fadeIn' })
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className='mb-3 flex flex-col gap-2'>
        <h3 className={titleFont.className}>{title}</h3>
        <p>{role}</p>
      </div>
      <div className='flex select-none flex-wrap gap-3'>
        <span
          className={clsx(
            'inline-block whitespace-nowrap rounded px-2 py-0 text-sm leading-6',
            {
              'bg-green-400/80': !isPrivate,
              'bg-red-600/50': isPrivate
            }
          )}
        >
          {isPrivate ? 'Private' : 'Open Source'}
        </span>

        {url && (
          <Link
            href={url}
            target='_blank'
            className='inline-block whitespace-nowrap rounded bg-sky-400/80 px-2 py-0 text-sm leading-6'
          >
            Demo
          </Link>
        )}
      </div>
      <p className='my-3 grow'>{description}</p>
      <div className='flex select-none flex-wrap gap-2'>
        {stack.map((item: string, index: number) => (
          <span
            key={`${item}-${index}`}
            className='rounded bg-slate-100 px-2 py-0 text-xs leading-6 dark:bg-slate-600/50'
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

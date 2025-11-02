import Link from 'next/link';

import { clsx } from 'clsx';

import { animator } from '@/shared/helpers';
import type { ProjectItem } from '@/data';
import { titleFont } from '@/app/fonts';

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
        'flex flex-col bg-transparent p-4 shadow backdrop-blur-sm duration-500 hover:bg-slate-300/10 justify-between border border-slate-300/40',
        animator({ name: 'fadeIn' })
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="mb-3 flex flex-col gap-2">
        <p className={titleFont.className}>{title}</p>
        <span>{role}</span>
      </div>
      <div className="flex select-none flex-wrap gap-3">
        <span
          className={clsx(
            'inline-block whitespace-nowrap rounded px-2 py-0 text-sm leading-6 text-white',
            {
              'dark:bg-green-800 bg-green-500': !isPrivate,
              'dark:bg-red-600/50 bg-red-700': isPrivate
            }
          )}
        >
          {isPrivate ? 'Private' : 'Open Source'}
        </span>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap rounded bg-sky-700 px-2 py-0 text-sm leading-6 text-white"
          >
            Demo
          </a>
        )}
      </div>
      <p className="my-3 grow">{description}</p>
      <div className="flex select-none flex-wrap gap-2">
        {stack.map((item: string, index: number) => (
          <span
            key={`${item}-${index}`}
            className="rounded bg-slate-200 px-2 py-0 text-xs leading-6 dark:bg-slate-600/50"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

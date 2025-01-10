import type { ProjectItem } from '@/data';
import { titleFont } from '@/app/fonts';
import { clsx } from 'clsx';
import Link from "next/link";

export function ProjectCard({ data }: { data: ProjectItem }) {
  const { role, title, stack, url, isPrivate, description } = data;
  return (
    <div className='flex flex-col border p-4'>
      <div className='mb-3 flex flex-col gap-2'>
        <h3 className={titleFont.className}>{title}</h3>
        <p>{role}</p>
      </div>
      <div className='flex flex-wrap gap-3'>
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
            className='bg-sky-400/80 inline-block whitespace-nowrap rounded px-2 py-0 text-sm leading-6'
          >
            Demo
          </Link>
        )}
      </div>
      <p className='my-3 grow'>{description}</p>
      <div className='flex flex-wrap gap-2'>
        {stack.map((item: string, index: number) => (
          <span
            key={index}
            className='rounded bg-slate-600/50 px-2 py-0 text-xs leading-6'
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

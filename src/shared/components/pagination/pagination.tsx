'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

import { sendGTMEvent } from '@next/third-parties/google';

import { GTM_EVENTS } from '@/shared/constants';
import { GENERAL_SITE_DATA } from '@/data';

interface PaginationProps {
  page: number;
  basePath: string;
  totalPages: number;
  searchParams?: Record<string, string>;
}

type PageItem = number | 'ellipsis';

function buildPageHref(
  targetPage: number,
  basePath: string,
  searchParams: Record<string, string>
): string {
  const params = new URLSearchParams(searchParams);
  if (targetPage <= 1) {
    params.delete('page');
  } else {
    params.set('page', String(targetPage));
  }
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: PageItem[] = [1];

  if (current > 3) items.push('ellipsis');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) items.push(i);

  if (current < total - 2) items.push('ellipsis');

  items.push(total);
  return items;
}

interface PageLinkProps {
  href: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  'aria-label': string;
  children: React.ReactNode;
  'aria-current'?: 'page' | undefined;
}

function PageLink({
  href,
  onClick,
  active = false,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
  children
}: PageLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-current={ariaCurrent}
      tabIndex={disabled ? -1 : undefined}
      className={clsx(
        'min-w-[2rem] h-8 px-2 flex items-center justify-center border text-sm transition-colors duration-200 select-none',
        active && 'border-amber-500 text-amber-500',
        disabled && 'opacity-40 pointer-events-none',
        !active &&
          !disabled &&
          'border-slate-300/40 hover:border-amber-500 hover:text-amber-500'
      )}
    >
      {children}
    </Link>
  );
}

export function Pagination({
  page,
  basePath,
  totalPages,
  searchParams = {}
}: PaginationProps) {
  const { previousPage, nextPage, pageLabel } = GENERAL_SITE_DATA.pagination;

  if (totalPages <= 1) return null;

  const pageItems = getPageItems(page, totalPages);

  const handlePaginationEvent = useCallback((label: string) => {
    sendGTMEvent(GTM_EVENTS.PAGINATION(label));
  }, []);

  return (
    <nav
      data-testid="pagination"
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-8 flex-wrap"
    >
      <PageLink
        disabled={page === 1}
        aria-label={previousPage}
        onClick={() => handlePaginationEvent('previous')}
        href={buildPageHref(page - 1, basePath, searchParams)}
      >
        ←
      </PageLink>

      {pageItems.map((item, i) =>
        item === 'ellipsis' ? (
          <span
            key={`ellipsis-${i}`}
            aria-hidden="true"
            className="px-2 text-sm text-white/40 select-none"
          >
            …
          </span>
        ) : (
          <PageLink
            key={item}
            active={item === page}
            aria-label={`${pageLabel} ${item}`}
            aria-current={item === page ? 'page' : undefined}
            href={buildPageHref(item, basePath, searchParams)}
            onClick={() => handlePaginationEvent(String(item))}
          >
            {item}
          </PageLink>
        )
      )}

      <PageLink
        aria-label={nextPage}
        href={buildPageHref(page + 1, basePath, searchParams)}
        onClick={() => handlePaginationEvent('next')}
        disabled={page === totalPages}
      >
        →
      </PageLink>
    </nav>
  );
}
